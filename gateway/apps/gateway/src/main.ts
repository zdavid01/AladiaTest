import { APP_GUARD, NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ThrottlerGuard } from '@nestjs/throttler';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // app.useGlobalGuards({
  //   provide: APP_GUARD,
  //   useClass: ThrottlerGuard,
  // });

  await app.listen(process.env.PORT ?? 3000);
  console.log('Gateway is listening on port 3000');
}
bootstrap();
