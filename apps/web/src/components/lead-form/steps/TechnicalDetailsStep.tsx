import { Col, Row } from "antd";

import {
  boilerRoomSizeOptions,
  ceilingHeightOptions,
  consumptionUnitOptions,
  domesticHotWaterCirculationPumpOptions,
  domesticWaterStationOptions,
  floorLocationOptions,
  foundationConstructionStatusOptions,
  groundingTypeOptions,
  householdIncomeOptions,
  projectTimelineOptions,
  roomPathOptions,
  yesNoPathOptions,
} from "../../../config/leadFormOptions";
import {
  ControlledInputNumber,
  ControlledRadioBoolean,
  ControlledSegmentedSelect,
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
        <ControlledSegmentedSelect
          control={control}
          name="widthPathway"
          label="Is the pathway wide enough?"
          options={yesNoPathOptions}
          error={errors.widthPathway?.message}
        />
      </Col>
      <Col xs={24} md={12}>
        <ControlledSegmentedSelect
          control={control}
          name="heightPathway"
          label="Is the pathway high enough?"
          options={yesNoPathOptions}
          error={errors.heightPathway?.message}
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
        <ControlledInputNumber
          control={control}
          name="consumption"
          label="Annual consumption"
          error={errors.consumption?.message}
        />
      </Col>
      <Col xs={24} md={12}>
        <ControlledSelect
          control={control}
          name="consumptionUnit"
          label="Consumption unit"
          options={consumptionUnitOptions}
          error={errors.consumptionUnit?.message}
        />
      </Col>
      <Col xs={24} md={12}>
        <ControlledInputNumber
          control={control}
          name="constructionYearHeatingSystem"
          label="Heating system construction year"
          error={errors.constructionYearHeatingSystem?.message}
        />
      </Col>
      <Col xs={24} md={12}>
        <ControlledInputNumber
          control={control}
          name="numberOfFloorHeatingDistributors"
          label="Number of floor heating distributors"
          error={errors.numberOfFloorHeatingDistributors?.message}
        />
      </Col>
      <Col xs={24} md={12}>
        <ControlledInputNumber
          control={control}
          name="numberOfRadiators"
          label="Number of radiators"
          error={errors.numberOfRadiators?.message}
        />
      </Col>
      <Col xs={24} md={12}>
        <ControlledRadioBoolean
          control={control}
          name="domesticHotWaterByHeatpump"
          label="Domestic hot water via heat pump?"
          error={errors.domesticHotWaterByHeatpump?.message}
        />
      </Col>
      <Col xs={24} md={12}>
        <ControlledSelect
          control={control}
          name="domesticHotWaterCirculationPump"
          label="Domestic hot water circulation pump"
          options={domesticHotWaterCirculationPumpOptions}
          error={errors.domesticHotWaterCirculationPump?.message}
        />
      </Col>
      <Col xs={24} md={12}>
        <ControlledSelect
          control={control}
          name="domesticWaterStation"
          label="Domestic water station"
          options={domesticWaterStationOptions}
          error={errors.domesticWaterStation?.message}
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
        <ControlledSelect
          control={control}
          name="householdIncome"
          label="Household income"
          options={householdIncomeOptions}
          error={errors.householdIncome?.message}
        />
      </Col>
      <Col xs={24} md={12}>
        <ControlledSelect
          control={control}
          name="statusOfFoundationConstruction"
          label="Foundation construction"
          options={foundationConstructionStatusOptions}
          error={errors.statusOfFoundationConstruction?.message}
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
