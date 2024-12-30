import { NestFactory } from '@nestjs/core';
import { RedisModule } from './redis.module';
import { Transport } from '@nestjs/microservices';

async function bootstrap() {
  const app = await NestFactory.createMicroservice(RedisModule, {
    transport: Transport.REDIS,
    options: {
      host: 'redis',
      port: 6379,
    },
  });
  await app.listen();
}
bootstrap();
