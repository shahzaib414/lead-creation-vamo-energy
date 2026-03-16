import { LeadStage } from "@vamo/shared";

export class LeadDraftResponseDto {
  leadStage!: LeadStage;
  dataAcquisitionLink!: string | null;
  appointmentBookingLink!: string | null;
}
