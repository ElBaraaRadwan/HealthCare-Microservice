import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ClientsController } from './clients.controller';
import { ClientsService } from './clients.service';
import { Client } from './entities/client.entity';
import { RedisService } from 'apps/redis/src/redis.service';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }), // Loads environment variables
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (CONFIG: ConfigService) => ({
        type: 'postgres',
        host: CONFIG.get<string>('POSTGRES_HOST'),
        port: CONFIG.get<number>('POSTGRES_PORT'),
        username: CONFIG.get<string>('POSTGRES_USER'),
        password: CONFIG.get<string>('POSTGRES_PASSWORD'),
        database: CONFIG.get<string>('POSTGRES_DB'),
        synchronize: true, // Disable in production
        entities: [Client],
      }),
      inject: [ConfigService],
    }),
    TypeOrmModule.forFeature([Client]),
  ],
  controllers: [ClientsController],
  providers: [ClientsService, RedisService],
})
export class ClientsModule {}
