import { Employee } from 'apps/employee/src/entities/employee.entity';
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';

@Entity('clients')
export class Client {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ unique: true })
  email: string;

  @ManyToOne(() => Employee, (employee) => employee.clients)
  employee: Employee;
}
