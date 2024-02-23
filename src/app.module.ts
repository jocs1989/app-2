import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MokingService } from './moking/moking.service';
import { ProductsModule } from './products/products.module';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useFactory: () => ({
        type: 'postgres',
        host: 'localhost',
        port: 5432,
        username: 'Admin',
        password: 'root',
        database: 'ecommerce',
        entities: [],
        autoLoadEntities: true,
        synchronize: true,
      }),
    }),
    ProductsModule,
  ],
  controllers: [AppController],
  providers: [AppService, MokingService],
})
export class AppModule {}
