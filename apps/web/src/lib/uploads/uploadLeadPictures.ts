import type { LeadPictureCategory } from "../../config/leadPictureCategories";
import {
  prepareLeadAssetUploads,
  type PreparedLeadAssetUpload,
} from "../api/leadAssets";

export type UploadableLeadPicture = {
  category: LeadPictureCategory;
  file: File;
};

export type UploadLeadPicturesOptions = {
  onStageChange?: (stage: "preparing" | "uploading") => void;
};

export async function uploadLeadPictures(
  draftId: string,
  pictures: UploadableLeadPicture[],
  options?: UploadLeadPicturesOptions
) {
  let prepareResponse;

  options?.onStageChange?.("preparing");

  try {
    prepareResponse = await prepareLeadAssetUploads(draftId, {
      files: pictures.map((picture) => ({
        category: picture.category,
        originalFileName: picture.file.name,
        mimeType: picture.file.type || "application/octet-stream",
        sizeBytes: picture.file.size,
      })),
    });
  } catch (error) {
    throw new Error(
      error instanceof Error
        ? `Unable to prepare photo uploads. ${error.message}`
        : "Unable to prepare photo uploads."
    );
  }

  options?.onStageChange?.("uploading");

  await Promise.all(
    prepareResponse.uploads.map((upload, index) =>
      uploadPreparedLeadPicture(upload, pictures[index]!.file)
    )
  );

  return prepareResponse.uploads;
}

async function uploadPreparedLeadPicture(
  upload: PreparedLeadAssetUpload,
  file: File
) {
  let response: Response;

  try {
    response = await fetch(upload.uploadUrl, {
      method: "PUT",
      headers: upload.requiredHeaders,
      body: file,
    });
  } catch (error) {
    throw new Error(
      error instanceof Error
        ? `Unable to upload ${file.name}. ${error.message}`
        : `Unable to upload ${file.name}.`
    );
  }

  if (!response.ok) {
    throw new Error(
      `Unable to upload ${file.name}. Upload failed with status ${response.status}`
    );
  }
}
