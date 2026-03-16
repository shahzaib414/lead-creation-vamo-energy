import { Injectable, NotFoundException } from "@nestjs/common";
import { randomUUID } from "crypto";

import { FeasibilityStatus, FormStep, LeadStage } from "@vamo/shared";

import { CreateLeadDraftDto } from "./dto/create-lead-draft.dto.js";
import { UpdateLeadDraftDto } from "./dto/update-lead-draft.dto.js";
import { LeadDraftsRepository } from "./lead-drafts.repository.js";
import type {
  LeadDraftDocument,
  LeadPayload,
} from "./schemas/lead-draft.schema.js";
import { LeadDraftFormStageValidationService } from "./services/lead-draft-form-stage-validation.service.js";
import { LeadFeasibilityService } from "./services/lead-feasibility.service.js";
import { LeadStageService } from "./services/lead-stage.service.js";
import { LeadStageResponseDto } from "../shared/dto/lead-stage-response.dto.js";

@Injectable()
export class LeadDraftsService {
  constructor(
    private readonly leadDraftsRepository: LeadDraftsRepository,
    private readonly leadDraftFormStageValidationService: LeadDraftFormStageValidationService,
    private readonly leadFeasibilityService: LeadFeasibilityService,
    private readonly leadStageService: LeadStageService
  ) {}

  async create(createLeadDraftDto: CreateLeadDraftDto) {
    const leadDraft = await this.leadDraftsRepository.create({
      draftId: randomUUID(),
      payload: {
        contact: createLeadDraftDto.contact,
      },
      currentStep: FormStep.LeadContact,
      leadStage: LeadStage.LeadCapture,
      feasibilityStatus: FeasibilityStatus.Unknown,
      isSubmitted: false,
    });

    return this.toLeadDraftResponse(leadDraft);
  }

  async update(draftId: string, updateLeadDraftDto: UpdateLeadDraftDto) {
    const existingDraft = await this.leadDraftsRepository.findByDraftId(draftId);

    if (!existingDraft) {
      throw new NotFoundException(`Lead draft ${draftId} not found`);
    }

    const mergedPayload = this.mergePayload(existingDraft.payload, {
      contact: updateLeadDraftDto.contact,
      building: updateLeadDraftDto.building,
      heatingSystem: updateLeadDraftDto.heatingSystem,
      project: updateLeadDraftDto.project,
    });

    this.leadDraftFormStageValidationService.validate(
      updateLeadDraftDto.formStep,
      mergedPayload
    );

    const { feasibilityStatus } =
      this.leadFeasibilityService.evaluate(mergedPayload);
    const { leadStage } = this.leadStageService.evaluate(
      mergedPayload,
      feasibilityStatus
    );

    const updatedDraft = await this.leadDraftsRepository.updateByDraftId(draftId, {
      payload: mergedPayload,
      currentStep: updateLeadDraftDto.formStep,
      feasibilityStatus,
      leadStage,
    });

    if (!updatedDraft) {
      throw new NotFoundException(`Lead draft ${draftId} not found`);
    }

    return this.toLeadDraftResponse(updatedDraft);
  }

  private mergePayload(
    existingPayload: LeadPayload | undefined,
    incomingPayload: Partial<LeadPayload>
  ): LeadPayload {
    return {
      contact: incomingPayload.contact ?? existingPayload?.contact,
      building: this.mergeBuilding(
        existingPayload?.building,
        incomingPayload.building
      ),
      heatingSystem: this.mergeObject(
        existingPayload?.heatingSystem,
        incomingPayload.heatingSystem
      ),
      project: incomingPayload.project ?? existingPayload?.project,
    };
  }

  private mergeBuilding(
    existingBranch: LeadPayload["building"] | undefined,
    incomingBranch: LeadPayload["building"] | undefined
  ) {
    if (!existingBranch && !incomingBranch) {
      return undefined;
    }

    return {
      ...existingBranch,
      ...incomingBranch,
      address: this.mergeObject(existingBranch?.address, incomingBranch?.address),
      buildingInformation: this.mergeObject(
        existingBranch?.buildingInformation,
        incomingBranch?.buildingInformation
      ),
      ownershipRelationships: this.mergeObject(
        existingBranch?.ownershipRelationships,
        incomingBranch?.ownershipRelationships
      ),
      energyRelevantInformation: this.mergeObject(
        existingBranch?.energyRelevantInformation,
        incomingBranch?.energyRelevantInformation
      ),
      hotWater: this.mergeObject(existingBranch?.hotWater, incomingBranch?.hotWater),
    };
  }

  private mergeObject<T extends object>(
    existingValue?: T,
    incomingValue?: Partial<T>
  ): T | undefined {
    if (!existingValue && !incomingValue) {
      return undefined;
    }

    const definedIncomingValue = incomingValue
      ? (Object.fromEntries(
          Object.entries(incomingValue).filter(([, value]) => value !== undefined)
        ) as Partial<T>)
      : undefined;

    return {
      ...existingValue,
      ...definedIncomingValue,
    } as T;
  }

  private toLeadDraftResponse(
    leadDraft: Pick<LeadDraftDocument, "leadStage" | "feasibilityStatus">
  ): LeadStageResponseDto {
    return {
      leadStage: leadDraft.leadStage,
      feasibilityStatus: leadDraft.feasibilityStatus,
      dataAcquisitionLink: null,
      appointmentBookingLink: null,
    };
  }
}
