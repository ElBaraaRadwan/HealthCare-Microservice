import { Injectable, OnModuleInit } from '@nestjs/common';
import {
  ClientKafka,
  ClientProxy,
  ClientProxyFactory,
  Transport,
} from '@nestjs/microservices';
import { InjectRepository } from '@nestjs/typeorm';
import { RedisService } from 'apps/redis/src/redis.service';
import { Client } from './entities/client.entity';
import { CreateDto, UpdateDto } from './dto';
import { Repository } from 'typeorm';
@Injectable()
export class ClientsService implements OnModuleInit {
  private employeeServiceClient: ClientProxy;

  constructor(
    private readonly kafkaClient: ClientKafka,
    private readonly REDIS: RedisService,
    @InjectRepository(Client)
    private readonly clientRepo: Repository<Client>,
  ) {}

  onModuleInit() {
    // Connect to the employee service
    this.employeeServiceClient = ClientProxyFactory.create({
      transport: Transport.TCP,
      options: { host: 'employee', port: 3002 },
    });
  }

  create(DTO: CreateDto) {
    const client = this.clientRepo.create(DTO);
    return this.clientRepo.save(client);
  }

  findAll() {
    return this.clientRepo.find();
  }

  findOne(id: number) {
    return this.clientRepo.findOne({ where: { id } });
  }

  update(id: number, DTO: UpdateDto) {
    return this.clientRepo.update(id, DTO);
  }

  remove(id: number) {
    return this.clientRepo.delete(id);
  }
}
