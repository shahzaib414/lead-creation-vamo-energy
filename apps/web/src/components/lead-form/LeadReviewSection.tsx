import { Alert } from "antd";

import type { LeadDraftFormValues } from "../../lib/forms/leadDraftForm.types";

export function LeadReviewSection({ values }: { values: LeadDraftFormValues }) {
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
          [
            "Address",
            [values.street, values.city, values.postalCode].filter(Boolean).join(", ") ||
              "-",
          ],
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
