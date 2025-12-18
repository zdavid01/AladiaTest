import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { configModuleOptions } from '@app/config/index';
import { AuthModule } from './auth/auth.module';
import { LoggingModule } from '@app/common/logging/logging.module';

@Module({
  imports: [
    ConfigModule.forRoot(configModuleOptions), 
    AuthModule,
    LoggingModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
