import { Module } from '@nestjs/common';
import { WinstonModule, WinstonModuleOptions } from 'nest-winston';
import * as winston from 'winston';

const winstonOptions: WinstonModuleOptions = {
  level: 'info',
  format: winston.format.combine(
    winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
    winston.format.errors({ stack: true }),
    winston.format.json(),
  ),
  transports: [
    new winston.transports.Console({
      format: winston.format.combine(
        winston.format.colorize(),
        winston.format.printf(({ level, message, timestamp, context, stack }) => {
          return `${timestamp} [${context || 'Application'}] ${level}: ${message}${stack ? '\n' + stack : ''}`;
        }),
      ),
    }),
  ],
};

@Module({
  imports: [
    WinstonModule.forRoot(winstonOptions),
  ],
  exports: [WinstonModule],
})
export class LoggingModule {}