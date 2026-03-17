import type { LeadPictureCategory } from "../../config/leadPictureCategories";
import type { PreparedLeadAssetUpload } from "./leadAssets";

export type SubmitLeadDraftPayload = {
  pictures: Partial<
    Record<
      LeadPictureCategory,
      Array<{
        objectKey: string;
      }>
    >
  >;
};

export function buildSubmitLeadDraftPayload(
  uploads: PreparedLeadAssetUpload[]
): SubmitLeadDraftPayload {
  const pictures = uploads.reduce<SubmitLeadDraftPayload["pictures"]>(
    (result, upload) => {
      const existingPictures = result[upload.category] ?? [];

      result[upload.category] = [
        ...existingPictures,
        {
          objectKey: upload.objectKey,
        },
      ];

      return result;
    },
    {}
  );

  return { pictures };
}
