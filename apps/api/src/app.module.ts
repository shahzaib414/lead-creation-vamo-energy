import { Module } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { MongooseModule } from "@nestjs/mongoose";

import { AppController } from "./app.controller.js";
import { AppService } from "./app.service.js";
import { validateEnv } from "./config/app-env.js";
import { LeadDraftsModule } from "./lead-drafts/lead-drafts.module.js";
import { LeadSubmissionModule } from "./lead-submission/lead-submission.module.js";

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validate: validateEnv,
    }),
    MongooseModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        uri: configService.getOrThrow<string>("MONGODB_URI"),
      }),
    }),
    LeadDraftsModule,
    LeadSubmissionModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
