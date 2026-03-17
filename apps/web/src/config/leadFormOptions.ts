import {
  BOILER_ROOM_SIZE_VALUES,
  FLOOR_LOCATION_VALUES,
  GROUNDING_TYPE_VALUES,
  IMMO_TYPE_VALUES,
  JA_NEIN_VALUES,
  LOCATION_HEATING_VALUES,
  PROJECT_TIMELINE_VALUES,
  ROOMS_BETWEEN_HEATING_ROOM_AND_OUTDOOR_UNIT_VALUES,
  SYSTEM_TYPE_VALUES,
  TYPE_OF_HEATING_VALUES,
  INSTALLATION_LOCATION_CEILING_HEIGHT_VALUES,
} from "@vamo/shared";

import {
  boilerRoomSizeLabels,
  ceilingHeightLabels,
  floorLocationLabels,
  groundingTypeLabels,
  heritageProtectionLabels,
  immoTypeLabels,
  locationHeatingLabels,
  projectTimelineLabels,
  roomPathLabels,
  systemTypeLabels,
  typeOfHeatingLabels,
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
