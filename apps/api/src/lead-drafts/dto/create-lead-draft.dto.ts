import { Type } from "class-transformer";
import { Equals, IsOptional, IsString, ValidateNested } from "class-validator";

import { LEAD_API_VERSION } from "@vamo/shared";

import { CreateContactDto } from "./shared/common.dto.js";

export class CreateLeadDraftDto {
  @Equals(LEAD_API_VERSION)
  version!: typeof LEAD_API_VERSION;

  @IsOptional()
  @IsString()
  id?: string;

  @ValidateNested()
  @Type(() => CreateContactDto)
  contact!: CreateContactDto;
}
