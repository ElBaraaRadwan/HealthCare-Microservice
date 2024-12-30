import { Injectable, OnModuleInit } from '@nestjs/common';
import {
  ClientKafka,
  ClientProxy,
  ClientProxyFactory,
  Transport,
} from '@nestjs/microservices';
import { RedisService } from 'apps/redis/src/redis.service';

@Injectable()
export class EmployeeService implements OnModuleInit {
  private clientServiceClient: ClientProxy;
  constructor(
    private REDIS: RedisService,
    private readonly kafkaClient: ClientKafka,
  ) {}

  onModuleInit() {
    // Connect to the client service
    this.clientServiceClient = ClientProxyFactory.create({
      transport: Transport.TCP,
      options: { host: 'client', port: 3001 },
    });
  }
}
