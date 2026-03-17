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
  locationHeating: z.string().min(1, "Heating location is required"),
});

const propertyDetailsSchema = z.object({
  street: z.string().min(1, "Street is required"),
  city: z.string().min(1, "City is required"),
  postalCode: z.string().min(1, "Postal code is required"),
  countryCode: z.string().length(2, "Use a 2-letter country code"),
  constructionYearString: z.string().min(1, "Construction year range is required"),
  livingSpace: z.number().min(1, "Living space is required"),
  heatedArea: z.number().min(1, "Heated area is required"),
  typeOfHeating: z.string().min(1, "Type of heating is required"),
});

const technicalDetailsSchema = z.object({
  boilerRoomSize: z.string().min(1, "Boiler room size is required"),
  installationLocationCeilingHeight: z
    .string()
    .min(1, "Ceiling height is required"),
  roomsBetweenHeatingRoomAndOutdoorUnit: z
    .string()
    .min(1, "Please describe the pathway between the rooms"),
  meterClosetLocation: z.string().min(1, "Meter closet location is required"),
  electricityConnectionLocation: z
    .string()
    .min(1, "Electricity connection location is required"),
  groundingType: z.string().min(1, "Grounding type is required"),
  timeline: z.string().min(1, "Project timeline is required"),
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
