import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import type { HydratedDocument } from "mongoose";

import { FeasibilityStatus, LeadStage } from "@vamo/shared";

import {
  LeadPayload,
  LeadPayloadSchema,
} from "../../lead-drafts/schemas/lead-draft.schema.js";

export type SubmittedLeadDocument = HydratedDocument<SubmittedLead>;

@Schema({
  timestamps: true,
  collection: "submitted_leads",
})
export class SubmittedLead {
  @Prop({ required: true, unique: true, trim: true })
  draftId: string = "";

  @Prop({ type: LeadPayloadSchema, required: true, default: () => ({}) })
  payload: LeadPayload = {};

  @Prop({
    required: true,
    enum: Object.values(LeadStage),
  })
  leadStage: LeadStage = LeadStage.Qualification;

  @Prop({
    required: true,
    enum: Object.values(FeasibilityStatus),
  })
  feasibilityStatus: FeasibilityStatus = FeasibilityStatus.Unknown;

  @Prop({ required: true })
  submittedAt: Date = new Date();

  createdAt: Date = new Date();
  updatedAt: Date = new Date();
}

export const SubmittedLeadSchema = SchemaFactory.createForClass(SubmittedLead);

SubmittedLeadSchema.index({ draftId: 1 }, { unique: true });
SubmittedLeadSchema.index({ submittedAt: -1 });
SubmittedLeadSchema.index({ leadStage: 1 });
