import { Alert, App as AntApp, Button, Card, Divider, Result, Space, Steps, Typography } from "antd";
import { useMemo, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { FeasibilityStatus } from "@vamo/shared";

import {
  LeadReviewSection,
  type PendingLeadPicture,
} from "../../components/lead-form/LeadReviewSection";
import { LeadStepFields } from "../../components/lead-form/LeadStepFields";
import { leadFormSteps } from "../../config/leadFormSteps";
import type { PreparedLeadAssetUpload } from "../../lib/api/leadAssets";
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
import { submitLeadDraft } from "../../lib/api/leadSubmission";
import { buildSubmitLeadDraftPayload } from "../../lib/api/leadSubmissionPayloads";
import { validateLeadDraftStep } from "../../lib/forms/leadDraftForm.schema";
import type { LeadDraftFormValues } from "../../lib/forms/leadDraftForm.types";
import {
  clearLeadDraftId,
  readLeadDraftId,
  writeLeadDraftId,
} from "../../lib/session/leadDraftSession";
import { uploadLeadPictures } from "../../lib/uploads/uploadLeadPictures";

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
  const [pendingPictures, setPendingPictures] = useState<PendingLeadPicture[]>([]);
  const [uploadedPictures, setUploadedPictures] = useState<PreparedLeadAssetUpload[]>(
    []
  );
  const [isPreparingUploads, setIsPreparingUploads] = useState(false);
  const [isUploadingPictures, setIsUploadingPictures] = useState(false);
  const [isSubmittingLead, setIsSubmittingLead] = useState(false);
  const [isSubmittedSuccessfully, setIsSubmittedSuccessfully] = useState(false);
  const uploadInFlightRef = useRef(false);

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

  function handleSelectFiles(files: FileList | null) {
    if (!files) {
      return;
    }

    const nextPictures = Array.from(files).map((file, index) => ({
      id: `${file.name}-${file.size}-${Date.now()}-${index}`,
      file,
    }));

    setUploadedPictures([]);
    setPendingPictures((previous) => [...previous, ...nextPictures]);
  }

  function handleChangePictureCategory(
    pictureId: string,
    category: PendingLeadPicture["category"]
  ) {
    setUploadedPictures([]);
    setPendingPictures((previous) =>
      previous.map((picture) =>
        picture.id === pictureId ? { ...picture, category } : picture
      )
    );
  }

  function handleRemovePicture(pictureId: string) {
    setUploadedPictures([]);
    setPendingPictures((previous) =>
      previous.filter((picture) => picture.id !== pictureId)
    );
  }

  async function handleUploadPictures() {
    if (uploadInFlightRef.current) {
      return;
    }

    if (!draftId) {
      throw new Error("Lead draft is missing. Please restart from the first step.");
    }

    if (pendingPictures.length === 0) {
      throw new Error("Select at least one photo before uploading.");
    }

    if (pendingPictures.some((picture) => !picture.category)) {
      throw new Error("Select a category for each photo before uploading.");
    }

    setStepError(null);
    uploadInFlightRef.current = true;
    setIsPreparingUploads(true);
    setIsUploadingPictures(false);

    try {
      const uploads = await uploadLeadPictures(
        draftId,
        pendingPictures.map((picture) => ({
          category: picture.category!,
          file: picture.file,
        })),
        {
          onStageChange: (stage) => {
            setIsPreparingUploads(stage === "preparing");
            setIsUploadingPictures(stage === "uploading");
          },
        }
      );

      setUploadedPictures(uploads);
      message.success("Photos uploaded successfully.");
    } finally {
      uploadInFlightRef.current = false;
      setIsPreparingUploads(false);
      setIsUploadingPictures(false);
    }
  }

  async function handleSubmitLead() {
    if (!draftId) {
      throw new Error("Lead draft is missing. Please restart from the first step.");
    }

    if (uploadedPictures.length === 0) {
      throw new Error("Upload at least one photo before submitting the lead.");
    }

    setStepError(null);
    setIsSubmittingLead(true);

    try {
      const response = await submitLeadDraft(
        draftId,
        buildSubmitLeadDraftPayload(uploadedPictures)
      );
      clearLeadDraftId();
      setDraftId(null);
      setIsSubmittedSuccessfully(true);
      message.success(`Lead submitted at ${response.leadStage} stage.`);
    } finally {
      setIsSubmittingLead(false);
    }
  }

  function handleGoHome() {
    clearLeadDraftId();
    window.location.assign("/");
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

      if (currentStep.key === "reviewSubmit") {
        await handleSubmitLead();
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
            From first contact to submission-ready leads.
          </Paragraph>
          <Divider />
          <Steps current={currentStepIndex} direction="vertical" items={stepItems} />
        </Card>

        <Card
          className="lead-form-card"
          bordered={false}
          title={isSubmittedSuccessfully ? "Thank you" : currentStep.title}
          extra={
            isSubmittedSuccessfully ? null : (
              <Text type="secondary">{currentStep.description}</Text>
            )
          }
        >
          {isSubmittedSuccessfully ? (
            <Result
              status="success"
              title="Thank you for your submission"
              subTitle="Our team will review your details and reach out to you shortly."
              extra={
                <Button type="primary" onClick={handleGoHome}>
                  Home
                </Button>
              }
            />
          ) : isInfeasible ? (
            <Result
              status="warning"
              title="We can’t proceed with this setup right now"
              subTitle="Based on the answers so far, this lead is currently not feasible for the standard flow."
            />
          ) : (
            <Space direction="vertical" size="large" style={{ width: "100%" }}>
              {stepError ? <Alert type="error" message={stepError} showIcon /> : null}
              {currentStep.key === "reviewSubmit" ? (
                <LeadReviewSection
                  values={values}
                  pendingPictures={pendingPictures}
                  uploadedPictures={uploadedPictures}
                  onSelectFiles={handleSelectFiles}
                  onChangePictureCategory={handleChangePictureCategory}
                  onRemovePicture={handleRemovePicture}
                  onUploadPictures={() => {
                    void handleUploadPictures().catch((error) => {
                      const errorMessage =
                        error instanceof Error
                          ? error.message
                          : "Something went wrong while uploading photos.";

                      setStepError(errorMessage);
                      message.error(errorMessage);
                    });
                  }}
                  isPreparingUploads={isPreparingUploads}
                  isUploadingPictures={isUploadingPictures}
                />
              ) : (
                <LeadStepFields
                  stepKey={currentStep.key}
                  control={control}
                  errors={errors}
                  isApartment={isApartment}
                  values={values}
                />
              )}
              <div className="lead-form-card__actions">
                <Button onClick={handleBack} disabled={currentStepIndex === 0}>
                  Back
                </Button>
                <div className="lead-form-card__actions-right">
                  <Button
                    type="primary"
                    onClick={handleNext}
                    loading={isSubmittingStep || isSubmittingLead}
                    disabled={
                      currentStep.key === "reviewSubmit" &&
                      uploadedPictures.length === 0
                    }
                  >
                    {currentStepIndex === leadFormSteps.length - 1
                      ? "Submit lead"
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
