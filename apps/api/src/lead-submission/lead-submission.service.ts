import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
} from "@nestjs/common";

import { LeadStage } from "@vamo/shared";
import { FeasibilityStatus } from "@vamo/shared";

import { LeadDraftsRepository } from "../lead-drafts/lead-drafts.repository.js";
import { LeadFeasibilityService } from "../lead-drafts/services/lead-feasibility.service.js";
import { LeadStageService } from "../lead-drafts/services/lead-stage.service.js";
import { LeadStageResponseDto } from "../shared/dto/lead-stage-response.dto.js";
import { LeadSubmissionRepository } from "./lead-submission.repository.js";

@Injectable()
export class LeadSubmissionService {
  constructor(
    private readonly leadDraftsRepository: LeadDraftsRepository,
    private readonly leadSubmissionRepository: LeadSubmissionRepository,
    private readonly leadFeasibilityService: LeadFeasibilityService,
    private readonly leadStageService: LeadStageService
  ) {}

  async submit(draftId: string): Promise<LeadStageResponseDto> {
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

    await this.leadSubmissionRepository.create({
      draftId: leadDraft.draftId,
      payload: leadDraft.payload,
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
}
