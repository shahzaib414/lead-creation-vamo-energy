import {
  ValidationArguments,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from "class-validator";

import { FormStep } from "@vamo/shared";

import { UpdateLeadDraftDto } from "../update-lead-draft.dto.js";

@ValidatorConstraint({ name: "FormStepPayload", async: false })
export class FormStepPayloadValidator implements ValidatorConstraintInterface {
  validate(formStep: FormStep, args: ValidationArguments) {
    const dto = args.object as UpdateLeadDraftDto;
    const providedBranches = this.getProvidedBranches(dto);

    switch (formStep) {
      case FormStep.LeadContact:
        return providedBranches.length === 1 && providedBranches[0] === "contact";
      case FormStep.HomeType:
        return providedBranches.length === 1 && providedBranches[0] === "building";
      case FormStep.CurrentHeating:
        return this.isOnlyAllowedBranches(providedBranches, ["building", "heatingSystem"]);
      case FormStep.PropertyDetails:
        return providedBranches.length === 1 && providedBranches[0] === "building";
      case FormStep.TechnicalDetails:
        return (
          this.isOnlyAllowedBranches(providedBranches, [
            "building",
            "heatingSystem",
            "project",
          ]) && providedBranches.length > 0
        );
      case FormStep.ReviewSubmit:
        return providedBranches.length <= 4;
      default:
        return false;
    }
  }

  defaultMessage(args: ValidationArguments) {
    const formStep = args.value as FormStep;

    return `Request payload does not match formStep "${formStep}"`;
  }

  private getProvidedBranches(dto: UpdateLeadDraftDto) {
    const branches = [
      ["contact", dto.contact],
      ["building", dto.building],
      ["heatingSystem", dto.heatingSystem],
      ["project", dto.project],
    ] as const;

    return branches
      .filter(([, value]) => value !== undefined)
      .map(([key]) => key);
  }

  private isOnlyAllowedBranches(
    providedBranches: string[],
    allowedBranches: string[]
  ) {
    return providedBranches.every((branch) => allowedBranches.includes(branch));
  }
}
