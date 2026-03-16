import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import type { Model } from "mongoose";

import {
  SubmittedLead,
  SubmittedLeadDocument,
} from "./schemas/submitted-lead.schema.js";

@Injectable()
export class LeadSubmissionRepository {
  constructor(
    @InjectModel(SubmittedLead.name)
    private readonly submittedLeadModel: Model<SubmittedLeadDocument>
  ) {}

  async create(input: Partial<SubmittedLead>) {
    const submittedLead = await this.submittedLeadModel.create(input);

    return submittedLead.toObject();
  }
}
