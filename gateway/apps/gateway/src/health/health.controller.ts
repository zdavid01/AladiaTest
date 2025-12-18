import { Controller, Get } from '@nestjs/common';
import {
  HealthCheckService,
  HealthCheck,
  MongooseHealthIndicator,
  MicroserviceHealthIndicator,
} from '@nestjs/terminus';
import { Transport } from '@nestjs/microservices';

@Controller('health')
export class HealthController {
  constructor(
    private health: HealthCheckService,
    // private db: MongooseHealthIndicator,
    private microservice: MicroserviceHealthIndicator,
  ) {}

  @Get()
  @HealthCheck()
  check() {
    return this.health.check([
    //   () => this.db.pingCheck('mongodb'),

      () => this.microservice.pingCheck('auth_microservice', {
        transport: Transport.TCP,
        options: { host: 'localhost', port: 3001 },
      }),
    ]);
  }
}