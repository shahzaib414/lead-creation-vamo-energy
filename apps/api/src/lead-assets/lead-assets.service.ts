import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { ConfigService } from "@nestjs/config";

import { FeasibilityStatus } from "@vamo/shared";

import {
  PrepareLeadAssetUploadsDto,
  type PrepareLeadAssetUploadFileDto,
} from "./dto/prepare-lead-asset-uploads.dto.js";
import {
  PrepareLeadAssetUploadsResponseDto,
  type PreparedLeadAssetUploadDto,
} from "./dto/prepare-lead-asset-uploads-response.dto.js";
import { LeadDraftsRepository } from "../lead-drafts/lead-drafts.repository.js";
import { LeadFeasibilityService } from "../lead-drafts/services/lead-feasibility.service.js";
import { S3PresignService } from "./services/s3-presign.service.js";

@Injectable()
export class LeadAssetsService {
  constructor(
    private readonly configService: ConfigService,
    private readonly leadDraftsRepository: LeadDraftsRepository,
    private readonly leadFeasibilityService: LeadFeasibilityService,
    private readonly s3PresignService: S3PresignService
  ) {}

  async prepareUploads(
    draftId: string,
    prepareLeadAssetUploadsDto: PrepareLeadAssetUploadsDto
  ): Promise<PrepareLeadAssetUploadsResponseDto> {
    const leadDraft = await this.leadDraftsRepository.findByDraftId(draftId);

    if (!leadDraft) {
      throw new NotFoundException(`Lead draft ${draftId} not found`);
    }

    if (leadDraft.isSubmitted) {
      throw new BadRequestException(
        "Lead draft is already submitted and cannot accept new asset uploads"
      );
    }

    const { feasibilityStatus } = this.leadFeasibilityService.evaluate(
      leadDraft.payload
    );

    if (feasibilityStatus === FeasibilityStatus.Infeasible) {
      throw new BadRequestException(
        "Asset uploads are not available for infeasible lead drafts"
      );
    }

    this.validateTotalFileSize(prepareLeadAssetUploadsDto.files);

    const uploads = await Promise.all(
      prepareLeadAssetUploadsDto.files.map((file) =>
        this.prepareUpload(draftId, file)
      )
    );

    return { uploads };
  }

  private prepareUpload(
    draftId: string,
    file: PrepareLeadAssetUploadFileDto
  ): Promise<PreparedLeadAssetUploadDto> {
    return this.s3PresignService.createUpload({
      draftId,
      category: file.category,
      originalFileName: file.originalFileName,
      mimeType: file.mimeType,
    });
  }

  private validateTotalFileSize(files: PrepareLeadAssetUploadFileDto[]) {
    const totalSizeBytes = files.reduce((sum, file) => sum + file.sizeBytes, 0);
    const maxTotalSizeMb = this.configService.get<number>(
      "ASSET_MAX_TOTAL_SIZE_MB",
      100
    );
    const maxTotalSizeBytes = maxTotalSizeMb * 1024 * 1024;

    if (totalSizeBytes > maxTotalSizeBytes) {
      throw new BadRequestException(
        `Total asset size exceeds ${maxTotalSizeMb} MB`
      );
    }
  }
}
