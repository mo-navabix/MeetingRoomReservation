import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { HealthModule } from './health/health.module';
import { ConfigModule } from '@nestjs/config';
import * as joi from 'joi';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: joi.object({
        PORT: joi.number().integer().min(1).max(65535).default(3000),
        NODE_ENV: joi
          .string()
          .valid('development', 'test', 'production')
          .default('development'),
      }),
    }),
    HealthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
