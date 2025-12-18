import { configModuleOptions } from '@app/config/index';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppService } from 'apps/gateway/src/app.service';

@Module({
  imports: [ConfigModule.forRoot(configModuleOptions)],
  controllers: [],
  providers: [AppService],
})
export class AppModule {}
