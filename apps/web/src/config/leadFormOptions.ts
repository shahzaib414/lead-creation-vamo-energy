import {
  BOILER_ROOM_SIZE_VALUES,
  CONSUMPTION_UNIT_VALUES,
  DOMESTIC_HOT_WATER_CIRCULATION_PUMP_VALUES,
  DOMESTIC_WATER_STATION_VALUES,
  FLOOR_LOCATION_VALUES,
  FOUNDATION_CONSTRUCTION_STATUS_VALUES,
  GROUNDING_TYPE_VALUES,
  HOUSEHOLD_INCOME_VALUES,
  IMMO_TYPE_VALUES,
  JA_NEIN_VALUES,
  LOCATION_HEATING_VALUES,
  PROJECT_TIMELINE_VALUES,
  ROOMS_BETWEEN_HEATING_ROOM_AND_OUTDOOR_UNIT_VALUES,
  SHOWER_TYPE_VALUES,
  SYSTEM_TYPE_VALUES,
  TYPE_OF_HEATING_VALUES,
  INSTALLATION_LOCATION_CEILING_HEIGHT_VALUES,
} from "@vamo/shared";

import {
  boilerRoomSizeLabels,
  ceilingHeightLabels,
  consumptionUnitLabels,
  domesticHotWaterCirculationPumpLabels,
  domesticWaterStationLabels,
  floorLocationLabels,
  foundationConstructionStatusLabels,
  groundingTypeLabels,
  heritageProtectionLabels,
  householdIncomeLabels,
  immoTypeLabels,
  locationHeatingLabels,
  projectTimelineLabels,
  roomPathLabels,
  showerTypeLabels,
  systemTypeLabels,
  typeOfHeatingLabels,
  yesNoPathLabels,
} from "./leadFormLabels";
import { toSelectOptions } from "../lib/options/toSelectOptions";

export const homeTypeOptions = toSelectOptions(IMMO_TYPE_VALUES, immoTypeLabels);

export const yesNoOptions = [
  { label: "Yes", value: true },
  { label: "No", value: false },
];

export const apartmentHeatingOptions = [
  { label: "Yes", value: "Yes" },
  { label: "No", value: "No" },
];

export const systemTypeOptions = toSelectOptions(
  SYSTEM_TYPE_VALUES,
  systemTypeLabels
);

export const heatingLocationOptions = toSelectOptions(
  LOCATION_HEATING_VALUES,
  locationHeatingLabels
);

export const constructionYearRangeOptions = [
  { label: "Before 1995", value: "vor 1995" },
  { label: "1995 - 2000", value: "1995-2000" },
  { label: "2001 - 2010", value: "2001-2010" },
  { label: "2011 - 2020", value: "2011-2020" },
  { label: "From 2021", value: "ab 2021" },
];

export const typeOfHeatingOptions = toSelectOptions(
  TYPE_OF_HEATING_VALUES,
  typeOfHeatingLabels
);

export const boilerRoomSizeOptions = toSelectOptions(
  BOILER_ROOM_SIZE_VALUES,
  boilerRoomSizeLabels
);

export const ceilingHeightOptions = toSelectOptions(
  INSTALLATION_LOCATION_CEILING_HEIGHT_VALUES,
  ceilingHeightLabels
);

export const roomPathOptions = toSelectOptions(
  ROOMS_BETWEEN_HEATING_ROOM_AND_OUTDOOR_UNIT_VALUES,
  roomPathLabels
);

export const floorLocationOptions = toSelectOptions(
  FLOOR_LOCATION_VALUES,
  floorLocationLabels
);

export const groundingTypeOptions = toSelectOptions(
  GROUNDING_TYPE_VALUES,
  groundingTypeLabels
);

export const projectTimelineOptions = toSelectOptions(
  PROJECT_TIMELINE_VALUES,
  projectTimelineLabels
);

export const heritageProtectionOptions = toSelectOptions(
  JA_NEIN_VALUES,
  heritageProtectionLabels
);

export const yesNoPathOptions = toSelectOptions(JA_NEIN_VALUES, yesNoPathLabels);

export const consumptionUnitOptions = toSelectOptions(
  CONSUMPTION_UNIT_VALUES,
  consumptionUnitLabels
);

export const householdIncomeOptions = toSelectOptions(
  HOUSEHOLD_INCOME_VALUES,
  householdIncomeLabels
);

export const foundationConstructionStatusOptions = toSelectOptions(
  FOUNDATION_CONSTRUCTION_STATUS_VALUES,
  foundationConstructionStatusLabels
);

export const showerTypeOptions = toSelectOptions(
  SHOWER_TYPE_VALUES,
  showerTypeLabels
);

export const domesticHotWaterCirculationPumpOptions = toSelectOptions(
  DOMESTIC_HOT_WATER_CIRCULATION_PUMP_VALUES,
  domesticHotWaterCirculationPumpLabels
);

export const domesticWaterStationOptions = toSelectOptions(
  DOMESTIC_WATER_STATION_VALUES,
  domesticWaterStationLabels
);
