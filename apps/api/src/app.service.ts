import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { InjectConnection } from "@nestjs/mongoose";
import { Connection } from "mongoose";

import {
  FeasibilityStatus,
  FormStep,
  LeadStage,
} from "./shared/domain/index.js";

@Injectable()
export class AppService {
  constructor(
    private readonly configService: ConfigService,
    @InjectConnection() private readonly connection: Connection
  ) {}

  getHealth() {
    const databaseStatus =
      this.connection.readyState === 1 ? "connected" : "disconnected";

    return {
      status: "ok",
      service: "api",
      environment: this.configService.get<string>("NODE_ENV"),
      database: databaseStatus,
      sharedTypes: {
        defaultFormStep: FormStep.LeadContact,
        initialLeadStage: LeadStage.LeadCapture,
        initialFeasibilityStatus: FeasibilityStatus.Unknown,
      },
    };
  }
}
