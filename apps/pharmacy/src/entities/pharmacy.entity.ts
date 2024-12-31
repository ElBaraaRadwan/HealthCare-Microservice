import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity({ name: 'pharmacies' })
export class Pharmacy {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  location: string;
}
