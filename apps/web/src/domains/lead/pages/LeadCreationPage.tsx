import {
  Alert,
  Button,
  Card,
  Col,
  Divider,
  Input,
  InputNumber,
  Radio,
  Row,
  Select,
  Space,
  Steps,
  Switch,
  Typography,
} from "antd";
import { Controller, useForm } from "react-hook-form";
import { useMemo, useState } from "react";

import { leadFormSteps } from "../config/leadFormSteps";
import {
  apartmentHeatingOptions,
  boilerRoomSizeOptions,
  ceilingHeightOptions,
  constructionYearRangeOptions,
  floorLocationOptions,
  groundingTypeOptions,
  heatingLocationOptions,
  homeTypeOptions,
  projectTimelineOptions,
  roomPathOptions,
  systemTypeOptions,
  typeOfHeatingOptions,
  yesNoOptions,
} from "../config/leadFormOptions";
import { validateLeadDraftStep } from "../forms/leadDraftForm.schema";
import type {
  LeadDraftFormValues,
  LeadFormStepKey,
} from "../forms/leadDraftForm.types";

const { Paragraph, Text } = Typography;

const defaultValues: LeadDraftFormValues = {
  firstName: "",
  lastName: "",
  phone: "",
  email: "",
  newsletterSingleOptIn: false,
  street: "",
  city: "",
  postalCode: "",
  countryCode: "DE",
};

export function LeadCreationPage() {
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [stepError, setStepError] = useState<string | null>(null);

  const {
    control,
    watch,
    getValues,
    setError,
    clearErrors,
    formState: { errors },
  } = useForm<LeadDraftFormValues>({
    defaultValues,
    mode: "onTouched",
  });

  const currentStep = leadFormSteps[currentStepIndex];
  const values = watch();
  const isApartment = values.immoType === "Wohnung";

  const stepItems = useMemo(
    () =>
      leadFormSteps.map((step) => ({
        key: step.key,
        title: step.title,
        description: step.description,
      })),
    []
  );

  function handleNext() {
    clearErrors();
    setStepError(null);

    const result = validateLeadDraftStep(
      currentStep.key,
      getValues()
    );

    if (!result.success) {
      for (const issue of result.error.issues) {
        const [fieldName] = issue.path;

        if (typeof fieldName === "string") {
          setError(fieldName as keyof LeadDraftFormValues, {
            type: "manual",
            message: issue.message,
          });
        }
      }

      setStepError("Please complete the required fields for this step.");
      return;
    }

    if (currentStepIndex < leadFormSteps.length - 1) {
      setCurrentStepIndex((previous) => previous + 1);
    }
  }

  function handleBack() {
    setStepError(null);
    clearErrors();
    setCurrentStepIndex((previous) => Math.max(previous - 1, 0));
  }

  return (
    <div className="page-shell">
      <div className="page-grid">
        <Card className="lead-panel" bordered={false}>
          <p className="lead-panel__eyebrow">Vamo Energy</p>
          <h1>Staged Lead Funnel</h1>
          <Paragraph className="lead-panel__body">
            This frontend focuses only on the guided intake UI for now. The staged
            structure mirrors the product decisions we already captured in the backend
            and implementation draft.
          </Paragraph>
          <Divider />
          <Steps
            current={currentStepIndex}
            direction="vertical"
            items={stepItems}
          />
        </Card>

        <Card
          className="lead-form-card"
          bordered={false}
          title={currentStep.title}
          extra={<Text type="secondary">{currentStep.description}</Text>}
        >
          <Space direction="vertical" size="large" style={{ width: "100%" }}>
            {stepError ? <Alert type="error" message={stepError} showIcon /> : null}
            {renderStep({
              stepKey: currentStep.key,
              control,
              errors,
              isApartment,
              values,
            })}
            <div className="lead-form-card__actions">
              <Button onClick={handleBack} disabled={currentStepIndex === 0}>
                Back
              </Button>
              <div className="lead-form-card__actions-right">
                <Button>Save draft later</Button>
                <Button type="primary" onClick={handleNext}>
                  {currentStepIndex === leadFormSteps.length - 1
                    ? "Submit later"
                    : "Continue"}
                </Button>
              </div>
            </div>
          </Space>
        </Card>
      </div>
    </div>
  );
}

