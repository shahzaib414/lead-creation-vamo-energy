import { Body, Controller, HttpCode, HttpStatus, Param, Post } from "@nestjs/common";

import { SubmitLeadDraftDto } from "./dto/submit-lead-draft.dto.js";
import { LeadSubmissionService } from "./lead-submission.service.js";

@Controller("lead-drafts")
export class LeadSubmissionController {
  constructor(
    private readonly leadSubmissionService: LeadSubmissionService
  ) {}

  @Post(":id/submit")
  @HttpCode(HttpStatus.OK)
  submit(@Param("id") id: string, @Body() submitLeadDraftDto: SubmitLeadDraftDto) {
    return this.leadSubmissionService.submit(id, submitLeadDraftDto);
  }
}
