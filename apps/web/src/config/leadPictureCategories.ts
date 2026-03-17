export const leadPictureCategoryOptions = [
  { value: "outdoorUnitLocation", label: "Outdoor unit location" },
  {
    value: "outdoorUnitLocationWithArea",
    label: "Outdoor unit location with surrounding area",
  },
  { value: "heatingRoom", label: "Heating room" },
  {
    value: "meterClosetWithDoorOpen",
    label: "Meter closet with door open",
  },
  {
    value: "meterClosetSlsSwitchDetailed",
    label: "Meter closet SLS switch detailed",
  },
  {
    value: "floorHeatingDistributionWithDoorOpen",
    label: "Floor heating distribution with door open",
  },
] as const;

export type LeadPictureCategory = (typeof leadPictureCategoryOptions)[number]["value"];
