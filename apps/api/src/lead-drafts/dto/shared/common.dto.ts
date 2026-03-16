import { Type } from "class-transformer";
import {
  IsArray,
  IsBoolean,
  IsEmail,
  IsEnum,
  IsInt,
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

export class AddressDto {
  @IsOptional()
  @IsString()
  street?: string;

  @IsOptional()
  @IsString()
  city?: string;

  @IsOptional()
  @IsString()
  postalCode?: string;

  @IsOptional()
  @Matches(COUNTRY_CODE_PATTERN)
  countryCode?: string;

  @IsOptional()
  @IsString()
  addressAddition?: string;
}

export class MarketingDto {
  @IsOptional()
  @IsString()
  customerLoyaltyProgramType?: string;

  @IsOptional()
  @IsString()
  customerLoyaltyProgramId?: string;
}

export class ContactInformationDto {
  @IsOptional()
  @IsEnum(SALUTATION_VALUES)
  salutation?: string;

  @IsOptional()
  @IsString()
  firstName?: string;

  @IsOptional()
  @IsString()
  lastName?: string;

  @IsOptional()
  @Matches(PHONE_WITH_COUNTRY_CODE_PATTERN)
  phone?: string;

  @IsOptional()
  @IsEmail()
  email?: string;

  @IsOptional()
  @IsBoolean()
  newsletterSingleOptIn?: boolean;
}

export class CreateContactInformationDto {
  @IsOptional()
  @IsEnum(SALUTATION_VALUES)
  salutation?: string;

  @IsString()
  firstName!: string;

  @IsString()
  lastName!: string;

  @Matches(PHONE_WITH_COUNTRY_CODE_PATTERN)
  phone!: string;

  @IsEmail()
  email!: string;

  @IsOptional()
  @IsBoolean()
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
  @IsEnum(IMMO_TYPE_VALUES)
  immoType?: string;

  @IsOptional()
  @IsInt()
  @Min(1)
  residentialUnits?: number;
 
  @IsOptional()
  @IsEnum(JA_NEIN_VALUES)
  heritageProtection?: string;

  @IsOptional()
  @IsInt()
  @Min(0)
  constructionYear?: number;

  @IsOptional()
  @IsString()
  constructionYearString?: string;

  @IsOptional()
  @IsInt()
  @Min(0)
  livingSpace?: number;

  @IsOptional()
  @IsInt()
  @Min(0)
  personsHousehold?: number;
 
  @IsOptional()
  @IsEnum(BOILER_ROOM_SIZE_VALUES)
  boilerRoomSize?: string;

  @IsOptional()
  @IsEnum(INSTALLATION_LOCATION_CEILING_HEIGHT_VALUES)
  installationLocationCeilingHeight?: string;

  @IsOptional()
  @IsEnum(JA_NEIN_VALUES)
  widthPathway?: string;

  @IsOptional()
  @IsEnum(JA_NEIN_VALUES)
  heightPathway?: string;

  @IsOptional()
  @IsEnum(ROOMS_BETWEEN_HEATING_ROOM_AND_OUTDOOR_UNIT_VALUES)
  roomsBetweenHeatingRoomAndOutdoorUnit?: string;

  @IsOptional()
  @IsEnum(FLOOR_LOCATION_VALUES)
  meterClosetLocation?: string;

  @IsOptional()
  @IsEnum(FLOOR_LOCATION_VALUES)
  electricityConnectionLocation?: string;

  @IsOptional()
  @IsEnum(GROUNDING_TYPE_VALUES)
  groundingType?: string;

  @IsOptional()
  @IsBoolean()
  hasSolarThermalSystem?: boolean;
}

export class OwnershipRelationshipsDto {
  @IsOptional()
  @IsString()
  ownershipRelationship?: string;

  @IsOptional()
  @IsString()
  ownershipRelationshipExplanation?: string;

  @IsOptional()
  @IsInt()
  @Min(0)
  numberOfOwners?: number;

  @IsOptional()
  @IsBoolean()
  ownerOccupiedHousing?: boolean;

  @IsOptional()
  @IsEnum(OWNERSHIP_TYPE_VALUES)
  type?: string;
}

export class EnergyRelevantInformationDto {
  @IsOptional()
  @IsInt()
  @Min(0)
  heatedArea?: number;

  @IsOptional()
  @IsString()
  heatedAreaString?: string;

  @IsOptional()
  @IsEnum(TYPE_OF_HEATING_VALUES)
  typeOfHeating?: string;

  @IsOptional()
  @IsEnum(LOCATION_HEATING_VALUES)
  locationHeating?: string;

  @IsOptional()
  @IsEnum(APARTMENT_HEATING_SYSTEM_VALUES)
  apartmentHeatingSystem?: string;
}

export class HotWaterDto {
  @IsOptional()
  @IsInt()
  @Min(0)
  numberOfBathtubs?: number;

  @IsOptional()
  @IsInt()
  @Min(0)
  numberOfShowers?: number;

  @IsOptional()
  @IsEnum(SHOWER_TYPE_VALUES)
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
  @IsEnum(SYSTEM_TYPE_VALUES)
  systemType?: string;

  @IsOptional()
  @IsInt()
  @Min(0)
  consumption?: number;

  @IsOptional()
  @IsEnum(CONSUMPTION_UNIT_VALUES)
  consumptionUnit?: string;

  @IsOptional()
  @IsInt()
  @Min(0)
  constructionYearHeatingSystem?: number;

  @IsOptional()
  @IsString()
  constructionYearHeatingSystemString?: string;

  @IsOptional()
  @IsString()
  model?: string;

  @IsOptional()
  @IsBoolean()
  floorHeatingConnectedToReturnPipe?: boolean;

  @IsOptional()
  @IsBoolean()
  floorHeatingOwnHeatingCircuit?: boolean;

  @IsOptional()
  @IsBoolean()
  floorHeatingOnlyInSmallRooms?: boolean;

  @IsOptional()
  @IsInt()
  @Min(0)
  numberOfFloorHeatingDistributors?: number;

  @IsOptional()
  @IsInt()
  @Min(0)
  numberOfRadiators?: number;

  @IsOptional()
  @IsBoolean()
  domesticHotWaterByHeatpump?: boolean;

  @IsOptional()
  @IsEnum(DOMESTIC_HOT_WATER_CIRCULATION_PUMP_VALUES)
  domesticHotWaterCirculationPump?: string;

  @IsOptional()
  @IsEnum(DOMESTIC_WATER_STATION_VALUES)
  domestic_water_station?: string;
}

export class PictureUrlDto {
  @IsString()
  url!: string;
}

export class ProjectPicturesDto {
  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => PictureUrlDto)
  outdoorUnitLocation?: PictureUrlDto[];

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => PictureUrlDto)
  outdoorUnitLocationWithArea?: PictureUrlDto[];

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => PictureUrlDto)
  heatingRoom?: PictureUrlDto[];

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => PictureUrlDto)
  meterClosetWithDoorOpen?: PictureUrlDto[];

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => PictureUrlDto)
  meterClosetSlsSwitchDetailed?: PictureUrlDto[];

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => PictureUrlDto)
  floorHeatingDistributionWithDoorOpen?: PictureUrlDto[];
}

export class ProjectTechnicalDetailsDto {
  @IsOptional()
  @IsEnum(PROJECT_TIMELINE_VALUES)
  timeline?: string;

  @IsOptional()
  @IsEnum(HOUSEHOLD_INCOME_VALUES)
  householdIncome?: string;

  @IsOptional()
  @IsEnum(FOUNDATION_CONSTRUCTION_STATUS_VALUES)
  statusOfFoundationConstruction?: string;

  @IsOptional()
  @IsString()
  infosLeadsource?: string;

  @IsOptional()
  @IsBoolean()
  fullReplacementOfHeatingSystemPlanned?: boolean;

  @IsOptional()
  @IsArray()
  @IsEnum(ADDITIONAL_DISPOSAL_VALUES, { each: true })
  additionalDisposal?: string[];

  @IsOptional()
  @IsBoolean()
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
