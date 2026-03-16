import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Post,
} from "@nestjs/common";

import { CreateLeadDraftDto } from "./dto/create-lead-draft.dto.js";
import { UpdateLeadDraftDto } from "./dto/update-lead-draft.dto.js";
import { LeadDraftsService } from "./lead-drafts.service.js";

@Controller("lead-drafts")
export class LeadDraftsController {
  constructor(private readonly leadDraftsService: LeadDraftsService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(@Body() createLeadDraftDto: CreateLeadDraftDto) {
    return this.leadDraftsService.create(createLeadDraftDto);
  }

  @Patch(":id")
  update(@Param("id") id: string, @Body() updateLeadDraftDto: UpdateLeadDraftDto) {
    return this.leadDraftsService.update(id, updateLeadDraftDto);
  }
}
