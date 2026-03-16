import { Body, Controller, HttpCode, HttpStatus, Post } from "@nestjs/common";

import { CreateLeadDraftDto } from "./dto/create-lead-draft.dto.js";
import { LeadDraftsService } from "./lead-drafts.service.js";

@Controller("lead-drafts")
export class LeadDraftsController {
  constructor(private readonly leadDraftsService: LeadDraftsService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(@Body() createLeadDraftDto: CreateLeadDraftDto) {
    return this.leadDraftsService.create(createLeadDraftDto);
  }
}
