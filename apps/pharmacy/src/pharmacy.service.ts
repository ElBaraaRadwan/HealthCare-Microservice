import { Injectable, OnModuleInit } from '@nestjs/common';
import {
  ClientProxy,
  ClientProxyFactory,
  Transport,
} from '@nestjs/microservices';
import { RedisService } from 'apps/redis/src/redis.service';

@Injectable()
export class PharmacyService implements OnModuleInit {
  private employeeServiceClient: ClientProxy;
  private clientServiceClient: ClientProxy;
  constructor(private REDIS: RedisService) {}

  onModuleInit() {
    // Connect to the employee service
    this.employeeServiceClient = ClientProxyFactory.create({
      transport: Transport.TCP,
      options: { host: 'employee', port: 3002 },
    });

    // Connect to the client service
    this.clientServiceClient = ClientProxyFactory.create({
      transport: Transport.TCP,
      options: { host: 'client', port: 3001 },
    });
  }
}
