import { FeasibilityStatus, LeadStage } from "@vamo/shared";

export class LeadStageResponseDto {
  draftId?: string;
  leadStage!: LeadStage;
  feasibilityStatus!: FeasibilityStatus;
  dataAcquisitionLink!: string | null;
  appointmentBookingLink!: string | null;
}
