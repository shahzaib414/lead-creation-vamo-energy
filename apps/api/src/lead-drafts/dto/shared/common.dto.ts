import { Type } from "class-transformer";
import {
  IsArray,
  IsBoolean,
  IsEmail,
  IsEnum,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
  Matches,
  Min,
  ValidateNested,
} from "class-validator";

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
} from "@vamo/shared";

const PHONE_WITH_COUNTRY_CODE_PATTERN = /^\+\d[\d\s()-]*$/;
const COUNTRY_CODE_PATTERN = /^[A-Z]{2}$/;
const invalidTextMessage = (field: string) => `${field} must be text`;
const requiredTextMessage = (field: string) => `${field} is required`;
const invalidEnumMessage = (field: string) =>
  `${field} has an unsupported value`;
const invalidIntegerMessage = (field: string) =>
  `${field} must be a whole number`;
const minValueMessage = (field: string, min: number) =>
  `${field} must be at least ${min}`;
const invalidBooleanMessage = (field: string) =>
  `${field} must be true or false`;
const invalidArrayMessage = (field: string) => `${field} must be a list`;

export class AddressDto {
  @IsOptional()
  @IsString({ message: invalidTextMessage("street") })
  street?: string;

  @IsOptional()
  @IsString({ message: invalidTextMessage("city") })
  city?: string;

  @IsOptional()
  @IsString({ message: invalidTextMessage("postalCode") })
  postalCode?: string;

  @IsOptional()
  @Matches(COUNTRY_CODE_PATTERN, {
    message: "countryCode must be a two-letter country code like DE",
  })
  countryCode?: string;

  @IsOptional()
  @IsString({ message: invalidTextMessage("addressAddition") })
  addressAddition?: string;
}

export class MarketingDto {
  @IsOptional()
  @IsString({ message: invalidTextMessage("customerLoyaltyProgramType") })
  customerLoyaltyProgramType?: string;

  @IsOptional()
  @IsString({ message: invalidTextMessage("customerLoyaltyProgramId") })
  customerLoyaltyProgramId?: string;
}

export class ContactInformationDto {
  @IsOptional()
  @IsEnum(SALUTATION_VALUES, { message: invalidEnumMessage("salutation") })
  salutation?: string;

  @IsOptional()
  @IsString({ message: invalidTextMessage("firstName") })
  firstName?: string;

  @IsOptional()
  @IsString({ message: invalidTextMessage("lastName") })
  lastName?: string;

  @IsOptional()
  @Matches(PHONE_WITH_COUNTRY_CODE_PATTERN, {
    message:
      "phone must include a country code, for example +49 172 2049937",
  })
  phone?: string;

  @IsOptional()
  @IsEmail({}, { message: "email must be a valid email address" })
  email?: string;

  @IsOptional()
  @IsBoolean({ message: invalidBooleanMessage("newsletterSingleOptIn") })
  newsletterSingleOptIn?: boolean;
}

export class CreateContactInformationDto {
  @IsOptional()
  @IsEnum(SALUTATION_VALUES, { message: invalidEnumMessage("salutation") })
  salutation?: string;

  @IsString({ message: invalidTextMessage("firstName") })
  @IsNotEmpty({ message: requiredTextMessage("firstName") })
  firstName!: string;

  @IsString({ message: invalidTextMessage("lastName") })
  @IsNotEmpty({ message: requiredTextMessage("lastName") })
  lastName!: string;

  @Matches(PHONE_WITH_COUNTRY_CODE_PATTERN, {
    message:
      "phone must include a country code, for example +49 172 2049937",
  })
  phone!: string;

  @IsEmail({}, { message: "email must be a valid email address" })
  email!: string;

  @IsOptional()
  @IsBoolean({ message: invalidBooleanMessage("newsletterSingleOptIn") })
  newsletterSingleOptIn?: boolean;
}

export class ContactDto {
  @IsOptional()
  @ValidateNested()
  @Type(() => ContactInformationDto)
  contactInformation?: ContactInformationDto;

  @IsOptional()
  @ValidateNested()
  @Type(() => AddressDto)
  address?: AddressDto;

  @IsOptional()
  @ValidateNested()
  @Type(() => MarketingDto)
  marketing?: MarketingDto;
}

export class CreateContactDto {
  @ValidateNested()
  @Type(() => CreateContactInformationDto)
  contactInformation!: CreateContactInformationDto;
}

