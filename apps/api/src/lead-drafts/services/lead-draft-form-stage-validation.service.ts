import { BadRequestException, Injectable } from "@nestjs/common";

import { FormStep, ImmoType } from "@vamo/shared";

import type {
  BuildingPayload,
  ContactPayload,
  LeadPayload,
} from "../schemas/lead-draft.schema.js";

@Injectable()
export class LeadDraftFormStageValidationService {
  validate(formStep: FormStep, payload: LeadPayload) {
    switch (formStep) {
      case FormStep.LeadContact:
        this.validateLeadContact(payload.contact);
        return;
      case FormStep.HomeType:
        this.validateHomeType(payload.building);
        return;
      case FormStep.CurrentHeating:
        this.validateCurrentHeating(payload);
        return;
      case FormStep.PropertyDetails:
        this.validatePropertyDetails(payload.building);
        return;
      case FormStep.TechnicalDetails:
        this.validateTechnicalDetails(payload);
        return;
      case FormStep.ReviewSubmit:
        return;
      default:
        throw new BadRequestException(`Unsupported form step: ${formStep}`);
    }
  }

  private validateLeadContact(contact?: ContactPayload) {
    const contactInformation = contact?.contactInformation;

    if (
      !contactInformation?.firstName ||
      !contactInformation.lastName ||
      !contactInformation.phone ||
      !contactInformation.email
    ) {
      throw new BadRequestException(
        "lead_contact requires firstName, lastName, phone, and email"
      );
    }
  }

  private validateHomeType(building?: BuildingPayload) {
    const buildingInformation = building?.buildingInformation;
    const ownershipRelationships = building?.ownershipRelationships;
    const energyRelevantInformation = building?.energyRelevantInformation;

    if (!buildingInformation?.immoType) {
      throw new BadRequestException("home_type requires buildingInformation.immoType");
    }

    if (ownershipRelationships?.ownerOccupiedHousing === undefined) {
      throw new BadRequestException(
        "home_type requires ownershipRelationships.ownerOccupiedHousing"
      );
    }

    if (
      buildingInformation.immoType === ImmoType.Apartment &&
      !energyRelevantInformation?.apartmentHeatingSystem
    ) {
      throw new BadRequestException(
        "home_type requires energyRelevantInformation.apartmentHeatingSystem for Wohnung"
      );
    }
  }

  private validateCurrentHeating(payload: LeadPayload) {
    if (!payload.heatingSystem?.systemType) {
      throw new BadRequestException(
        "current_heating requires heatingSystem.systemType"
      );
    }
  }

  private validatePropertyDetails(building?: BuildingPayload) {
    const hasPropertyDetails = Boolean(
      building?.address ||
        building?.buildingInformation?.heritageProtection ||
        building?.buildingInformation?.constructionYear ||
        building?.buildingInformation?.constructionYearString ||
        building?.buildingInformation?.livingSpace ||
        building?.buildingInformation?.personsHousehold ||
        building?.energyRelevantInformation?.heatedArea ||
        building?.energyRelevantInformation?.heatedAreaString ||
        building?.energyRelevantInformation?.typeOfHeating ||
        building?.hotWater
    );

    if (!hasPropertyDetails) {
      throw new BadRequestException(
        "property_details requires address or property detail fields"
      );
    }
  }

  private validateTechnicalDetails(payload: LeadPayload) {
    const hasTechnicalDetails = Boolean(
      payload.building?.buildingInformation?.boilerRoomSize ||
        payload.building?.buildingInformation?.installationLocationCeilingHeight ||
        payload.building?.buildingInformation?.widthPathway ||
        payload.building?.buildingInformation?.heightPathway ||
        payload.building?.buildingInformation?.roomsBetweenHeatingRoomAndOutdoorUnit ||
        payload.building?.buildingInformation?.meterClosetLocation ||
        payload.building?.buildingInformation?.electricityConnectionLocation ||
        payload.building?.buildingInformation?.groundingType ||
        payload.building?.buildingInformation?.hasSolarThermalSystem !== undefined ||
        payload.heatingSystem?.consumption !== undefined ||
        payload.heatingSystem?.consumptionUnit ||
        payload.heatingSystem?.constructionYearHeatingSystem !== undefined ||
        payload.project?.timeline ||
        payload.project?.fullReplacementOfHeatingSystemPlanned !== undefined
    );

    if (!hasTechnicalDetails) {
      throw new BadRequestException(
        "technical_details requires at least one technical detail field"
      );
    }
  }
}

