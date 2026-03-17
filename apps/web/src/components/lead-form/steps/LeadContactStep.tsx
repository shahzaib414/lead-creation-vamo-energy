import { Col, Row } from "antd";

import {
  ControlledInput,
  type LeadFormControl,
  type LeadFormErrors,
} from "../LeadFormControls";

export function LeadContactStep({
  control,
  errors,
}: {
  control: LeadFormControl;
  errors: LeadFormErrors;
}) {
  return (
    <Row gutter={[16, 16]}>
      <Col xs={24} md={12}>
        <ControlledInput
          control={control}
          name="firstName"
          label="First name"
          error={errors.firstName?.message}
        />
      </Col>
      <Col xs={24} md={12}>
        <ControlledInput
          control={control}
          name="lastName"
          label="Last name"
          error={errors.lastName?.message}
        />
      </Col>
      <Col xs={24} md={12}>
        <ControlledInput
          control={control}
          name="phone"
          label="Phone"
          error={errors.phone?.message}
        />
      </Col>
      <Col xs={24} md={12}>
        <ControlledInput
          control={control}
          name="email"
          label="Email"
          error={errors.email?.message}
        />
      </Col>
    </Row>
  );
}
