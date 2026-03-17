import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import type { HydratedDocument } from "mongoose";

import {
  ADDITIONAL_DISPOSAL_VALUES,
  APARTMENT_HEATING_SYSTEM_VALUES,
  BOILER_ROOM_SIZE_VALUES,
  CONSUMPTION_UNIT_VALUES,
  DOMESTIC_HOT_WATER_CIRCULATION_PUMP_VALUES,
  DOMESTIC_WATER_STATION_VALUES,
  FLOOR_LOCATION_VALUES,
  FOUNDATION_CONSTRUCTION_STATUS_VALUES,
  GROUNDING_TYPE_VALUES,
  HOUSEHOLD_INCOME_VALUES,
  IMMO_TYPE_VALUES,
  INSTALLATION_LOCATION_CEILING_HEIGHT_VALUES,
  JA_NEIN_VALUES,
  LOCATION_HEATING_VALUES,
  OWNERSHIP_TYPE_VALUES,
  PROJECT_TIMELINE_VALUES,
  ROOMS_BETWEEN_HEATING_ROOM_AND_OUTDOOR_UNIT_VALUES,
  SALUTATION_VALUES,
  SHOWER_TYPE_VALUES,
  SYSTEM_TYPE_VALUES,
  TYPE_OF_HEATING_VALUES,
  FeasibilityStatus,
  FormStep,
  LeadStage,
} from "@vamo/shared";

export type LeadDraftDocument = HydratedDocument<LeadDraft>;

@Schema({ _id: false })
export class PictureUrl {
  @Prop({ required: false, trim: true })
  url?: string;

  @Prop({ required: false, trim: true })
  objectKey?: string;
}

export const PictureUrlSchema = SchemaFactory.createForClass(PictureUrl);

@Schema({ _id: false })
export class ContactInformationPayload {
  @Prop({ enum: SALUTATION_VALUES, required: false })
  salutation?: string;

  @Prop({ required: false, trim: true })
  firstName?: string;

  @Prop({ required: false, trim: true })
  lastName?: string;

  @Prop({ required: false, trim: true })
  phone?: string;

  @Prop({ required: false, trim: true, lowercase: true })
  email?: string;

  @Prop({ required: false })
  newsletterSingleOptIn?: boolean;
}

export const ContactInformationPayloadSchema = SchemaFactory.createForClass(
  ContactInformationPayload
);

@Schema({ _id: false })
export class AddressPayload {
  @Prop({ required: false, trim: true })
  street?: string;

  @Prop({ required: false, trim: true })
  city?: string;

  @Prop({ required: false, trim: true })
  postalCode?: string;

  @Prop({ required: false, trim: true, uppercase: true })
  countryCode?: string;

  @Prop({ required: false, trim: true })
  addressAddition?: string;
}

export const AddressPayloadSchema = SchemaFactory.createForClass(AddressPayload);

@Schema({ _id: false })
export class MarketingPayload {
  @Prop({ required: false, trim: true })
  customerLoyaltyProgramType?: string;

  @Prop({ required: false, trim: true })
  customerLoyaltyProgramId?: string;
}

export const MarketingPayloadSchema =
  SchemaFactory.createForClass(MarketingPayload);

@Schema({ _id: false })
export class ContactPayload {
  @Prop({ type: ContactInformationPayloadSchema, required: false })
  contactInformation?: ContactInformationPayload;

  @Prop({ type: AddressPayloadSchema, required: false })
  address?: AddressPayload;

  @Prop({ type: MarketingPayloadSchema, required: false })
  marketing?: MarketingPayload;
}

export const ContactPayloadSchema = SchemaFactory.createForClass(ContactPayload);

@Schema({ _id: false })
export class BuildingInformationPayload {
  @Prop({ enum: IMMO_TYPE_VALUES, required: false })
  immoType?: string;

  @Prop({ enum: JA_NEIN_VALUES, required: false })
  heritageProtection?: string;

  @Prop({ required: false, min: 0 })
  constructionYear?: number;

  @Prop({ required: false, min: 0 })
  livingSpace?: number;

  @Prop({ required: false, trim: true })
  constructionYearString?: string;

  @Prop({ required: false, min: 0 })
  residentialUnits?: number;

  @Prop({ enum: BOILER_ROOM_SIZE_VALUES, required: false })
  boilerRoomSize?: string;

  @Prop({
    enum: INSTALLATION_LOCATION_CEILING_HEIGHT_VALUES,
    required: false,
  })
  installationLocationCeilingHeight?: string;

  @Prop({ enum: JA_NEIN_VALUES, required: false })
  widthPathway?: string;

