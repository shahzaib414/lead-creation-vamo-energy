import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";

import { LeadDraftsController } from "./lead-drafts.controller.js";
import { LeadDraftsRepository } from "./lead-drafts.repository.js";
import { LeadDraftsService } from "./lead-drafts.service.js";
import { LeadDraft, LeadDraftSchema } from "./schemas/lead-draft.schema.js";

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
  providers: [LeadDraftsService, LeadDraftsRepository],
  exports: [LeadDraftsService],
})
export class LeadDraftsModule {}

