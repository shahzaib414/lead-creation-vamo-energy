import { Type } from "class-transformer";
import { IsEnum, IsOptional, Validate, ValidateNested } from "class-validator";

import { FormStep } from "@vamo/shared";

import {
  BuildingDto,
  ContactDto,
  HeatingSystemDto,
  ProjectDto,
} from "./shared/common.dto.js";
import { FormStepPayloadValidator } from "./validators/form-step-payload.validator.js";

export class UpdateLeadDraftDto {
  @IsEnum(FormStep)
  @Validate(FormStepPayloadValidator)
  formStep!: FormStep;

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
