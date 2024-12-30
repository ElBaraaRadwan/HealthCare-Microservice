import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { PharmacyModule } from './pharmacy.module';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    PharmacyModule,
    {
      transport: Transport.KAFKA,
      options: {
        client: {
          brokers: ['localhost:9092'],
        },
        consumer: {
          groupId: 'healthcare-group',
        },
      },
    },
  );
  await app.listen();
  console.log('Pharmacy Microservice is running');
}
bootstrap();
