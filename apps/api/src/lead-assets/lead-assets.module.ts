import { Module } from "@nestjs/common";

import { LeadDraftsModule } from "../lead-drafts/lead-drafts.module.js";
import { LeadAssetsController } from "./lead-assets.controller.js";
import { LeadAssetsService } from "./lead-assets.service.js";
import { S3PresignService } from "./services/s3-presign.service.js";

@Module({
  imports: [LeadDraftsModule],
  controllers: [LeadAssetsController],
  providers: [LeadAssetsService, S3PresignService],
})
export class LeadAssetsModule {}
