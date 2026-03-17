import type { LeadDraftStageResponse } from "./leadDrafts";
import { requestJson } from "./client";
import type { SubmitLeadDraftPayload } from "./leadSubmissionPayloads";

export function submitLeadDraft(
  draftId: string,
  payload: SubmitLeadDraftPayload
) {
  return requestJson<LeadDraftStageResponse>(`/lead-drafts/${draftId}/submit`, {
    method: "POST",
    body: JSON.stringify(payload),
  });
}
