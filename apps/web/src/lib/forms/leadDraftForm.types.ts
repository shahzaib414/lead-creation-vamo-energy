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
  boilerRoomSize?: string;
  installationLocationCeilingHeight?: string;
  roomsBetweenHeatingRoomAndOutdoorUnit?: string;
  meterClosetLocation?: string;
  electricityConnectionLocation?: string;
  groundingType?: string;
  hasSolarThermalSystem?: boolean;
  timeline?: string;
  fullReplacementOfHeatingSystemPlanned?: boolean;
};