export class BuildingInformationDto {
  @IsOptional()
  @IsEnum(IMMO_TYPE_VALUES, { message: invalidEnumMessage("immoType") })
  immoType?: string;

  @IsOptional()
  @IsInt({ message: invalidIntegerMessage("residentialUnits") })
  @Min(1, { message: minValueMessage("residentialUnits", 1) })
  residentialUnits?: number;
 
  @IsOptional()
  @IsEnum(JA_NEIN_VALUES, { message: invalidEnumMessage("heritageProtection") })
  heritageProtection?: string;

  @IsOptional()
  @IsInt({ message: invalidIntegerMessage("constructionYear") })
  @Min(0, { message: minValueMessage("constructionYear", 0) })
  constructionYear?: number;

  @IsOptional()
  @IsString({ message: invalidTextMessage("constructionYearString") })
  constructionYearString?: string;

  @IsOptional()
  @IsInt({ message: invalidIntegerMessage("livingSpace") })
  @Min(0, { message: minValueMessage("livingSpace", 0) })
  livingSpace?: number;

  @IsOptional()
  @IsInt({ message: invalidIntegerMessage("personsHousehold") })
  @Min(0, { message: minValueMessage("personsHousehold", 0) })
  personsHousehold?: number;
 
  @IsOptional()
  @IsEnum(BOILER_ROOM_SIZE_VALUES, {
    message: invalidEnumMessage("boilerRoomSize"),
  })
  boilerRoomSize?: string;

  @IsOptional()
  @IsEnum(INSTALLATION_LOCATION_CEILING_HEIGHT_VALUES, {
    message: invalidEnumMessage("installationLocationCeilingHeight"),
  })
  installationLocationCeilingHeight?: string;

  @IsOptional()
  @IsEnum(JA_NEIN_VALUES, { message: invalidEnumMessage("widthPathway") })
  widthPathway?: string;

  @IsOptional()
  @IsEnum(JA_NEIN_VALUES, { message: invalidEnumMessage("heightPathway") })
  heightPathway?: string;

  @IsOptional()
  @IsEnum(ROOMS_BETWEEN_HEATING_ROOM_AND_OUTDOOR_UNIT_VALUES, {
    message: invalidEnumMessage("roomsBetweenHeatingRoomAndOutdoorUnit"),
  })
  roomsBetweenHeatingRoomAndOutdoorUnit?: string;

  @IsOptional()
  @IsEnum(FLOOR_LOCATION_VALUES, { message: invalidEnumMessage("meterClosetLocation") })
  meterClosetLocation?: string;

  @IsOptional()
  @IsEnum(FLOOR_LOCATION_VALUES, {
    message: invalidEnumMessage("electricityConnectionLocation"),
  })
  electricityConnectionLocation?: string;

  @IsOptional()
  @IsEnum(GROUNDING_TYPE_VALUES, { message: invalidEnumMessage("groundingType") })
  groundingType?: string;

  @IsOptional()
  @IsBoolean({ message: invalidBooleanMessage("hasSolarThermalSystem") })
  hasSolarThermalSystem?: boolean;
}

export class OwnershipRelationshipsDto {
  @IsOptional()
  @IsString({ message: invalidTextMessage("ownershipRelationship") })
  ownershipRelationship?: string;

  @IsOptional()
  @IsString({ message: invalidTextMessage("ownershipRelationshipExplanation") })
  ownershipRelationshipExplanation?: string;

  @IsOptional()
  @IsInt({ message: invalidIntegerMessage("numberOfOwners") })
  @Min(0, { message: minValueMessage("numberOfOwners", 0) })
  numberOfOwners?: number;

  @IsOptional()
  @IsBoolean({ message: invalidBooleanMessage("ownerOccupiedHousing") })
  ownerOccupiedHousing?: boolean;

  @IsOptional()
  @IsEnum(OWNERSHIP_TYPE_VALUES, { message: invalidEnumMessage("type") })
  type?: string;
}

export class EnergyRelevantInformationDto {
  @IsOptional()
  @IsInt({ message: invalidIntegerMessage("heatedArea") })
  @Min(0, { message: minValueMessage("heatedArea", 0) })
  heatedArea?: number;

  @IsOptional()
  @IsString({ message: invalidTextMessage("heatedAreaString") })
  heatedAreaString?: string;

