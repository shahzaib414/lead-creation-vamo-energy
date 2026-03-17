import { Col, Row } from "antd";

import {
  boilerRoomSizeOptions,
  ceilingHeightOptions,
  floorLocationOptions,
  groundingTypeOptions,
  projectTimelineOptions,
  roomPathOptions,
} from "../../../config/leadFormOptions";
import {
  ControlledRadioBoolean,
  ControlledSelect,
  type LeadFormControl,
  type LeadFormErrors,
} from "../LeadFormControls";

export function TechnicalDetailsStep({
  control,
  errors,
}: {
  control: LeadFormControl;
  errors: LeadFormErrors;
}) {
  return (
    <Row gutter={[16, 16]}>
      <Col xs={24} md={12}>
        <ControlledSelect
          control={control}
          name="boilerRoomSize"
          label="Boiler room size"
          options={boilerRoomSizeOptions}
          error={errors.boilerRoomSize?.message}
        />
      </Col>
      <Col xs={24} md={12}>
        <ControlledSelect
          control={control}
          name="installationLocationCeilingHeight"
          label="Ceiling height"
          options={ceilingHeightOptions}
          error={errors.installationLocationCeilingHeight?.message}
        />
      </Col>
      <Col xs={24} md={12}>
        <ControlledSelect
          control={control}
          name="roomsBetweenHeatingRoomAndOutdoorUnit"
          label="Rooms between heating room and outdoor unit"
          options={roomPathOptions}
          error={errors.roomsBetweenHeatingRoomAndOutdoorUnit?.message}
        />
      </Col>
      <Col xs={24} md={12}>
        <ControlledSelect
          control={control}
          name="meterClosetLocation"
          label="Meter closet location"
          options={floorLocationOptions}
          error={errors.meterClosetLocation?.message}
        />
      </Col>
      <Col xs={24} md={12}>
        <ControlledSelect
          control={control}
          name="electricityConnectionLocation"
          label="Electricity connection location"
          options={floorLocationOptions}
          error={errors.electricityConnectionLocation?.message}
        />
      </Col>
      <Col xs={24} md={12}>
        <ControlledSelect
          control={control}
          name="groundingType"
          label="Grounding type"
          options={groundingTypeOptions}
          error={errors.groundingType?.message}
        />
      </Col>
      <Col xs={24} md={12}>
        <ControlledSelect
          control={control}
          name="timeline"
          label="Project timeline"
          options={projectTimelineOptions}
          error={errors.timeline?.message}
        />
      </Col>
      <Col xs={24} md={12}>
        <ControlledRadioBoolean
          control={control}
          name="fullReplacementOfHeatingSystemPlanned"
          label="Full replacement planned?"
          error={errors.fullReplacementOfHeatingSystemPlanned?.message}
        />
      </Col>
      <Col span={24}>
        <ControlledRadioBoolean
          control={control}
          name="hasSolarThermalSystem"
          label="Is there an existing solar thermal system?"
          error={errors.hasSolarThermalSystem?.message}
        />
      </Col>
    </Row>
  );
}
