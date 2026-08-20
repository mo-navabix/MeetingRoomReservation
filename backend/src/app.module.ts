import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { HealthModule } from './health/health.module';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigService } from '@nestjs/config';
import { UsersController } from './users/users.controller';
import { UsersModule } from './users/users.module';
import * as joi from 'joi';
import { User } from './users/entities/user.entity';
import { RoomsModule } from './rooms/rooms.module';

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
        DB_HOST: joi.string().required(),
        DB_PORT: joi.number().integer().default(5432),
        DB_USERNAME: joi.string().required(),
        DB_PASSWORD: joi.string().required(),
        DB_DATABASE: joi.string().required(),

        MAIL_HOST: joi.string().required(),

        MAIL_PORT: joi.number().integer().default(587),

        MAIL_SECURE: joi.boolean().default(false),

        MAIL_USER: joi.string().required(),

        MAIL_PASSWORD: joi.string().required(),

        MAIL_FROM: joi.string().required(),

        JWT_SECRET: joi.string().required(),

        JWT_EXPIRES_IN: joi.string().default('1d'),
      }),
    }),

    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',

        host: configService.get<string>('DB_HOST'),

        port: configService.get<number>('DB_PORT'),

        username: configService.get<string>('DB_USERNAME'),

        password: configService.get<string>('DB_PASSWORD'),

        database: configService.get<string>('DB_DATABASE'),
        entities: [User],
        autoLoadEntities: true,
        logging: true,
        synchronize: true,
      }),
    }),
    HealthModule,
    AuthModule,
    UsersModule,
    RoomsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
