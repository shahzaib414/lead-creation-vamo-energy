import { Injectable } from "@nestjs/common";

import {
  ApartmentHeatingSystem,
  FeasibilityStatus,
  ImmoType,
  SystemType,
} from "@vamo/shared";

import type { LeadPayload } from "../schemas/lead-draft.schema.js";

@Injectable()
export class LeadFeasibilityService {
  evaluate(payload: LeadPayload) {
    const immoType = payload.building?.buildingInformation?.immoType;
    const apartmentHeatingSystem =
      payload.building?.energyRelevantInformation?.apartmentHeatingSystem;
    const systemType = payload.heatingSystem?.systemType;

    if (
      immoType === ImmoType.Apartment &&
      apartmentHeatingSystem === ApartmentHeatingSystem.No
    ) {
      return { feasibilityStatus: FeasibilityStatus.Infeasible };
    }

    if (
      (immoType === ImmoType.SingleOrTwoFamily ||
        immoType === ImmoType.RowHouse ||
        (immoType === ImmoType.Apartment &&
          apartmentHeatingSystem === ApartmentHeatingSystem.Yes)) &&
      (systemType === SystemType.NaturalGas || systemType === SystemType.Oil)
    ) {
      return { feasibilityStatus: FeasibilityStatus.Feasible };
    }

    return { feasibilityStatus: FeasibilityStatus.Unknown };
  }
}

