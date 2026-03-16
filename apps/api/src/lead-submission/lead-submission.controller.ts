import { Controller, HttpCode, HttpStatus, Param, Post } from "@nestjs/common";

import { LeadSubmissionService } from "./lead-submission.service.js";

@Controller("lead-drafts")
export class LeadSubmissionController {
  constructor(
    private readonly leadSubmissionService: LeadSubmissionService
  ) {}

  @Post(":id/submit")
  @HttpCode(HttpStatus.OK)
  submit(@Param("id") id: string) {
    return this.leadSubmissionService.submit(id);
  }
}
