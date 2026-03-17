import type { LeadPictureCategory } from "./prepare-lead-asset-uploads.dto.js";

export class PreparedLeadAssetUploadDto {
  assetId!: string;
  category!: LeadPictureCategory;
  objectKey!: string;
  uploadUrl!: string;
  expiresAt!: string;
  requiredHeaders!: Record<string, string>;
}

export class PrepareLeadAssetUploadsResponseDto {
  uploads!: PreparedLeadAssetUploadDto[];
}
