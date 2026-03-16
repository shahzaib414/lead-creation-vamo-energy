import { Type } from "class-transformer";
import { ValidateNested } from "class-validator";


import { CreateContactDto } from "./shared/common.dto.js";

export class CreateLeadDraftDto {
  @ValidateNested()
  @Type(() => CreateContactDto)
  contact!: CreateContactDto;
}
