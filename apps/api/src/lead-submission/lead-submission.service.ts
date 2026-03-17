import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
} from "@nestjs/common";

import { LeadStage } from "@vamo/shared";
import { FeasibilityStatus } from "@vamo/shared";

import { LeadDraftsRepository } from "../lead-drafts/lead-drafts.repository.js";
import type { LeadPayload } from "../lead-drafts/schemas/lead-draft.schema.js";
import type { PictureUrl, ProjectPicturesPayload } from "../lead-drafts/schemas/lead-draft.schema.js";
import { LeadFeasibilityService } from "../lead-drafts/services/lead-feasibility.service.js";
import { LeadStageService } from "../lead-drafts/services/lead-stage.service.js";
import { LeadStageResponseDto } from "../shared/dto/lead-stage-response.dto.js";
import { SubmitLeadDraftDto } from "./dto/submit-lead-draft.dto.js";
import { LeadSubmissionRepository } from "./lead-submission.repository.js";

const SUBMITTED_PICTURE_CATEGORIES = [
  "outdoorUnitLocation",
  "outdoorUnitLocationWithArea",
  "heatingRoom",
  "meterClosetWithDoorOpen",
  "meterClosetSlsSwitchDetailed",
  "floorHeatingDistributionWithDoorOpen",
] as const;

@Injectable()
export class LeadSubmissionService {
  constructor(
    private readonly leadDraftsRepository: LeadDraftsRepository,
    private readonly leadSubmissionRepository: LeadSubmissionRepository,
    private readonly leadFeasibilityService: LeadFeasibilityService,
    private readonly leadStageService: LeadStageService
  ) {}

  async submit(
    draftId: string,
    submitLeadDraftDto: SubmitLeadDraftDto
  ): Promise<LeadStageResponseDto> {
    const leadDraft = await this.leadDraftsRepository.findByDraftId(draftId);

    if (!leadDraft) {
      throw new NotFoundException(`Lead draft ${draftId} not found`);
    }

    if (leadDraft.isSubmitted) {
      throw new ConflictException(`Lead draft ${draftId} has already been submitted`);
    }

    const { feasibilityStatus } = this.leadFeasibilityService.evaluate(
      leadDraft.payload
    );
    const { leadStage } = this.leadStageService.evaluate(
      leadDraft.payload,
      feasibilityStatus
    );

    if (feasibilityStatus === FeasibilityStatus.Infeasible) {
      throw new BadRequestException(
        "Lead draft is not feasible and cannot be submitted"
      );
    }

    if (leadStage === LeadStage.LeadCapture) {
      throw new BadRequestException(
        "Lead draft is incomplete and cannot be submitted yet"
      );
    }

    const submittedPayload = this.mergeSubmittedPictures(
      leadDraft.payload,
      submitLeadDraftDto
    );

    await this.leadSubmissionRepository.create({
      draftId: leadDraft.draftId,
      payload: submittedPayload,
      leadStage,
      feasibilityStatus,
      submittedAt: new Date(),
    });

    await this.leadDraftsRepository.updateByDraftId(draftId, {
      isSubmitted: true,
      leadStage,
      feasibilityStatus,
    });

    return {
      leadStage,
      feasibilityStatus,
      dataAcquisitionLink: null,
      appointmentBookingLink: null,
    };
  }

  private mergeSubmittedPictures(
    payload: LeadPayload,
    submitLeadDraftDto: SubmitLeadDraftDto
  ): LeadPayload {
    if (!submitLeadDraftDto.pictures) {
      return payload;
    }

    const pictures = SUBMITTED_PICTURE_CATEGORIES.reduce<Partial<ProjectPicturesPayload>>(
      (result, category) => {
      const pictureRefs = submitLeadDraftDto.pictures?.[category];

      if (!pictureRefs || pictureRefs.length === 0) {
        return result;
      }

      result[category] = pictureRefs.map((picture): PictureUrl => ({
        objectKey: picture.objectKey,
      }));

      return result;
    }, {});

    if (Object.keys(pictures).length === 0) {
      return payload;
    }

    return {
      ...payload,
      project: {
        ...payload.project,
        pictures,
      },
    };
  }
}
