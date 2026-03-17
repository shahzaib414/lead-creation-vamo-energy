import { Col, Row } from "antd";

import { heatingLocationOptions, systemTypeOptions } from "../../../config/leadFormOptions";
import {
  ControlledSelect,
  type LeadFormControl,
  type LeadFormErrors,
} from "../LeadFormControls";

export function CurrentHeatingStep({
  control,
  errors,
}: {
  control: LeadFormControl;
  errors: LeadFormErrors;
}) {
  return (
    <Row gutter={[16, 16]}>
      <Col span={24}>
        <ControlledSelect
          control={control}
          name="systemType"
          label="What do you currently heat with?"
          options={systemTypeOptions}
          error={errors.systemType?.message}
        />
      </Col>
      <Col span={24}>
        <ControlledSelect
          control={control}
          name="locationHeating"
          label="Where is the heating system located?"
          options={heatingLocationOptions}
          error={errors.locationHeating?.message}
        />
      </Col>
    </Row>
  );
}
