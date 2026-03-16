import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";

import { LeadDraftsModule } from "../lead-drafts/lead-drafts.module.js";
import { LeadSubmissionController } from "./lead-submission.controller.js";
import { LeadSubmissionRepository } from "./lead-submission.repository.js";
import { LeadSubmissionService } from "./lead-submission.service.js";
import {
  SubmittedLead,
  SubmittedLeadSchema,
} from "./schemas/submitted-lead.schema.js";

@Module({
  imports: [
    LeadDraftsModule,
    MongooseModule.forFeature([
      {
        name: SubmittedLead.name,
        schema: SubmittedLeadSchema,
      },
    ]),
  ],
  controllers: [LeadSubmissionController],
  providers: [LeadSubmissionService, LeadSubmissionRepository],
})
export class LeadSubmissionModule {}
