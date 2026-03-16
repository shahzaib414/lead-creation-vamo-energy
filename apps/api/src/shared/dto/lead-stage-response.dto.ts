import { LeadStage } from "@vamo/shared";

export class LeadStageResponseDto {
  leadStage!: LeadStage;
  dataAcquisitionLink!: string | null;
  appointmentBookingLink!: string | null;
}
