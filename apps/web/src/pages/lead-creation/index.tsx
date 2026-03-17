import { Alert, Button, Card, Divider, Space, Steps, Typography } from "antd";
import { useMemo, useState } from "react";
import { useForm } from "react-hook-form";

import { LeadStepFields } from "../../components/lead-form/LeadStepFields";
import { leadFormSteps } from "../../config/leadFormSteps";
import { validateLeadDraftStep } from "../../lib/forms/leadDraftForm.schema";
import type { LeadDraftFormValues } from "../../lib/forms/leadDraftForm.types";

const { Paragraph, Text } = Typography;

const defaultValues: LeadDraftFormValues = {
  firstName: "",
  lastName: "",
  phone: "",
  email: "",
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

    const result = validateLeadDraftStep(currentStep.key, getValues());

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
          <Steps current={currentStepIndex} direction="vertical" items={stepItems} />
        </Card>

        <Card
          className="lead-form-card"
          bordered={false}
          title={currentStep.title}
          extra={<Text type="secondary">{currentStep.description}</Text>}
        >
          <Space direction="vertical" size="large" style={{ width: "100%" }}>
            {stepError ? <Alert type="error" message={stepError} showIcon /> : null}
            <LeadStepFields
              stepKey={currentStep.key}
              control={control}
              errors={errors}
              isApartment={isApartment}
              values={values}
            />
            <div className="lead-form-card__actions">
              <Button onClick={handleBack} disabled={currentStepIndex === 0}>
                Back
              </Button>
              <div className="lead-form-card__actions-right">
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
