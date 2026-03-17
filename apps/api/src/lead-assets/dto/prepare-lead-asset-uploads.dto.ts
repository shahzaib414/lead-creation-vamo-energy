import { Type } from "class-transformer";
import {
  ArrayMaxSize,
  IsArray,
  IsIn,
  IsInt,
  IsMimeType,
  IsString,
  Max,
  Min,
  ValidateNested,
} from "class-validator";

export const LEAD_PICTURE_CATEGORY_VALUES = [
  "outdoorUnitLocation",
  "outdoorUnitLocationWithArea",
  "heatingRoom",
  "meterClosetWithDoorOpen",
  "meterClosetSlsSwitchDetailed",
  "floorHeatingDistributionWithDoorOpen",
] as const;

export type LeadPictureCategory =
  (typeof LEAD_PICTURE_CATEGORY_VALUES)[number];

export class PrepareLeadAssetUploadFileDto {
  @IsIn(LEAD_PICTURE_CATEGORY_VALUES)
  category!: LeadPictureCategory;

  @IsString()
  originalFileName!: string;

  @IsMimeType()
  mimeType!: string;

  @IsInt()
  @Min(1)
  @Max(50 * 1024 * 1024)
  sizeBytes!: number;
}

export class PrepareLeadAssetUploadsDto {
  @IsArray()
  @ArrayMaxSize(20)
  @ValidateNested({ each: true })
  @Type(() => PrepareLeadAssetUploadFileDto)
  files!: PrepareLeadAssetUploadFileDto[];
}
