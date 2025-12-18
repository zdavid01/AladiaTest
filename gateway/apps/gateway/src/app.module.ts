import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { configModuleOptions } from '@app/config/index';
import { AuthModule } from './auth/auth.module';
import { LoggingModule } from '@app/common/logging/logging.module';
import { HealthController } from './health/health.controller';
import { TerminusModule } from '@nestjs/terminus';

@Module({
  imports: [
    ConfigModule.forRoot(configModuleOptions), 
    AuthModule,
    LoggingModule,
    TerminusModule
  ],
  controllers: [AppController, HealthController],
  providers: [AppService],
})
export class AppModule {}
