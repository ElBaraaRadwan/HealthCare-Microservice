import { Module } from '@nestjs/common';
import { PharmacyController } from './pharmacy.controller';
import { PharmacyService } from './pharmacy.service';
import { RedisService } from 'apps/redis/src/redis.service';

@Module({
  imports: [],
  controllers: [PharmacyController],
  providers: [PharmacyService, RedisService],
})
export class PharmacyModule {}
