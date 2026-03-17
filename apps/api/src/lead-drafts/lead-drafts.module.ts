import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";

import { LeadDraftsController } from "./lead-drafts.controller.js";
import { LeadDraftsRepository } from "./lead-drafts.repository.js";
import { LeadDraftsService } from "./lead-drafts.service.js";
import { LeadDraft, LeadDraftSchema } from "./schemas/lead-draft.schema.js";
import { LeadDraftFormStageValidationService } from "./services/lead-draft-form-stage-validation.service.js";
import { LeadFeasibilityService } from "./services/lead-feasibility.service.js";
import { LeadStageService } from "./services/lead-stage.service.js";

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: LeadDraft.name,
        schema: LeadDraftSchema,
      },
    ]),
  ],
  controllers: [LeadDraftsController],
  providers: [
    LeadDraftsService,
    LeadDraftsRepository,
    LeadDraftFormStageValidationService,
    LeadFeasibilityService,
    LeadStageService,
  ],
  exports: [
    LeadDraftsService,
    LeadDraftsRepository,
    LeadFeasibilityService,
    LeadStageService,
    LeadDraftFormStageValidationService,
  ],
})
export class LeadDraftsModule {}
