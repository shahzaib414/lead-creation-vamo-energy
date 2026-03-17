import { Col, Row } from "antd";

import {
  constructionYearRangeOptions,
  heritageProtectionOptions,
  showerTypeOptions,
  typeOfHeatingOptions,
} from "../../../config/leadFormOptions";
import {
  ControlledInput,
  ControlledInputNumber,
  ControlledSegmentedSelect,
  ControlledSelect,
  type LeadFormControl,
  type LeadFormErrors,
} from "../LeadFormControls";

export function PropertyDetailsStep({
  control,
  errors,
}: {
  control: LeadFormControl;
  errors: LeadFormErrors;
}) {
  return (
    <Row gutter={[16, 16]}>
      <Col xs={24} md={14}>
        <ControlledInput
          control={control}
          name="street"
          label="Street address"
          error={errors.street?.message}
        />
      </Col>
      <Col xs={24} md={10}>
        <ControlledInput
          control={control}
          name="postalCode"
          label="Postal code"
          error={errors.postalCode?.message}
        />
      </Col>
      <Col xs={24} md={14}>
        <ControlledInput
          control={control}
          name="city"
          label="City"
          error={errors.city?.message}
        />
      </Col>
      <Col xs={24} md={10}>
        <ControlledInput
          control={control}
          name="countryCode"
          label="Country code"
          error={errors.countryCode?.message}
        />
      </Col>
      <Col xs={24} md={12}>
        <ControlledSelect
          control={control}
          name="constructionYearString"
          label="Construction year range"
          options={constructionYearRangeOptions}
          error={errors.constructionYearString?.message}
        />
      </Col>
      <Col xs={24} md={12}>
        <ControlledInputNumber
          control={control}
          name="livingSpace"
          label="Living space (sqm)"
          error={errors.livingSpace?.message}
        />
      </Col>
      <Col xs={24} md={12}>
        <ControlledInputNumber
          control={control}
          name="heatedArea"
          label="Heated area (sqm)"
          error={errors.heatedArea?.message}
        />
      </Col>
      <Col xs={24} md={12}>
        <ControlledInputNumber
          control={control}
          name="personsHousehold"
          label="People in household"
          error={errors.personsHousehold?.message}
        />
      </Col>
      <Col xs={24} md={12}>
        <ControlledSelect
          control={control}
          name="typeOfHeating"
          label="Heat distribution"
          options={typeOfHeatingOptions}
          error={errors.typeOfHeating?.message}
        />
      </Col>
      <Col xs={24} md={12}>
        <ControlledSegmentedSelect
          control={control}
          name="heritageProtection"
          label="Heritage protected?"
          options={heritageProtectionOptions}
          error={errors.heritageProtection?.message}
        />
      </Col>
      <Col xs={24} md={12}>
        <ControlledInputNumber
          control={control}
          name="numberOfBathtubs"
          label="Number of bathtubs"
          error={errors.numberOfBathtubs?.message}
        />
      </Col>
      <Col xs={24} md={12}>
        <ControlledInputNumber
          control={control}
          name="numberOfShowers"
          label="Number of showers"
          error={errors.numberOfShowers?.message}
        />
      </Col>
      <Col xs={24} md={12}>
        <ControlledSelect
          control={control}
          name="typeOfShowers"
          label="Type of shower"
          options={showerTypeOptions}
          error={errors.typeOfShowers?.message}
        />
      </Col>
    </Row>
  );
}
