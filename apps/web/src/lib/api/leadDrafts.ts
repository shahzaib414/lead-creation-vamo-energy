import { type FormStep, type FeasibilityStatus, type LeadStage } from "@vamo/shared";

import { requestJson } from "./client";

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
  building?: {
    address?: {
      street?: string;
      city?: string;
      postalCode?: string;
      countryCode?: string;
    };
    buildingInformation?: {
      immoType?: string;
      residentialUnits?: number;
      heritageProtection?: string;
      constructionYearString?: string;
      livingSpace?: number;
      personsHousehold?: number;
      boilerRoomSize?: string;
      installationLocationCeilingHeight?: string;
      widthPathway?: string;
      heightPathway?: string;
      roomsBetweenHeatingRoomAndOutdoorUnit?: string;
      meterClosetLocation?: string;
      electricityConnectionLocation?: string;
      groundingType?: string;
      hasSolarThermalSystem?: boolean;
    };
    ownershipRelationships?: {
      ownerOccupiedHousing?: boolean;
    };
    energyRelevantInformation?: {
      apartmentHeatingSystem?: string;
      locationHeating?: string;
      heatedArea?: number;
      typeOfHeating?: string;
    };
    hotWater?: {
      numberOfBathtubs?: number;
      numberOfShowers?: number;
      typeOfShowers?: string;
    };
  };
  heatingSystem?: {
    systemType?: string;
    consumption?: number;
    consumptionUnit?: string;
    constructionYearHeatingSystem?: number;
    numberOfFloorHeatingDistributors?: number;
    numberOfRadiators?: number;
    domesticHotWaterByHeatpump?: boolean;
    domesticHotWaterCirculationPump?: string;
    domestic_water_station?: string;
  };
  project?: {
    timeline?: string;
    householdIncome?: string;
    statusOfFoundationConstruction?: string;
    fullReplacementOfHeatingSystemPlanned?: boolean;
  };
};

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
