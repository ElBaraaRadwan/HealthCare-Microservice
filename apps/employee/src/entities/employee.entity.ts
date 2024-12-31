import { Client } from 'apps/clients/src/entities/client.entity';
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';

@Entity('employees')
export class Employee {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  position: string;

  @OneToMany(() => Client, (client) => client.employee)
  clients: Client[];
}
