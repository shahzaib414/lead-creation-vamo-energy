export type LeadFormStepKey =
  | "leadContact"
  | "homeType"
  | "currentHeating"
  | "propertyDetails"
  | "technicalDetails"
  | "reviewSubmit";

export type LeadDraftFormValues = {
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  immoType?: string;
  ownerOccupiedHousing?: boolean;
  residentialUnits?: number;
  apartmentHeatingSystem?: "Yes" | "No";
  systemType?: string;
  locationHeating?: string;
  street: string;
  city: string;
  postalCode: string;
  countryCode: string;
  heritageProtection?: string;
  constructionYearString?: string;
  livingSpace?: number;
  personsHousehold?: number;
  heatedArea?: number;
  typeOfHeating?: string;
  numberOfBathtubs?: number;
  numberOfShowers?: number;
  typeOfShowers?: string;
  boilerRoomSize?: string;
  installationLocationCeilingHeight?: string;
  widthPathway?: string;
  heightPathway?: string;
  roomsBetweenHeatingRoomAndOutdoorUnit?: string;
  meterClosetLocation?: string;
  electricityConnectionLocation?: string;
  groundingType?: string;
  hasSolarThermalSystem?: boolean;
  consumption?: number;
  consumptionUnit?: string;
  constructionYearHeatingSystem?: number;
  numberOfFloorHeatingDistributors?: number;
  numberOfRadiators?: number;
  domesticHotWaterByHeatpump?: boolean;
  domesticHotWaterCirculationPump?: string;
  domesticWaterStation?: string;
  timeline?: string;
  householdIncome?: string;
  statusOfFoundationConstruction?: string;
  fullReplacementOfHeatingSystemPlanned?: boolean;
};
