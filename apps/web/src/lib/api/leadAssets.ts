import { requestJson } from "./client";
import type { LeadPictureCategory } from "../../config/leadPictureCategories";

export type PrepareLeadAssetUploadFilePayload = {
  category: LeadPictureCategory;
  originalFileName: string;
  mimeType: string;
  sizeBytes: number;
};

export type PrepareLeadAssetUploadsPayload = {
  files: PrepareLeadAssetUploadFilePayload[];
};

export type PreparedLeadAssetUpload = {
  assetId: string;
  category: LeadPictureCategory;
  objectKey: string;
  uploadUrl: string;
  expiresAt: string;
  requiredHeaders: Record<string, string>;
};

export type PrepareLeadAssetUploadsResponse = {
  uploads: PreparedLeadAssetUpload[];
};

export function prepareLeadAssetUploads(
  draftId: string,
  payload: PrepareLeadAssetUploadsPayload
) {
  return requestJson<PrepareLeadAssetUploadsResponse>(
    `/lead-drafts/${draftId}/assets/prepare`,
    {
      method: "POST",
      body: JSON.stringify(payload),
    }
  );
}