  @Prop({ enum: JA_NEIN_VALUES, required: false })
  heightPathway?: string;

  @Prop({
    enum: ROOMS_BETWEEN_HEATING_ROOM_AND_OUTDOOR_UNIT_VALUES,
    required: false,
  })
  roomsBetweenHeatingRoomAndOutdoorUnit?: string;

  @Prop({ enum: FLOOR_LOCATION_VALUES, required: false })
  meterClosetLocation?: string;

  @Prop({ enum: FLOOR_LOCATION_VALUES, required: false })
  electricityConnectionLocation?: string;

  @Prop({ enum: GROUNDING_TYPE_VALUES, required: false })
  groundingType?: string;

  @Prop({ required: false })
  hasSolarThermalSystem?: boolean;

  @Prop({ required: false, min: 0 })
  personsHousehold?: number;
}

export const BuildingInformationPayloadSchema =
  SchemaFactory.createForClass(BuildingInformationPayload);

@Schema({ _id: false })
export class OwnershipRelationshipsPayload {
  @Prop({ required: false, trim: true })
  ownershipRelationship?: string;

  @Prop({ required: false, trim: true })
  ownershipRelationshipExplanation?: string;

  @Prop({ required: false, min: 0 })
  numberOfOwners?: number;

  @Prop({ required: false })
  ownerOccupiedHousing?: boolean;

  @Prop({ enum: OWNERSHIP_TYPE_VALUES, required: false })
  type?: string;
}

export const OwnershipRelationshipsPayloadSchema =
  SchemaFactory.createForClass(OwnershipRelationshipsPayload);

@Schema({ _id: false })
export class EnergyRelevantInformationPayload {
  @Prop({ required: false, min: 0 })
  heatedArea?: number;

  @Prop({ required: false, trim: true })
  heatedAreaString?: string;

  @Prop({ enum: TYPE_OF_HEATING_VALUES, required: false })
  typeOfHeating?: string;

  @Prop({ enum: LOCATION_HEATING_VALUES, required: false })
  locationHeating?: string;

  @Prop({ enum: APARTMENT_HEATING_SYSTEM_VALUES, required: false })
  apartmentHeatingSystem?: string;
}

export const EnergyRelevantInformationPayloadSchema =
  SchemaFactory.createForClass(EnergyRelevantInformationPayload);

@Schema({ _id: false })
export class HotWaterPayload {
  @Prop({ required: false, min: 0 })
  numberOfBathtubs?: number;

  @Prop({ required: false, min: 0 })
  numberOfShowers?: number;

  @Prop({ enum: SHOWER_TYPE_VALUES, required: false })
  typeOfShowers?: string;
}

export const HotWaterPayloadSchema = SchemaFactory.createForClass(HotWaterPayload);

@Schema({ _id: false })
export class BuildingPayload {
  @Prop({ type: AddressPayloadSchema, required: false })
  address?: AddressPayload;

  @Prop({ type: BuildingInformationPayloadSchema, required: false })
  buildingInformation?: BuildingInformationPayload;

  @Prop({ type: OwnershipRelationshipsPayloadSchema, required: false })
  ownershipRelationships?: OwnershipRelationshipsPayload;

  @Prop({ type: EnergyRelevantInformationPayloadSchema, required: false })
  energyRelevantInformation?: EnergyRelevantInformationPayload;

  @Prop({ type: HotWaterPayloadSchema, required: false })
  hotWater?: HotWaterPayload;
}

export const BuildingPayloadSchema = SchemaFactory.createForClass(BuildingPayload);

@Schema({ _id: false })
export class HeatingSystemPayload {
  @Prop({ required: false, min: 0 })
  consumption?: number;

  @Prop({ enum: CONSUMPTION_UNIT_VALUES, required: false })
  consumptionUnit?: string;

  @Prop({ enum: SYSTEM_TYPE_VALUES, required: false })
  systemType?: string;

  @Prop({ required: false, min: 0 })
  constructionYearHeatingSystem?: number;

  @Prop({ required: false, trim: true })
  constructionYearHeatingSystemString?: string;

  @Prop({ required: false, trim: true })
  model?: string;

  @Prop({ required: false })
  floorHeatingConnectedToReturnPipe?: boolean;

  @Prop({ required: false })
  floorHeatingOwnHeatingCircuit?: boolean;

  @Prop({ required: false })
  floorHeatingOnlyInSmallRooms?: boolean;

  @Prop({ required: false, min: 0 })
  numberOfFloorHeatingDistributors?: number;

  @Prop({ required: false, min: 0 })
  numberOfRadiators?: number;

  @Prop({ required: false })
  domesticHotWaterByHeatpump?: boolean;

