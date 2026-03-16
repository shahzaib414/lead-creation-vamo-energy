import { Injectable } from "@nestjs/common";

import { FeasibilityStatus, LeadStage } from "@vamo/shared";

import type { LeadPayload } from "../schemas/lead-draft.schema.js";

@Injectable()
export class LeadStageService {
  evaluate(payload: LeadPayload, feasibilityStatus: FeasibilityStatus) {
    if (this.isLeadCapture(payload)) {
      return { leadStage: LeadStage.LeadCapture };
    }

    if (
      feasibilityStatus === FeasibilityStatus.Feasible &&
      this.hasDiscoveryFields(payload)
    ) {
      return { leadStage: LeadStage.Discovery };
    }

    return { leadStage: LeadStage.Qualification };
  }

  private isLeadCapture(payload: LeadPayload) {
    return Boolean(
      payload.contact?.contactInformation?.firstName &&
        payload.contact?.contactInformation?.lastName &&
        payload.contact?.contactInformation?.phone &&
        payload.contact?.contactInformation?.email &&
        !payload.building &&
        !payload.heatingSystem &&
        !payload.project
    );
  }

  private hasDiscoveryFields(payload: LeadPayload) {
    const buildingInformation = payload.building?.buildingInformation;
    const ownershipRelationships = payload.building?.ownershipRelationships;
    const energyRelevantInformation = payload.building?.energyRelevantInformation;
    const heatingSystem = payload.heatingSystem;
    const project = payload.project;

    return Boolean(
      buildingInformation?.livingSpace !== undefined &&
        buildingInformation?.residentialUnits !== undefined &&
        buildingInformation?.roomsBetweenHeatingRoomAndOutdoorUnit &&
        buildingInformation?.meterClosetLocation &&
        buildingInformation?.electricityConnectionLocation &&
        buildingInformation?.groundingType &&
        buildingInformation?.hasSolarThermalSystem !== undefined &&
        ownershipRelationships?.ownerOccupiedHousing !== undefined &&
        energyRelevantInformation?.typeOfHeating &&
        heatingSystem?.systemType &&
        heatingSystem?.consumption !== undefined &&
        heatingSystem?.consumptionUnit &&
        project?.timeline &&
        project?.fullReplacementOfHeatingSystemPlanned !== undefined
    );
  }
}