  @IsOptional()
  @IsEnum(TYPE_OF_HEATING_VALUES, { message: invalidEnumMessage("typeOfHeating") })
  typeOfHeating?: string;

  @IsOptional()
  @IsEnum(LOCATION_HEATING_VALUES, { message: invalidEnumMessage("locationHeating") })
  locationHeating?: string;

  @IsOptional()
  @IsEnum(APARTMENT_HEATING_SYSTEM_VALUES, {
    message: invalidEnumMessage("apartmentHeatingSystem"),
  })
  apartmentHeatingSystem?: string;
}

export class HotWaterDto {
  @IsOptional()
  @IsInt({ message: invalidIntegerMessage("numberOfBathtubs") })
  @Min(0, { message: minValueMessage("numberOfBathtubs", 0) })
  numberOfBathtubs?: number;

  @IsOptional()
  @IsInt({ message: invalidIntegerMessage("numberOfShowers") })
  @Min(0, { message: minValueMessage("numberOfShowers", 0) })
  numberOfShowers?: number;

  @IsOptional()
  @IsEnum(SHOWER_TYPE_VALUES, { message: invalidEnumMessage("typeOfShowers") })
  typeOfShowers?: string;
}

export class BuildingDto {
  @IsOptional()
  @ValidateNested()
  @Type(() => AddressDto)
  address?: AddressDto;

  @IsOptional()
  @ValidateNested()
  @Type(() => BuildingInformationDto)
  buildingInformation?: BuildingInformationDto;

  @IsOptional()
  @ValidateNested()
  @Type(() => OwnershipRelationshipsDto)
  ownershipRelationships?: OwnershipRelationshipsDto;

  @IsOptional()
  @ValidateNested()
  @Type(() => EnergyRelevantInformationDto)
  energyRelevantInformation?: EnergyRelevantInformationDto;

  @IsOptional()
  @ValidateNested()
  @Type(() => HotWaterDto)
  hotWater?: HotWaterDto;
}

export class HeatingSystemDto {
  @IsOptional()
  @IsEnum(SYSTEM_TYPE_VALUES, { message: invalidEnumMessage("systemType") })
  systemType?: string;

  @IsOptional()
  @IsInt({ message: invalidIntegerMessage("consumption") })
  @Min(0, { message: minValueMessage("consumption", 0) })
  consumption?: number;

  @IsOptional()
  @IsEnum(CONSUMPTION_UNIT_VALUES, { message: invalidEnumMessage("consumptionUnit") })
  consumptionUnit?: string;

  @IsOptional()
  @IsInt({ message: invalidIntegerMessage("constructionYearHeatingSystem") })
  @Min(0, { message: minValueMessage("constructionYearHeatingSystem", 0) })
  constructionYearHeatingSystem?: number;

  @IsOptional()
  @IsString({ message: invalidTextMessage("constructionYearHeatingSystemString") })
  constructionYearHeatingSystemString?: string;

  @IsOptional()
  @IsString({ message: invalidTextMessage("model") })
  model?: string;

  @IsOptional()
  @IsBoolean({ message: invalidBooleanMessage("floorHeatingConnectedToReturnPipe") })
  floorHeatingConnectedToReturnPipe?: boolean;

  @IsOptional()
  @IsBoolean({ message: invalidBooleanMessage("floorHeatingOwnHeatingCircuit") })
  floorHeatingOwnHeatingCircuit?: boolean;

  @IsOptional()
  @IsBoolean({ message: invalidBooleanMessage("floorHeatingOnlyInSmallRooms") })
  floorHeatingOnlyInSmallRooms?: boolean;

  @IsOptional()
  @IsInt({ message: invalidIntegerMessage("numberOfFloorHeatingDistributors") })
  @Min(0, { message: minValueMessage("numberOfFloorHeatingDistributors", 0) })
  numberOfFloorHeatingDistributors?: number;

  @IsOptional()
  @IsInt({ message: invalidIntegerMessage("numberOfRadiators") })
  @Min(0, { message: minValueMessage("numberOfRadiators", 0) })
  numberOfRadiators?: number;

  @IsOptional()
  @IsBoolean({ message: invalidBooleanMessage("domesticHotWaterByHeatpump") })
  domesticHotWaterByHeatpump?: boolean;

