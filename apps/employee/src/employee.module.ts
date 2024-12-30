import { Module } from '@nestjs/common';
import { EmployeeController } from './employee.controller';
import { EmployeeService } from './employee.service';
import { RedisService } from 'apps/redis/src/redis.service';

@Module({
  controllers: [EmployeeController],
  providers: [EmployeeService, RedisService],
})
export class EmployeeModule {}
