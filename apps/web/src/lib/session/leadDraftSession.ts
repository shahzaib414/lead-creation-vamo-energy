const LEAD_DRAFT_ID_SESSION_KEY = "vamo.leadDraftId";

export function readLeadDraftId() {
  if (typeof window === "undefined") {
    return null;
  }

  return window.sessionStorage.getItem(LEAD_DRAFT_ID_SESSION_KEY);
}

export function writeLeadDraftId(draftId: string) {
  if (typeof window === "undefined") {
    return;
  }

  window.sessionStorage.setItem(LEAD_DRAFT_ID_SESSION_KEY, draftId);
}

export function clearLeadDraftId() {
  if (typeof window === "undefined") {
    return;
  }

  window.sessionStorage.removeItem(LEAD_DRAFT_ID_SESSION_KEY);
}
