import { Alert, Button, Select, Space, Typography } from "antd";

import type { LeadDraftFormValues } from "../../lib/forms/leadDraftForm.types";
import {
  leadPictureCategoryOptions,
  type LeadPictureCategory,
} from "../../config/leadPictureCategories";
import type { PreparedLeadAssetUpload } from "../../lib/api/leadAssets";

const { Text } = Typography;

export type PendingLeadPicture = {
  id: string;
  file: File;
  category?: LeadPictureCategory;
};

export function LeadReviewSection({
  values,
  pendingPictures,
  uploadedPictures,
  onSelectFiles,
  onChangePictureCategory,
  onRemovePicture,
  onUploadPictures,
  isPreparingUploads,
  isUploadingPictures,
}: {
  values: LeadDraftFormValues;
  pendingPictures: PendingLeadPicture[];
  uploadedPictures: PreparedLeadAssetUpload[];
  onSelectFiles: (files: FileList | null) => void;
  onChangePictureCategory: (pictureId: string, category: LeadPictureCategory) => void;
  onRemovePicture: (pictureId: string) => void;
  onUploadPictures: () => void;
  isPreparingUploads: boolean;
  isUploadingPictures: boolean;
}) {
  return (
    <div className="lead-review-list">
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
          ["Residential units", stringifyNumber(values.residentialUnits)],
          ["Apartment heating", values.apartmentHeatingSystem || "-"],
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
          ["People in household", stringifyNumber(values.personsHousehold)],
          ["Heat distribution", values.typeOfHeating || "-"],
          ["Heritage protected", values.heritageProtection || "-"],
          ["Bathtubs", stringifyNumber(values.numberOfBathtubs)],
          ["Showers", stringifyNumber(values.numberOfShowers)],
          ["Shower type", values.typeOfShowers || "-"],
        ]}
      />
      <ReviewGroup
        title="Technical"
        rows={[
          ["Boiler room", values.boilerRoomSize || "-"],
          ["Ceiling height", values.installationLocationCeilingHeight || "-"],
          ["Width pathway", values.widthPathway || "-"],
          ["Height pathway", values.heightPathway || "-"],
          [
            "Rooms to outdoor unit",
            values.roomsBetweenHeatingRoomAndOutdoorUnit || "-",
          ],
          ["Meter closet", values.meterClosetLocation || "-"],
          ["Electricity connection", values.electricityConnectionLocation || "-"],
          ["Grounding type", values.groundingType || "-"],
          ["Solar thermal system", stringifyBoolean(values.hasSolarThermalSystem)],
          ["Consumption", stringifyNumber(values.consumption)],
          ["Consumption unit", values.consumptionUnit || "-"],
          [
            "Heating system year",
            stringifyNumber(values.constructionYearHeatingSystem),
          ],
          [
            "Floor heating distributors",
            stringifyNumber(values.numberOfFloorHeatingDistributors),
          ],
          ["Radiators", stringifyNumber(values.numberOfRadiators)],
          [
            "Domestic hot water by heat pump",
            stringifyBoolean(values.domesticHotWaterByHeatpump),
          ],
          [
            "Hot water circulation pump",
            values.domesticHotWaterCirculationPump || "-",
          ],
          ["Domestic water station", values.domesticWaterStation || "-"],
          ["Timeline", values.timeline || "-"],
          ["Household income", values.householdIncome || "-"],
          [
            "Foundation construction",
            values.statusOfFoundationConstruction || "-",
          ],
          [
            "Replacement planned",
            stringifyBoolean(values.fullReplacementOfHeatingSystemPlanned),
          ],
        ]}
      />
      <section className="lead-review-group">
        <h3>Photos</h3>
        <Space direction="vertical" style={{ width: "100%" }} size={12}>
          <Alert
            type="info"
            showIcon
            message="Upload at least one photo before final submission"
            description="We first request presigned URLs from the backend and then upload all selected images to S3."
          />
          <input
            className="lead-file-input"
            type="file"
            multiple
            accept="image/*"
            onChange={(event) => {
              onSelectFiles(event.target.files);
              event.target.value = "";
            }}
          />
          {pendingPictures.map((picture) => (
            <div key={picture.id} className="lead-upload-item">
              <span className="lead-review-label">
                {picture.file.name} ({Math.round(picture.file.size / 1024)} KB)
              </span>
              <Space direction="vertical" style={{ width: "100%" }} size={8}>
                <Select
                  style={{ width: "100%" }}
                  placeholder="Select a category"
                  options={[...leadPictureCategoryOptions]}
                  value={picture.category}
                  onChange={(value) =>
                    onChangePictureCategory(picture.id, value as LeadPictureCategory)
                  }
                />
                <Button onClick={() => onRemovePicture(picture.id)}>Remove</Button>
              </Space>
            </div>
          ))}
          <Button
            onClick={onUploadPictures}
            disabled={pendingPictures.length === 0}
            loading={isPreparingUploads || isUploadingPictures}
          >
            {isPreparingUploads
              ? "Preparing uploads..."
              : isUploadingPictures
                ? "Uploading photos..."
                : "Upload photos"}
          </Button>
          <Text type={uploadedPictures.length > 0 ? "success" : "secondary"}>
            {uploadedPictures.length > 0
              ? `${uploadedPictures.length} photo(s) uploaded successfully`
              : "No photos uploaded yet"}
          </Text>
        </Space>
      </section>
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

function stringifyNumber(value?: number) {
  if (typeof value === "number") {
    return String(value);
  }

  return "-";
}
