import { FormStep } from "@vamo/shared";

import type { LeadDraftFormValues } from "../forms/leadDraftForm.types";
import type { CreateLeadDraftPayload, UpdateLeadDraftPayload } from "./leadDrafts";

export function buildCreateLeadDraftPayload(
  values: Pick<LeadDraftFormValues, "firstName" | "lastName" | "phone" | "email">
): CreateLeadDraftPayload {
  return {
    contact: {
      contactInformation: {
        firstName: values.firstName,
        lastName: values.lastName,
        phone: values.phone,
        email: values.email,
      },
    },
  };
}

export function buildLeadContactPayload(
  values: Pick<LeadDraftFormValues, "firstName" | "lastName" | "phone" | "email">
): UpdateLeadDraftPayload {
  return {
    formStep: FormStep.LeadContact,
    contact: buildCreateLeadDraftPayload(values).contact,
  };
}

export function buildHomeTypePayload(
  values: Pick<
    LeadDraftFormValues,
    "immoType" | "residentialUnits" | "ownerOccupiedHousing" | "apartmentHeatingSystem"
  >
): UpdateLeadDraftPayload {
  return {
    formStep: FormStep.HomeType,
    building: {
      buildingInformation: {
        immoType: values.immoType,
        residentialUnits: values.residentialUnits,
      },
      ownershipRelationships: {
        ownerOccupiedHousing: values.ownerOccupiedHousing,
      },
      energyRelevantInformation: {
        apartmentHeatingSystem: values.apartmentHeatingSystem,
      },
    },
  };
}

export function buildCurrentHeatingPayload(
  values: Pick<LeadDraftFormValues, "systemType" | "locationHeating">
): UpdateLeadDraftPayload {
  return {
    formStep: FormStep.CurrentHeating,
    building: {
      energyRelevantInformation: {
        locationHeating: values.locationHeating,
      },
    },
    heatingSystem: {
      systemType: values.systemType,
    },
  };
}

export function buildPropertyDetailsPayload(
  values: Pick<
    LeadDraftFormValues,
    | "street"
    | "city"
    | "postalCode"
    | "countryCode"
    | "heritageProtection"
    | "constructionYearString"
    | "livingSpace"
    | "personsHousehold"
    | "heatedArea"
    | "typeOfHeating"
    | "numberOfBathtubs"
    | "numberOfShowers"
    | "typeOfShowers"
  >
): UpdateLeadDraftPayload {
  return {
    formStep: FormStep.PropertyDetails,
    building: {
      address: {
        street: values.street,
        city: values.city,
        postalCode: values.postalCode,
        countryCode: values.countryCode,
      },
      buildingInformation: {
        heritageProtection: values.heritageProtection,
        constructionYearString: values.constructionYearString,
        livingSpace: values.livingSpace,
        personsHousehold: values.personsHousehold,
      },
      energyRelevantInformation: {
        heatedArea: values.heatedArea,
        typeOfHeating: values.typeOfHeating,
      },
      hotWater: {
        numberOfBathtubs: values.numberOfBathtubs,
        numberOfShowers: values.numberOfShowers,
        typeOfShowers: values.typeOfShowers,
      },
    },
  };
}

export function buildTechnicalDetailsPayload(
  values: Pick<
    LeadDraftFormValues,
    | "boilerRoomSize"
    | "installationLocationCeilingHeight"
    | "widthPathway"
    | "heightPathway"
    | "roomsBetweenHeatingRoomAndOutdoorUnit"
    | "meterClosetLocation"
    | "electricityConnectionLocation"
    | "groundingType"
    | "hasSolarThermalSystem"
    | "consumption"
    | "consumptionUnit"
    | "constructionYearHeatingSystem"
    | "numberOfFloorHeatingDistributors"
    | "numberOfRadiators"
    | "domesticHotWaterByHeatpump"
    | "domesticHotWaterCirculationPump"
    | "domesticWaterStation"
    | "timeline"
    | "householdIncome"
    | "statusOfFoundationConstruction"
    | "fullReplacementOfHeatingSystemPlanned"
  >
): UpdateLeadDraftPayload {
  return {
    formStep: FormStep.TechnicalDetails,
    building: {
      buildingInformation: {
        boilerRoomSize: values.boilerRoomSize,
        installationLocationCeilingHeight: values.installationLocationCeilingHeight,
        widthPathway: values.widthPathway,
        heightPathway: values.heightPathway,
        roomsBetweenHeatingRoomAndOutdoorUnit:
          values.roomsBetweenHeatingRoomAndOutdoorUnit,
        meterClosetLocation: values.meterClosetLocation,
        electricityConnectionLocation: values.electricityConnectionLocation,
        groundingType: values.groundingType,
        hasSolarThermalSystem: values.hasSolarThermalSystem,
      },
    },
    heatingSystem: {
      consumption: values.consumption,
      consumptionUnit: values.consumptionUnit,
      constructionYearHeatingSystem: values.constructionYearHeatingSystem,
      numberOfFloorHeatingDistributors: values.numberOfFloorHeatingDistributors,
      numberOfRadiators: values.numberOfRadiators,
      domesticHotWaterByHeatpump: values.domesticHotWaterByHeatpump,
      domesticHotWaterCirculationPump: values.domesticHotWaterCirculationPump,
      domestic_water_station: values.domesticWaterStation,
    },
    project: {
      timeline: values.timeline,
      householdIncome: values.householdIncome,
      statusOfFoundationConstruction: values.statusOfFoundationConstruction,
      fullReplacementOfHeatingSystemPlanned:
        values.fullReplacementOfHeatingSystemPlanned,
    },
  };
}
