import { Injectable, OnModuleInit } from '@nestjs/common';
import {
  ClientProxy,
  ClientProxyFactory,
  Transport,
} from '@nestjs/microservices';
import { RedisService } from 'apps/redis/src/redis.service';
import { CreateDto, UpdateDto } from './dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Pharmacy } from './entities/pharmacy.entity';
import { Repository } from 'typeorm';

@Injectable()
export class PharmacyService implements OnModuleInit {
  private employeeServiceClient: ClientProxy;
  private clientServiceClient: ClientProxy;
  constructor(
    private REDIS: RedisService,
    @InjectRepository(Pharmacy)
    private readonly pharmacyRepo: Repository<Pharmacy>,
  ) {}

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

  create(DTO: CreateDto) {
    const client = this.pharmacyRepo.create(DTO);
    return this.pharmacyRepo.save(client);
  }

  findAll() {
    return this.pharmacyRepo.find();
  }

  findOne(id: number) {
    return this.pharmacyRepo.findOne({ where: { id } });
  }

  update(id: number, DTO: UpdateDto) {
    return this.pharmacyRepo.update(id, DTO);
  }

  remove(id: number) {
    return this.pharmacyRepo.delete(id);
  }
}
