import { Column, Entity, JoinTable, ManyToMany, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

import { Images } from '../class/Images';
import { ImagesProducts } from './images.entity';

@Entity()
export class Product {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('text', { unique: true })
  name: string;

  @Column()
  description: string;

  @Column('numeric')
  price: number;

  @ManyToMany(() => ImagesProducts, (images) => images.product, {
    cascade: true,
  })
  @JoinTable()
  images: Images[];

  @Column('text')
  review: string;
}