function renderStep({
  stepKey,
  control,
  errors,
  isApartment,
  values,
}: {
  stepKey: LeadFormStepKey;
  control: ReturnType<typeof useForm<LeadDraftFormValues>>["control"];
  errors: ReturnType<typeof useForm<LeadDraftFormValues>>["formState"]["errors"];
  isApartment: boolean;
  values: LeadDraftFormValues;
}) {
  switch (stepKey) {
    case "leadContact":
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
          <Col span={24}>
            <Controller
              control={control}
              name="newsletterSingleOptIn"
              render={({ field }) => (
                <Card size="small">
                  <Space align="center" size="middle">
                    <Switch checked={field.value} onChange={field.onChange} />
                    <span>Keep me informed about Vamo updates</span>
                  </Space>
                </Card>
              )}
            />
          </Col>
        </Row>
      );

    case "homeType":
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

    case "currentHeating":
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

    case "propertyDetails":
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
              options={[
                { label: "Ja", value: "Ja" },
                { label: "Nein", value: "Nein" },
              ]}
              error={errors.heritageProtection?.message}
            />
          </Col>
        </Row>
      );

    case "technicalDetails":
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

    case "reviewSubmit":
      return <ReviewStep values={values} />;
  }
}

function ReviewStep({ values }: { values: LeadDraftFormValues }) {
  return (
    <div className="lead-review-list">
      <Alert
        type="info"
        showIcon
        message="Frontend-only review"
        description="We are keeping the UI simple for now. Backend save/resume and final submission wiring can come next."
      />
      <ReviewGroup
        title="Lead contact"
        rows={[
          ["Name", `${values.firstName} ${values.lastName}`.trim() || "-"],
          ["Phone", values.phone || "-"],
          ["Email", values.email || "-"],
        ]}
      />
      <ReviewGroup
        title="Home and heating"
        rows={[
          ["Home type", values.immoType || "-"],
          ["Owner occupied", stringifyBoolean(values.ownerOccupiedHousing)],
          ["Heating system", values.systemType || "-"],
          ["Heating location", values.locationHeating || "-"],
        ]}
      />
      <ReviewGroup
        title="Property"
        rows={[
          ["Address", [values.street, values.city, values.postalCode].filter(Boolean).join(", ") || "-"],
          ["Construction year", values.constructionYearString || "-"],
          ["Living space", values.livingSpace ? `${values.livingSpace} sqm` : "-"],
          ["Heated area", values.heatedArea ? `${values.heatedArea} sqm` : "-"],
        ]}
      />
      <ReviewGroup
        title="Technical"
        rows={[
          ["Boiler room", values.boilerRoomSize || "-"],
          ["Timeline", values.timeline || "-"],
          [
            "Replacement planned",
            stringifyBoolean(values.fullReplacementOfHeatingSystemPlanned),
          ],
        ]}
      />
    </div>
  );
}

function ReviewGroup({
  title,
  rows,
}: {
  title: string;
  rows: Array<[string, string]>;
}) {
  return (
    <section className="lead-review-group">
      <h3>{title}</h3>
      {rows.map(([label, value]) => (
        <div key={label} className="lead-review-row">
          <span className="lead-review-label">{label}</span>
          <span className="lead-review-value">{value}</span>
        </div>
      ))}
    </section>
  );
}

function stringifyBoolean(value?: boolean) {
  if (value === true) {
    return "Yes";
  }

  if (value === false) {
    return "No";
  }

  return "-";
}

