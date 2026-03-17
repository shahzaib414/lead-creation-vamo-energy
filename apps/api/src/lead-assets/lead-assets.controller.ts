import { Body, Controller, Param, Post } from "@nestjs/common";

import { LeadAssetsService } from "./lead-assets.service.js";
import { PrepareLeadAssetUploadsDto } from "./dto/prepare-lead-asset-uploads.dto.js";

@Controller("lead-drafts")
export class LeadAssetsController {
  constructor(private readonly leadAssetsService: LeadAssetsService) {}

  @Post(":id/assets/prepare")
  prepareUploads(
    @Param("id") id: string,
    @Body() prepareLeadAssetUploadsDto: PrepareLeadAssetUploadsDto
  ) {
    return this.leadAssetsService.prepareUploads(id, prepareLeadAssetUploadsDto);
  }
}
