import { Injectable, OnModuleInit } from '@nestjs/common';
import {
  ClientKafka,
  ClientProxy,
  ClientProxyFactory,
  Transport,
} from '@nestjs/microservices';
import { InjectRepository } from '@nestjs/typeorm';
import { RedisService } from 'apps/redis/src/redis.service';
import { Employee } from './entities/employee.entity';
import { Repository } from 'typeorm';
import { CreateDto, UpdateDto } from './dto';

@Injectable()
export class EmployeeService implements OnModuleInit {
  private clientServiceClient: ClientProxy;
  constructor(
    private REDIS: RedisService,
    private readonly kafkaClient: ClientKafka,
    @InjectRepository(Employee)
    private readonly employeeRepo: Repository<Employee>,
  ) {}

  onModuleInit() {
    // Connect to the client service
    this.clientServiceClient = ClientProxyFactory.create({
      transport: Transport.TCP,
      options: { host: 'client', port: 3001 },
    });
  }

  create(DTO: CreateDto) {
    const client = this.employeeRepo.create(DTO);
    return this.employeeRepo.save(client);
  }

  findAll() {
    return this.employeeRepo.find();
  }

  findOne(id: number) {
    return this.employeeRepo.findOne({ where: { id } });
  }

  update(id: number, DTO: UpdateDto) {
    return this.employeeRepo.update(id, DTO);
  }

  remove(id: number) {
    return this.employeeRepo.delete(id);
  }
}
