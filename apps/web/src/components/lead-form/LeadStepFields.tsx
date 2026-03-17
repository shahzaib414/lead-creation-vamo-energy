import type {
  LeadDraftFormValues,
  LeadFormStepKey,
} from "../../lib/forms/leadDraftForm.types";
import { type LeadFormControl, type LeadFormErrors } from "./LeadFormControls";
import { CurrentHeatingStep } from "./steps/CurrentHeatingStep";
import { HomeTypeStep } from "./steps/HomeTypeStep";
import { LeadContactStep } from "./steps/LeadContactStep";
import { PropertyDetailsStep } from "./steps/PropertyDetailsStep";
import { TechnicalDetailsStep } from "./steps/TechnicalDetailsStep";

export function LeadStepFields({
  stepKey,
  control,
  errors,
  isApartment,
  values,
}: {
  stepKey: LeadFormStepKey;
  control: LeadFormControl;
  errors: LeadFormErrors;
  isApartment: boolean;
  values: LeadDraftFormValues;
}) {
  switch (stepKey) {
    case "leadContact":
      return <LeadContactStep control={control} errors={errors} />;
    case "homeType":
      return <HomeTypeStep control={control} errors={errors} isApartment={isApartment} />;
    case "currentHeating":
      return <CurrentHeatingStep control={control} errors={errors} />;
    case "propertyDetails":
      return <PropertyDetailsStep control={control} errors={errors} />;
    case "technicalDetails":
      return <TechnicalDetailsStep control={control} errors={errors} />;
    case "reviewSubmit":
      return null;
  }
}
