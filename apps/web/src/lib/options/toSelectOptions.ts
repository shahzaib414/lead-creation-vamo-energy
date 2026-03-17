export type SelectOption<T extends string = string> = {
  label: string;
  value: T;
};

export function toSelectOptions<T extends string>(
  values: readonly T[],
  labels: Record<T, string>
): SelectOption<T>[] {
  return values.map((value) => ({
    value,
    label: labels[value],
  }));
}
