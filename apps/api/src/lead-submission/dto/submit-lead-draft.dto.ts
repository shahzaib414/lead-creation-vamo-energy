import { Type } from "class-transformer";
import {
  ArrayMaxSize,
  IsArray,
  IsOptional,
  IsString,
  ValidateNested,
} from "class-validator";

export class SubmittedPictureReferenceDto {
  @IsString({ message: "objectKey must be text" })
  objectKey!: string;
}

export class SubmittedProjectPicturesDto {
  @IsOptional()
  @IsArray({ message: "outdoorUnitLocation must be a list" })
  @ArrayMaxSize(20)
  @ValidateNested({ each: true })
  @Type(() => SubmittedPictureReferenceDto)
  outdoorUnitLocation?: SubmittedPictureReferenceDto[];

  @IsOptional()
  @IsArray({ message: "outdoorUnitLocationWithArea must be a list" })
  @ArrayMaxSize(20)
  @ValidateNested({ each: true })
  @Type(() => SubmittedPictureReferenceDto)
  outdoorUnitLocationWithArea?: SubmittedPictureReferenceDto[];

  @IsOptional()
  @IsArray({ message: "heatingRoom must be a list" })
  @ArrayMaxSize(20)
  @ValidateNested({ each: true })
  @Type(() => SubmittedPictureReferenceDto)
  heatingRoom?: SubmittedPictureReferenceDto[];

  @IsOptional()
  @IsArray({ message: "meterClosetWithDoorOpen must be a list" })
  @ArrayMaxSize(20)
  @ValidateNested({ each: true })
  @Type(() => SubmittedPictureReferenceDto)
  meterClosetWithDoorOpen?: SubmittedPictureReferenceDto[];

  @IsOptional()
  @IsArray({ message: "meterClosetSlsSwitchDetailed must be a list" })
  @ArrayMaxSize(20)
  @ValidateNested({ each: true })
  @Type(() => SubmittedPictureReferenceDto)
  meterClosetSlsSwitchDetailed?: SubmittedPictureReferenceDto[];

  @IsOptional()
  @IsArray({ message: "floorHeatingDistributionWithDoorOpen must be a list" })
  @ArrayMaxSize(20)
  @ValidateNested({ each: true })
  @Type(() => SubmittedPictureReferenceDto)
  floorHeatingDistributionWithDoorOpen?: SubmittedPictureReferenceDto[];
}

export class SubmitLeadDraftDto {
  @IsOptional()
  @ValidateNested()
  @Type(() => SubmittedProjectPicturesDto)
  pictures?: SubmittedProjectPicturesDto;
}
