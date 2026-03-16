import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import type { Model } from "mongoose";

import { LeadDraft, LeadDraftDocument } from "./schemas/lead-draft.schema.js";

@Injectable()
export class LeadDraftsRepository {
  constructor(
    @InjectModel(LeadDraft.name)
    private readonly leadDraftModel: Model<LeadDraftDocument>
  ) {}

  async create(input: Partial<LeadDraft>) {
    const leadDraft = await this.leadDraftModel.create(input);

    return leadDraft.toObject();
  }

  async findByDraftId(draftId: string) {
    return this.leadDraftModel.findOne({ draftId }).lean();
  }

  async updateByDraftId(draftId: string, update: Partial<LeadDraft>) {
    return this.leadDraftModel
      .findOneAndUpdate({ draftId }, update, { new: true })
      .lean();
  }
}