function ControlledInput({
  control,
  name,
  label,
  error,
}: {
  control: ReturnType<typeof useForm<LeadDraftFormValues>>["control"];
  name: keyof LeadDraftFormValues;
  label: string;
  error?: string;
}) {
  return (
    <Controller
      control={control}
      name={name}
      render={({ field }) => (
        <Space direction="vertical" style={{ width: "100%" }} size={6}>
          <Text strong>{label}</Text>
          <Input
            name={field.name}
            ref={field.ref}
            onBlur={field.onBlur}
            onChange={field.onChange}
            value={typeof field.value === "string" ? field.value : ""}
            status={error ? "error" : undefined}
          />
          {error ? <Text type="danger">{error}</Text> : null}
        </Space>
      )}
    />
  );
}

function ControlledInputNumber({
  control,
  name,
  label,
  error,
}: {
  control: ReturnType<typeof useForm<LeadDraftFormValues>>["control"];
  name: keyof LeadDraftFormValues;
  label: string;
  error?: string;
}) {
  return (
    <Controller
      control={control}
      name={name}
      render={({ field }) => (
        <Space direction="vertical" style={{ width: "100%" }} size={6}>
          <Text strong>{label}</Text>
          <InputNumber
            style={{ width: "100%" }}
            value={typeof field.value === "number" ? field.value : undefined}
            onChange={(value) => field.onChange(value ?? undefined)}
            status={error ? "error" : ""}
          />
          {error ? <Text type="danger">{error}</Text> : null}
        </Space>
      )}
    />
  );
}

function ControlledSelect({
  control,
  name,
  label,
  options,
  error,
}: {
  control: ReturnType<typeof useForm<LeadDraftFormValues>>["control"];
  name: keyof LeadDraftFormValues;
  label: string;
  options: string[];
  error?: string;
}) {
  return (
    <Controller
      control={control}
      name={name}
      render={({ field }) => (
        <Space direction="vertical" style={{ width: "100%" }} size={6}>
          <Text strong>{label}</Text>
          <Select
            value={typeof field.value === "string" ? field.value : undefined}
            onChange={field.onChange}
            options={options.map((option) => ({ label: option, value: option }))}
            status={error ? "error" : ""}
          />
          {error ? <Text type="danger">{error}</Text> : null}
        </Space>
      )}
    />
  );
}

function ControlledSegmentedSelect({
  control,
  name,
  label,
  options,
  error,
}: {
  control: ReturnType<typeof useForm<LeadDraftFormValues>>["control"];
  name: keyof LeadDraftFormValues;
  label: string;
  options: Array<{ label: string; value: string }>;
  error?: string;
}) {
  return (
    <Controller
      control={control}
      name={name}
      render={({ field }) => (
        <Space direction="vertical" style={{ width: "100%" }} size={6}>
          <Text strong>{label}</Text>
          <Select
            value={typeof field.value === "string" ? field.value : undefined}
            onChange={field.onChange}
            options={options}
            status={error ? "error" : ""}
          />
          {error ? <Text type="danger">{error}</Text> : null}
        </Space>
      )}
    />
  );
}

function ControlledRadioBoolean({
  control,
  name,
  label,
  error,
}: {
  control: ReturnType<typeof useForm<LeadDraftFormValues>>["control"];
  name: keyof LeadDraftFormValues;
  label: string;
  error?: string;
}) {
  return (
    <Controller
      control={control}
      name={name}
      render={({ field }) => (
        <Space direction="vertical" style={{ width: "100%" }} size={6}>
          <Text strong>{label}</Text>
          <Radio.Group
            value={typeof field.value === "boolean" ? field.value : undefined}
            onChange={(event) => field.onChange(event.target.value)}
            options={yesNoOptions}
            optionType="button"
            buttonStyle="solid"
          />
          {error ? <Text type="danger">{error}</Text> : null}
        </Space>
      )}
    />
  );
}
