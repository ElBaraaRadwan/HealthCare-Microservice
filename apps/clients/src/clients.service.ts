import { Injectable, OnModuleInit } from '@nestjs/common';
import {
  ClientKafka,
  ClientProxy,
  ClientProxyFactory,
  Transport,
} from '@nestjs/microservices';
import { RedisService } from 'apps/redis/src/redis.service';
@Injectable()
export class ClientsService implements OnModuleInit {
  private employeeServiceClient: ClientProxy;

  constructor(
    private readonly kafkaClient: ClientKafka,
    private readonly REDIS: RedisService,
  ) {}

  onModuleInit() {
    // Connect to the employee service
    this.employeeServiceClient = ClientProxyFactory.create({
      transport: Transport.TCP,
      options: { host: 'employee', port: 3002 },
    });
  }
}
