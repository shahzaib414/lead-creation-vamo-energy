import { z } from "zod";

import type {
  LeadDraftFormValues,
  LeadFormStepKey,
} from "./leadDraftForm.types";

const leadContactSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  phone: z.string().min(1, "Phone is required"),
  email: z.email("Enter a valid email"),
});

const homeTypeSchema = z
  .object({
    immoType: z.string().min(1, "Home type is required"),
    ownerOccupiedHousing: z.boolean({
      error: "Please confirm whether the home is owner occupied",
    }),
    residentialUnits: z.number().int().min(1).optional(),
    apartmentHeatingSystem: z.enum(["Yes", "No"]).optional(),
  })
  .superRefine((values, context) => {
    if (values.immoType === "Wohnung" && !values.apartmentHeatingSystem) {
      context.addIssue({
        code: "custom",
        path: ["apartmentHeatingSystem"],
        message: "Please tell us whether the apartment has its own heating system",
      });
    }
  });

const currentHeatingSchema = z.object({
  systemType: z.string().min(1, "Current heating system is required"),
  locationHeating: z.string().optional(),
});

const propertyDetailsSchema = z
  .object({
    street: z.string().optional(),
    city: z.string().optional(),
    postalCode: z.string().optional(),
    countryCode: z
      .string()
      .optional()
      .refine(
        (value) => value === undefined || value.length === 0 || value.length === 2,
        "Use a 2-letter country code"
      ),
    constructionYearString: z.string().optional(),
    livingSpace: z.number().min(1, "Living space must be at least 1 sqm").optional(),
    heatedArea: z.number().min(1, "Heated area must be at least 1 sqm").optional(),
    personsHousehold: z
      .number()
      .min(1, "People in household must be at least 1")
      .optional(),
    typeOfHeating: z.string().optional(),
    heritageProtection: z.string().optional(),
    numberOfBathtubs: z.number().min(0, "Bathtub count cannot be negative").optional(),
    numberOfShowers: z.number().min(0, "Shower count cannot be negative").optional(),
    typeOfShowers: z.string().optional(),
  })
  .superRefine((values, context) => {
    const hasAddress =
      Boolean(values.street?.trim()) ||
      Boolean(values.city?.trim()) ||
      Boolean(values.postalCode?.trim()) ||
      Boolean(values.countryCode?.trim());

    const hasPropertyDetails =
      Boolean(values.constructionYearString?.trim()) ||
      values.livingSpace !== undefined ||
      values.heatedArea !== undefined ||
      values.personsHousehold !== undefined ||
      Boolean(values.typeOfHeating?.trim()) ||
      Boolean(values.heritageProtection?.trim()) ||
      values.numberOfBathtubs !== undefined ||
      values.numberOfShowers !== undefined ||
      Boolean(values.typeOfShowers?.trim());

    if (!hasAddress && !hasPropertyDetails) {
      context.addIssue({
        code: "custom",
        path: ["street"],
        message: "Add an address or at least one property detail to continue",
      });
    }
  });

const technicalDetailsSchema = z.object({
  boilerRoomSize: z.string().min(1, "Boiler room size is required"),
  installationLocationCeilingHeight: z
    .string()
    .min(1, "Ceiling height is required"),
  widthPathway: z.string().optional(),
  heightPathway: z.string().optional(),
  roomsBetweenHeatingRoomAndOutdoorUnit: z
    .string()
    .min(1, "Please describe the pathway between the rooms"),
  meterClosetLocation: z.string().min(1, "Meter closet location is required"),
  electricityConnectionLocation: z
    .string()
    .min(1, "Electricity connection location is required"),
  groundingType: z.string().min(1, "Grounding type is required"),
  consumption: z.number().min(0, "Consumption cannot be negative").optional(),
  consumptionUnit: z.string().optional(),
  constructionYearHeatingSystem: z
    .number()
    .min(0, "Construction year cannot be negative")
    .optional(),
  numberOfFloorHeatingDistributors: z
    .number()
    .min(0, "Distributor count cannot be negative")
    .optional(),
  numberOfRadiators: z.number().min(0, "Radiator count cannot be negative").optional(),
  domesticHotWaterByHeatpump: z.boolean().optional(),
  domesticHotWaterCirculationPump: z.string().optional(),
  domesticWaterStation: z.string().optional(),
  timeline: z.string().min(1, "Project timeline is required"),
  householdIncome: z.string().optional(),
  statusOfFoundationConstruction: z.string().optional(),
  fullReplacementOfHeatingSystemPlanned: z.boolean({
    error: "Please confirm the replacement intent",
  }),
});

const reviewSubmitSchema = z.object({});

const stepSchemaMap: Record<
  LeadFormStepKey,
  z.ZodType<Partial<LeadDraftFormValues>>
> = {
  leadContact: leadContactSchema,
  homeType: homeTypeSchema,
  currentHeating: currentHeatingSchema,
  propertyDetails: propertyDetailsSchema,
  technicalDetails: technicalDetailsSchema,
  reviewSubmit: reviewSubmitSchema,
};

export function validateLeadDraftStep(
  stepKey: LeadFormStepKey,
  values: LeadDraftFormValues
) {
  return stepSchemaMap[stepKey].safeParse(values);
}
