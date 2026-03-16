export enum Salutation {
  Frau = "Frau",
  Mann = "Mann",
  Divers = "Divers",
}

export const SALUTATION_VALUES = Object.values(Salutation);

export enum ImmoType {
  SingleOrTwoFamily = "Einfamilienhaus / Zweifamilienhaus",
  RowHouse = "Doppelhaus / Reihenhaus",
  Apartment = "Wohnung",
  Commercial = "Gewerbe",
  MultiFamily = "Mehrfamilienhaus",
  Other = "Sonstiges",
}

export const IMMO_TYPE_VALUES = Object.values(ImmoType);

export enum JaNein {
  Ja = "Ja",
  Nein = "Nein",
}

export const JA_NEIN_VALUES = Object.values(JaNein);

export enum ApartmentHeatingSystem {
  Yes = "Yes",
  No = "No",
}

export const APARTMENT_HEATING_SYSTEM_VALUES = Object.values(
  ApartmentHeatingSystem
);

export enum BoilerRoomSize {
  LessThan4Sqm = "weniger als 4qm",
  MoreThan4Sqm = "mehr als 4 qm",
}

export const BOILER_ROOM_SIZE_VALUES = Object.values(BoilerRoomSize);

export enum InstallationLocationCeilingHeight {
  LowerThan180 = "niedriger als 180 cm",
  Between180And199 = "180 - 199 cm",
  HigherThan199Ascii = "hoeher als 199 cm",
  HigherThan199 = "höher als 199 cm",
}

export const INSTALLATION_LOCATION_CEILING_HEIGHT_VALUES = Object.values(
  InstallationLocationCeilingHeight
);

export enum RoomsBetweenHeatingRoomAndOutdoorUnit {
  NoRoom = "no_room",
  OneRoom = "one_room",
  TwoRoomsOrMore = "two_rooms_or_more",
}

export const ROOMS_BETWEEN_HEATING_ROOM_AND_OUTDOOR_UNIT_VALUES = Object.values(
  RoomsBetweenHeatingRoomAndOutdoorUnit
);

export enum FloorLocation {
  Keller = "Keller",
  Ergeschoss = "Ergeschoss",
  Erdgeschoss = "Erdgeschoss",
  Obergeschoss = "Obergeschoss",
  Dachgeschoss = "Dachgeschoss",
}

export const FLOOR_LOCATION_VALUES = Object.values(FloorLocation);

export enum GroundingType {
  WaterOrGasPipe = "water_or_gas_pipe",
  GroundingSpikeOrFoundation = "grounding_spike_or_foundation",
  NoGrounding = "no_grounding",
  Unknown = "unknown",
}

export const GROUNDING_TYPE_VALUES = Object.values(GroundingType);

export enum OwnershipType {
  OneOwner = "one_owner",
  TwoOwners = "two_owners",
  CommunityOfOwners = "community_of_owners",
}

export const OWNERSHIP_TYPE_VALUES = Object.values(OwnershipType);

export enum TypeOfHeating {
  Radiators = "Heizkörper",
  FloorHeating = "Fußbodenheizung",
  Mixed = "Heizkörper + Fußbodenheizung",
  NightStorageHeater = "Nachtspeicherofen",
  Other = "Sonstiges",
}

export const TYPE_OF_HEATING_VALUES = Object.values(TypeOfHeating);

export enum LocationHeating {
  UnderRoof = "Unterm Dach",
  InBasement = "Im Keller",
  GroundFloorAbbrev = "Im EG",
  FirstFloor = "1.OG",
  Attic = "Dachgeschoss",
  UpperFloor = "Obergeschoss",
  Basement = "Keller",
  GroundFloor = "Erdgeschoss",
}

export const LOCATION_HEATING_VALUES = Object.values(LocationHeating);

export enum ConsumptionUnit {
  Liter = "Liter (l)",
  KilowattHours = "Kilowattstunden (kWh)",
}

export const CONSUMPTION_UNIT_VALUES = Object.values(ConsumptionUnit);

export enum SystemType {
  DistrictHeating = "Fernwärme",
  ApartmentGasHeating = "Gasetagenheizung",
  Coal = "Kohle",
  Oil = "Heizöl",
  HeatPump = "Wärmepumpe",
  NaturalGas = "Erdgas",
  LiquidGas = "Flüssiggas",
  PelletWood = "Pellet-/Holzheizung",
  Other = "Sonstiges",
}

export const SYSTEM_TYPE_VALUES = Object.values(SystemType);

export enum DomesticHotWaterCirculationPump {
  No = "no",
  Unknown = "unknown",
  YesButInactive = "yes_but_inactive",
  YesAndActive = "yes_and_active",
}

export const DOMESTIC_HOT_WATER_CIRCULATION_PUMP_VALUES = Object.values(
  DomesticHotWaterCirculationPump
);

export enum DomesticWaterStation {
  No = "no",
  Unknown = "unknown",
  Yes = "yes",
  WaterFilterAndPressureReducer = "water_filter_and_pressure_reducer",
}

export const DOMESTIC_WATER_STATION_VALUES = Object.values(
  DomesticWaterStation
);

export enum ProjectTimeline {
  Immediate = "Sofort",
  OneToThreeMonths = "1-3 Monate",
  ThreeToSixMonths = "3-6 Monate",
  MoreThanSixMonths = ">6 Monate",
}

export const PROJECT_TIMELINE_VALUES = Object.values(ProjectTimeline);

export enum HouseholdIncome {
  MoreThan40kGross = "more_than_40k_gross",
  LessThan40kGross = "less_than_40k_gross",
  NoAnswer = "no_answer",
}

export const HOUSEHOLD_INCOME_VALUES = Object.values(HouseholdIncome);

export enum FoundationConstructionStatus {
  Vamo = "Vamo",
  Customer = "Kunde",
  NotRequired = "Kein Fundament notwendig",
}

export const FOUNDATION_CONSTRUCTION_STATUS_VALUES = Object.values(
  FoundationConstructionStatus
);

export enum AdditionalDisposal {
  OilTankPlasticUpTo5000l = "oil_tank_plastic_up_to_5000l",
  OilTankPlasticMoreThan5000l = "oil_tank_plastic_more_than_5000l",
  OilTankSteelUpTo5000l = "oil_tank_steel_up_to_5000l",
  OilTankSteelMoreThan5000l = "oil_tank_steel_more_than_5000l",
  HeatPump = "heatpump",
  LiquidGasTank = "liquid_gas_tank",
}

export const ADDITIONAL_DISPOSAL_VALUES = Object.values(AdditionalDisposal);

export enum ShowerType {
  ShowerHead = "Duschkopf",
  Raindance = "Raindance Duschkopf",
  Waterfall = "Wasserfall-Dusche",
}

export const SHOWER_TYPE_VALUES = Object.values(ShowerType);

