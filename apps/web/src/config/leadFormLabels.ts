import {
  BoilerRoomSize,
  FloorLocation,
  GroundingType,
  ImmoType,
  InstallationLocationCeilingHeight,
  JaNein,
  LocationHeating,
  ProjectTimeline,
  RoomsBetweenHeatingRoomAndOutdoorUnit,
  SystemType,
  TypeOfHeating,
} from "@vamo/shared";

export const immoTypeLabels: Record<ImmoType, string> = {
  [ImmoType.SingleOrTwoFamily]: "Single-family or two-family house",
  [ImmoType.RowHouse]: "Semi-detached or row house",
  [ImmoType.Apartment]: "Apartment",
  [ImmoType.Commercial]: "Commercial property",
  [ImmoType.MultiFamily]: "Multi-family building",
  [ImmoType.Other]: "Other",
};

export const systemTypeLabels: Record<SystemType, string> = {
  [SystemType.DistrictHeating]: "District heating",
  [SystemType.ApartmentGasHeating]: "Apartment gas heating",
  [SystemType.Coal]: "Coal",
  [SystemType.Oil]: "Oil",
  [SystemType.HeatPump]: "Heat pump",
  [SystemType.NaturalGas]: "Natural gas",
  [SystemType.LiquidGas]: "Liquid gas",
  [SystemType.PelletWood]: "Pellet / wood heating",
  [SystemType.Other]: "Other",
};

export const locationHeatingLabels: Record<LocationHeating, string> = {
  [LocationHeating.UnderRoof]: "Under the roof",
  [LocationHeating.InBasement]: "In the basement",
  [LocationHeating.GroundFloorAbbrev]: "Ground floor",
  [LocationHeating.FirstFloor]: "First floor",
  [LocationHeating.Attic]: "Attic",
  [LocationHeating.UpperFloor]: "Upper floor",
  [LocationHeating.Basement]: "Basement",
  [LocationHeating.GroundFloor]: "Ground floor",
};

export const typeOfHeatingLabels: Record<TypeOfHeating, string> = {
  [TypeOfHeating.Radiators]: "Radiators",
  [TypeOfHeating.FloorHeating]: "Floor heating",
  [TypeOfHeating.Mixed]: "Radiators + floor heating",
  [TypeOfHeating.NightStorageHeater]: "Night storage heater",
  [TypeOfHeating.Other]: "Other",
};

export const boilerRoomSizeLabels: Record<BoilerRoomSize, string> = {
  [BoilerRoomSize.LessThan4Sqm]: "Less than 4 sqm",
  [BoilerRoomSize.MoreThan4Sqm]: "More than 4 sqm",
};

export const ceilingHeightLabels: Record<InstallationLocationCeilingHeight, string> =
  {
    [InstallationLocationCeilingHeight.LowerThan180]: "Lower than 180 cm",
    [InstallationLocationCeilingHeight.Between180And199]: "180 - 199 cm",
    [InstallationLocationCeilingHeight.HigherThan199Ascii]: "Higher than 199 cm",
    [InstallationLocationCeilingHeight.HigherThan199]: "Higher than 199 cm",
  };

export const roomPathLabels: Record<RoomsBetweenHeatingRoomAndOutdoorUnit, string> = {
  [RoomsBetweenHeatingRoomAndOutdoorUnit.NoRoom]: "No room",
  [RoomsBetweenHeatingRoomAndOutdoorUnit.OneRoom]: "One room",
  [RoomsBetweenHeatingRoomAndOutdoorUnit.TwoRoomsOrMore]: "Two or more rooms",
};

export const floorLocationLabels: Record<FloorLocation, string> = {
  [FloorLocation.Keller]: "Basement",
  [FloorLocation.Ergeschoss]: "Ground floor",
  [FloorLocation.Erdgeschoss]: "Ground floor",
  [FloorLocation.Obergeschoss]: "Upper floor",
  [FloorLocation.Dachgeschoss]: "Attic",
};

export const groundingTypeLabels: Record<GroundingType, string> = {
  [GroundingType.WaterOrGasPipe]: "Water or gas pipe",
  [GroundingType.GroundingSpikeOrFoundation]: "Grounding spike or foundation",
  [GroundingType.NoGrounding]: "No grounding",
  [GroundingType.Unknown]: "Unknown",
};

export const projectTimelineLabels: Record<ProjectTimeline, string> = {
  [ProjectTimeline.Immediate]: "Immediately",
  [ProjectTimeline.OneToThreeMonths]: "1 - 3 months",
  [ProjectTimeline.ThreeToSixMonths]: "3 - 6 months",
  [ProjectTimeline.MoreThanSixMonths]: "More than 6 months",
};

export const heritageProtectionLabels: Record<JaNein, string> = {
  [JaNein.Ja]: "Yes",
  [JaNein.Nein]: "No",
};
