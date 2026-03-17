import { Alert, App as AntApp, Button, Card, Divider, Result, Space, Steps, Typography } from "antd";
import { useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { FeasibilityStatus } from "@vamo/shared";

import { LeadStepFields } from "../../components/lead-form/LeadStepFields";
import { leadFormSteps } from "../../config/leadFormSteps";
import {
  createLeadDraft,
  type LeadDraftStageResponse,
  updateLeadDraft,
} from "../../lib/api/leadDrafts";
import {
  buildCreateLeadDraftPayload,
  buildCurrentHeatingPayload,
  buildHomeTypePayload,
  buildLeadContactPayload,
  buildPropertyDetailsPayload,
  buildTechnicalDetailsPayload,
} from "../../lib/api/leadDraftPayloads";
import { validateLeadDraftStep } from "../../lib/forms/leadDraftForm.schema";
import type { LeadDraftFormValues } from "../../lib/forms/leadDraftForm.types";
import { readLeadDraftId, writeLeadDraftId } from "../../lib/session/leadDraftSession";

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
  const { message } = AntApp.useApp();
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [stepError, setStepError] = useState<string | null>(null);
  const [isSubmittingStep, setIsSubmittingStep] = useState(false);
  const [draftId, setDraftId] = useState<string | null>(() => readLeadDraftId());
  const [isInfeasible, setIsInfeasible] = useState(false);

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

  function handleLeadDraftResponse(response: LeadDraftStageResponse) {
    if (response.draftId) {
      setDraftId(response.draftId);
      writeLeadDraftId(response.draftId);
    }

    if (response.feasibilityStatus === FeasibilityStatus.Infeasible) {
      setIsInfeasible(true);
      return;
    }

    if (currentStepIndex < leadFormSteps.length - 1) {
      setCurrentStepIndex((previous) => previous + 1);
    }
  }

  async function handleNext() {
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

    try {
      setIsSubmittingStep(true);

      if (currentStep.key === "leadContact") {
        const contactPayload = buildCreateLeadDraftPayload(values);
        const response = draftId
          ? await updateLeadDraft(draftId, buildLeadContactPayload(values))
          : await createLeadDraft(contactPayload);

        handleLeadDraftResponse(response);
        return;
      }

      if (currentStep.key === "homeType") {
        if (!draftId) {
          throw new Error("Lead draft is missing. Please restart from the first step.");
        }

        const response = await updateLeadDraft(draftId, buildHomeTypePayload(values));
        handleLeadDraftResponse(response);
        return;
      }

      if (currentStep.key === "currentHeating") {
        if (!draftId) {
          throw new Error("Lead draft is missing. Please restart from the first step.");
        }

        const response = await updateLeadDraft(
          draftId,
          buildCurrentHeatingPayload(values)
        );
        handleLeadDraftResponse(response);
        return;
      }

      if (currentStep.key === "propertyDetails") {
        if (!draftId) {
          throw new Error("Lead draft is missing. Please restart from the first step.");
        }

        const response = await updateLeadDraft(
          draftId,
          buildPropertyDetailsPayload(values)
        );
        handleLeadDraftResponse(response);
        return;
      }

      if (currentStep.key === "technicalDetails") {
        if (!draftId) {
          throw new Error("Lead draft is missing. Please restart from the first step.");
        }

        const response = await updateLeadDraft(
          draftId,
          buildTechnicalDetailsPayload(values)
        );
        handleLeadDraftResponse(response);
        return;
      }

      if (currentStepIndex < leadFormSteps.length - 1) {
        setCurrentStepIndex((previous) => previous + 1);
      }
    } catch (error) {
      const errorMessage =
        error instanceof Error
          ? error.message
          : "Something went wrong while saving this step.";

      setStepError(errorMessage);
      message.error(errorMessage);
    } finally {
      setIsSubmittingStep(false);
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
          {isInfeasible ? (
            <Result
              status="warning"
              title="We can’t proceed with this setup right now"
              subTitle="Based on the answers so far, this lead is currently not feasible for the standard flow."
            />
          ) : (
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
                  <Button type="primary" onClick={handleNext} loading={isSubmittingStep}>
                    {currentStepIndex === leadFormSteps.length - 1
                      ? "Submit later"
                      : "Continue"}
                  </Button>
                </div>
              </div>
            </Space>
          )}
        </Card>
      </div>
    </div>
  );
}
