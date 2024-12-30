import { Module } from '@nestjs/common';
import { ClientsController } from './clients.controller';
import { ClientsService } from './clients.service';
import { RedisService } from 'apps/redis/src/redis.service';

@Module({
  controllers: [ClientsController],
  providers: [ClientsService, RedisService],
})
export class ClientsModule {}
