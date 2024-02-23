import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';

import { Product } from './product.entity';

@Entity()
export class ImagesProducts {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('text')
  name: string;

  @Column('text')
  url: string;

  @ManyToMany(() => Product, (product) => product.images)
  product: Product;
}
