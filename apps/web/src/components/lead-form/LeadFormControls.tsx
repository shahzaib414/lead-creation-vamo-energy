import { Input, InputNumber, Radio, Select, Space, Typography } from "antd";
import { Controller, type UseFormReturn } from "react-hook-form";

import { yesNoOptions } from "../../config/leadFormOptions";
import type { LeadDraftFormValues } from "../../lib/forms/leadDraftForm.types";

const { Text } = Typography;

export type LeadFormControl = UseFormReturn<LeadDraftFormValues>["control"];
export type LeadFormErrors = UseFormReturn<LeadDraftFormValues>["formState"]["errors"];

export function ControlledInput({
  control,
  name,
  label,
  error,
}: {
  control: LeadFormControl;
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

export function ControlledInputNumber({
  control,
  name,
  label,
  error,
}: {
  control: LeadFormControl;
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

export function ControlledSelect({
  control,
  name,
  label,
  options,
  error,
}: {
  control: LeadFormControl;
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

export function ControlledSegmentedSelect({
  control,
  name,
  label,
  options,
  error,
}: {
  control: LeadFormControl;
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

export function ControlledRadioBoolean({
  control,
  name,
  label,
  error,
}: {
  control: LeadFormControl;
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
