import type { FeasibilityStatus, FormStep, LeadStage } from "@vamo/shared";

import { requestJson } from "./client";
import type { LeadDraftFormValues } from "../forms/leadDraftForm.types";

export type CreateLeadDraftPayload = {
  contact: {
    contactInformation: {
      firstName: string;
      lastName: string;
      phone: string;
      email: string;
    };
  };
};

export type LeadDraftStageResponse = {
  draftId?: string;
  leadStage: LeadStage;
  feasibilityStatus: FeasibilityStatus;
  dataAcquisitionLink: string | null;
  appointmentBookingLink: string | null;
};

export type UpdateLeadDraftPayload = {
  formStep: FormStep;
  contact?: CreateLeadDraftPayload["contact"];
};

export function buildCreateLeadDraftPayload(
  values: Pick<LeadDraftFormValues, "firstName" | "lastName" | "phone" | "email">
): CreateLeadDraftPayload {
  return {
    contact: {
      contactInformation: {
        firstName: values.firstName,
        lastName: values.lastName,
        phone: values.phone,
        email: values.email,
      },
    },
  };
}

export function createLeadDraft(payload: CreateLeadDraftPayload) {
  return requestJson<LeadDraftStageResponse>("/lead-drafts", {
    method: "POST",
    body: JSON.stringify(payload),
  });
}

export function updateLeadDraft(draftId: string, payload: UpdateLeadDraftPayload) {
  return requestJson<LeadDraftStageResponse>(`/lead-drafts/${draftId}`, {
    method: "PATCH",
    body: JSON.stringify(payload),
  });
}
