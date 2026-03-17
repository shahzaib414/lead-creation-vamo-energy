import { Col, Row } from "antd";

import { apartmentHeatingOptions, homeTypeOptions } from "../../../config/leadFormOptions";
import {
  ControlledInputNumber,
  ControlledRadioBoolean,
  ControlledSegmentedSelect,
  ControlledSelect,
  type LeadFormControl,
  type LeadFormErrors,
} from "../LeadFormControls";

export function HomeTypeStep({
  control,
  errors,
  isApartment,
}: {
  control: LeadFormControl;
  errors: LeadFormErrors;
  isApartment: boolean;
}) {
  return (
    <Row gutter={[16, 16]}>
      <Col span={24}>
        <ControlledSelect
          control={control}
          name="immoType"
          label="What kind of building is this?"
          options={homeTypeOptions}
          error={errors.immoType?.message}
        />
      </Col>
      <Col span={24}>
        <ControlledRadioBoolean
          control={control}
          name="ownerOccupiedHousing"
          label="Is the home owner occupied?"
          error={errors.ownerOccupiedHousing?.message}
        />
      </Col>
      <Col xs={24} md={12}>
        <ControlledInputNumber
          control={control}
          name="residentialUnits"
          label="Residential units"
          error={errors.residentialUnits?.message}
        />
      </Col>
      {isApartment ? (
        <Col span={24}>
          <ControlledSegmentedSelect
            control={control}
            name="apartmentHeatingSystem"
            label="Does the apartment have its own heating system?"
            options={apartmentHeatingOptions}
            error={errors.apartmentHeatingSystem?.message}
          />
        </Col>
      ) : null}
    </Row>
  );
}
