import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { randomUUID } from "crypto";

import type { LeadPictureCategory } from "../dto/prepare-lead-asset-uploads.dto.js";

type PresignUploadInput = {
  draftId: string;
  category: LeadPictureCategory;
  originalFileName: string;
  mimeType: string;
};

type PresignUploadResult = {
  assetId: string;
  category: LeadPictureCategory;
  objectKey: string;
  uploadUrl: string;
  expiresAt: string;
  requiredHeaders: Record<string, string>;
};

@Injectable()
export class S3PresignService {
  private readonly s3Client: S3Client;

  constructor(private readonly configService: ConfigService) {
    this.s3Client = new S3Client({
      region: this.configService.getOrThrow<string>("AWS_REGION"),
      credentials: {
        accessKeyId: this.configService.getOrThrow<string>("AWS_ACCESS_KEY_ID"),
        secretAccessKey: this.configService.getOrThrow<string>(
          "AWS_SECRET_ACCESS_KEY"
        ),
      },
      requestChecksumCalculation: "WHEN_REQUIRED",
      responseChecksumValidation: "WHEN_REQUIRED",
    });
  }

  async createUpload(input: PresignUploadInput): Promise<PresignUploadResult> {
    const assetId = randomUUID();
    const expiresInSeconds = this.getExpiresInSeconds();
    const expiresAt = new Date(Date.now() + expiresInSeconds * 1000);
    const objectKey = this.buildObjectKey({
      draftId: input.draftId,
      category: input.category,
      assetId,
      originalFileName: input.originalFileName,
    });

    const command = new PutObjectCommand({
      Bucket: this.configService.getOrThrow<string>("AWS_S3_BUCKET"),
      Key: objectKey,
    });

    const uploadUrl = await getSignedUrl(this.s3Client, command, {
      expiresIn: expiresInSeconds,
    });

    return {
      assetId,
      category: input.category,
      objectKey,
      uploadUrl,
      expiresAt: expiresAt.toISOString(),
      requiredHeaders: {},
    };
  }

  private buildObjectKey(input: {
    draftId: string;
    category: LeadPictureCategory;
    assetId: string;
    originalFileName: string;
  }) {
    const prefix = this.configService.get<string>("AWS_S3_ASSET_PREFIX", "drafts");
    const sanitizedFileName = input.originalFileName
      .trim()
      .replace(/[^a-zA-Z0-9._-]/g, "-");

    return `${prefix}/${input.draftId}/pending-assets/${input.category}/${input.assetId}-${sanitizedFileName}`;
  }

  private getExpiresInSeconds() {
    const ttlMinutes = this.configService.get<number>(
      "ASSET_PRESIGN_TTL_MINUTES",
      15
    );

    return ttlMinutes * 60;
  }
}