  @Prop({
    enum: DOMESTIC_HOT_WATER_CIRCULATION_PUMP_VALUES,
    required: false,
  })
  domesticHotWaterCirculationPump?: string;

  @Prop({ enum: DOMESTIC_WATER_STATION_VALUES, required: false })
  domestic_water_station?: string;
}

export const HeatingSystemPayloadSchema =
  SchemaFactory.createForClass(HeatingSystemPayload);

@Schema({ _id: false })
export class ProjectPicturesPayload {
  @Prop({ type: [PictureUrlSchema], required: false })
  outdoorUnitLocation?: PictureUrl[];

  @Prop({ type: [PictureUrlSchema], required: false })
  outdoorUnitLocationWithArea?: PictureUrl[];

  @Prop({ type: [PictureUrlSchema], required: false })
  heatingRoom?: PictureUrl[];

  @Prop({ type: [PictureUrlSchema], required: false })
  meterClosetWithDoorOpen?: PictureUrl[];

  @Prop({ type: [PictureUrlSchema], required: false })
  meterClosetSlsSwitchDetailed?: PictureUrl[];

  @Prop({ type: [PictureUrlSchema], required: false })
  floorHeatingDistributionWithDoorOpen?: PictureUrl[];
}

export const ProjectPicturesPayloadSchema =
  SchemaFactory.createForClass(ProjectPicturesPayload);

@Schema({ _id: false })
export class ProjectPayload {
  @Prop({ enum: PROJECT_TIMELINE_VALUES, required: false })
  timeline?: string;

  @Prop({ enum: HOUSEHOLD_INCOME_VALUES, required: false })
  householdIncome?: string;

  @Prop({ enum: FOUNDATION_CONSTRUCTION_STATUS_VALUES, required: false })
  statusOfFoundationConstruction?: string;

  @Prop({ required: false, trim: true })
  infosLeadsource?: string;

  @Prop({ required: false })
  fullReplacementOfHeatingSystemPlanned?: boolean;

  @Prop({ type: [String], enum: ADDITIONAL_DISPOSAL_VALUES, required: false })
  additionalDisposal?: string[];

  @Prop({ required: false })
  shouldKeepSolarThermalSystem?: boolean;

  @Prop({ type: ProjectPicturesPayloadSchema, required: false })
  pictures?: ProjectPicturesPayload;
}

export const ProjectPayloadSchema = SchemaFactory.createForClass(ProjectPayload);

@Schema({ _id: false })
export class LeadPayload {

  @Prop({ type: ContactPayloadSchema, required: false })
  contact?: ContactPayload;

  @Prop({ type: BuildingPayloadSchema, required: false })
  building?: BuildingPayload;

  @Prop({ type: HeatingSystemPayloadSchema, required: false })
  heatingSystem?: HeatingSystemPayload;

  @Prop({ type: ProjectPayloadSchema, required: false })
  project?: ProjectPayload;
}

export const LeadPayloadSchema = SchemaFactory.createForClass(LeadPayload);

@Schema({
  timestamps: true,
  collection: "lead_drafts",
})
export class LeadDraft {
  @Prop({ required: true, unique: true, trim: true })
  draftId: string = "";

  @Prop({ type: LeadPayloadSchema, required: true, default: () => ({}) })
  payload: LeadPayload = {};

  @Prop({
    required: true,
    enum: Object.values(FormStep),
    default: FormStep.LeadContact,
  })
  currentStep: FormStep = FormStep.LeadContact;

  @Prop({
    required: true,
    enum: Object.values(LeadStage),
    default: LeadStage.LeadCapture,
  })
  leadStage: LeadStage = LeadStage.LeadCapture;

  @Prop({
    required: true,
    enum: Object.values(FeasibilityStatus),
    default: FeasibilityStatus.Unknown,
  })
  feasibilityStatus: FeasibilityStatus = FeasibilityStatus.Unknown;

  @Prop({ required: true, default: false })
  isSubmitted: boolean = false;

  @Prop({ required: true })
  expiresAt: Date = new Date();
  
  createdAt: Date = new Date();
  updatedAt: Date = new Date();
}

export const LeadDraftSchema = SchemaFactory.createForClass(LeadDraft);

LeadDraftSchema.index({ draftId: 1 }, { unique: true });
LeadDraftSchema.index({ updatedAt: -1 });
LeadDraftSchema.index({ isSubmitted: 1 });
LeadDraftSchema.index({ expiresAt: 1 });
LeadDraftSchema.index({ "payload.contact.contactInformation.email": 1 });
LeadDraftSchema.index({ "payload.contact.contactInformation.phone": 1 });
