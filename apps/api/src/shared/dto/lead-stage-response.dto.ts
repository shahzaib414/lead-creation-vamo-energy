import { FeasibilityStatus, LeadStage } from "@vamo/shared";

export class LeadStageResponseDto {
  leadStage!: LeadStage;
  feasibilityStatus!: FeasibilityStatus;
  dataAcquisitionLink!: string | null;
  appointmentBookingLink!: string | null;
}