  @IsOptional()
  @IsEnum(DOMESTIC_HOT_WATER_CIRCULATION_PUMP_VALUES, {
    message: invalidEnumMessage("domesticHotWaterCirculationPump"),
  })
  domesticHotWaterCirculationPump?: string;

  @IsOptional()
  @IsEnum(DOMESTIC_WATER_STATION_VALUES, {
    message: invalidEnumMessage("domestic_water_station"),
  })
  domestic_water_station?: string;
}

export class PictureUrlDto {
  @IsString({ message: invalidTextMessage("url") })
  @IsNotEmpty({ message: requiredTextMessage("url") })
  url!: string;
}

export class ProjectPicturesDto {
  @IsOptional()
  @IsArray({ message: invalidArrayMessage("outdoorUnitLocation") })
  @ValidateNested({ each: true })
  @Type(() => PictureUrlDto)
  outdoorUnitLocation?: PictureUrlDto[];

  @IsOptional()
  @IsArray({ message: invalidArrayMessage("outdoorUnitLocationWithArea") })
  @ValidateNested({ each: true })
  @Type(() => PictureUrlDto)
  outdoorUnitLocationWithArea?: PictureUrlDto[];

  @IsOptional()
  @IsArray({ message: invalidArrayMessage("heatingRoom") })
  @ValidateNested({ each: true })
  @Type(() => PictureUrlDto)
  heatingRoom?: PictureUrlDto[];

  @IsOptional()
  @IsArray({ message: invalidArrayMessage("meterClosetWithDoorOpen") })
  @ValidateNested({ each: true })
  @Type(() => PictureUrlDto)
  meterClosetWithDoorOpen?: PictureUrlDto[];

  @IsOptional()
  @IsArray({ message: invalidArrayMessage("meterClosetSlsSwitchDetailed") })
  @ValidateNested({ each: true })
  @Type(() => PictureUrlDto)
  meterClosetSlsSwitchDetailed?: PictureUrlDto[];

  @IsOptional()
  @IsArray({ message: invalidArrayMessage("floorHeatingDistributionWithDoorOpen") })
  @ValidateNested({ each: true })
  @Type(() => PictureUrlDto)
  floorHeatingDistributionWithDoorOpen?: PictureUrlDto[];
}

export class ProjectTechnicalDetailsDto {
  @IsOptional()
  @IsEnum(PROJECT_TIMELINE_VALUES, { message: invalidEnumMessage("timeline") })
  timeline?: string;

  @IsOptional()
  @IsEnum(HOUSEHOLD_INCOME_VALUES, { message: invalidEnumMessage("householdIncome") })
  householdIncome?: string;

  @IsOptional()
  @IsEnum(FOUNDATION_CONSTRUCTION_STATUS_VALUES, {
    message: invalidEnumMessage("statusOfFoundationConstruction"),
  })
  statusOfFoundationConstruction?: string;

  @IsOptional()
  @IsString({ message: invalidTextMessage("infosLeadsource") })
  infosLeadsource?: string;

  @IsOptional()
  @IsBoolean({ message: invalidBooleanMessage("fullReplacementOfHeatingSystemPlanned") })
  fullReplacementOfHeatingSystemPlanned?: boolean;

  @IsOptional()
  @IsArray({ message: invalidArrayMessage("additionalDisposal") })
  @IsEnum(ADDITIONAL_DISPOSAL_VALUES, {
    each: true,
    message: invalidEnumMessage("additionalDisposal"),
  })
  additionalDisposal?: string[];

  @IsOptional()
  @IsBoolean({ message: invalidBooleanMessage("shouldKeepSolarThermalSystem") })
  shouldKeepSolarThermalSystem?: boolean;

  @IsOptional()
  @ValidateNested()
  @Type(() => ProjectPicturesDto)
  pictures?: ProjectPicturesDto;
}

export class ProjectDto extends ProjectTechnicalDetailsDto {}

export class LeadPayloadDto {
  @IsOptional()
  @ValidateNested()
  @Type(() => ContactDto)
  contact?: ContactDto;

  @IsOptional()
  @ValidateNested()
  @Type(() => BuildingDto)
  building?: BuildingDto;

  @IsOptional()
  @ValidateNested()
  @Type(() => HeatingSystemDto)
  heatingSystem?: HeatingSystemDto;

  @IsOptional()
  @ValidateNested()
  @Type(() => ProjectDto)
  project?: ProjectDto;
}
