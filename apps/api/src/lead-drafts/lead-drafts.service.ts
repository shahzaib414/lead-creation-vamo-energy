import { Injectable } from "@nestjs/common";
import { randomUUID } from "crypto";

import { FeasibilityStatus, FormStep, LeadStage } from "@vamo/shared";

import { CreateLeadDraftDto } from "./dto/create-lead-draft.dto.js";
import { LeadDraftsRepository } from "./lead-drafts.repository.js";

@Injectable()
export class LeadDraftsService {
  constructor(private readonly leadDraftsRepository: LeadDraftsRepository) {}

  async create(createLeadDraftDto: CreateLeadDraftDto) {
    return this.leadDraftsRepository.create({
      draftId: randomUUID(),
      payload: {
        contact: createLeadDraftDto.contact,
      },
      currentStep: FormStep.LeadContact,
      leadStage: LeadStage.LeadCapture,
      feasibilityStatus: FeasibilityStatus.Unknown,
      isSubmitted: false,
    });
  }
}
