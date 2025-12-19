import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { configModuleOptions } from '@app/config/index';
import { AuthModule } from './auth/auth.module';
import { LoggingModule } from '@app/common/logging/logging.module';
import { HealthController } from './health/health.controller';
import { TerminusModule } from '@nestjs/terminus';
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';
import { APP_GUARD } from '@nestjs/core';

@Module({
  imports: [
    ConfigModule.forRoot(configModuleOptions), 
    AuthModule,
    LoggingModule,
    TerminusModule,
    ThrottlerModule.forRoot([
      {
        ttl: 60_000,  // Time window: 60 seconds
        limit: 20,    // Max 20 requests per IP in that window
      },
    ]),
  ],
  controllers: [AppController, HealthController],
  providers: [
    AppService,
    {
      provide: APP_GUARD,          // ← This registers it globally
      useClass: ThrottlerGuard,
    },
  ],
})
export class AppModule {}
