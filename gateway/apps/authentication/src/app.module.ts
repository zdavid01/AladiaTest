import { configModuleOptions } from '@app/config/index';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { AppService } from 'apps/gateway/src/app.service';
import { config } from 'process';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    ConfigModule.forRoot(configModuleOptions),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        uri: configService.get<string>('MONGO_URI'),
      }),
      inject: [ConfigService]
    }),
    UsersModule
  ],
  controllers: [],
  providers: [AppService],
})
export class AppModule {}
