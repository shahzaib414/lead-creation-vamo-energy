import type { LeadFormStepKey } from "../lib/forms/leadDraftForm.types";

export const leadFormSteps: Array<{
  key: LeadFormStepKey;
  title: string;
  description: string;
}> = [
  {
    key: "leadContact",
    title: "Lead contact",
    description: "Capture the lead early so progress never starts anonymously.",
  },
  {
    key: "homeType",
    title: "Home type",
    description: "Collect the first feasibility-driving answers from the flow chart.",
  },
  {
    key: "currentHeating",
    title: "Current heating",
    description: "Capture the current heating setup and installation location.",
  },
  {
    key: "propertyDetails",
    title: "Property details",
    description: "Gather address and core home characteristics for qualification.",
  },
  {
    key: "technicalDetails",
    title: "Technical details",
    description: "Capture richer technical signals used for discovery readiness.",
  },
  {
    key: "reviewSubmit",
    title: "Review",
    description: "Show a final summary before wiring backend submission behavior.",
  },
];
