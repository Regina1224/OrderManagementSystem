import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Order } from './entities/order.entity';
import { Payment } from './entities/payment.entity';

@Module({
  imports: [
    // root configuration method
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      // useFactory is for NestJS when it needed
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        // read the variable value from .env
        host: configService.get<string>('DB_HOST'),
        port: configService.get<number>('DB_PORT'),
        username: configService.get<string>('DB_USERNAME'),
        password: configService.get<string>('DB_PASSWORD'),
        database: configService.get<string>('DB_DATABASE'),
        entities: [User, Order, Payment],
        // important! if it is true, TypePRM will change the DB schema according to the entities every starting time.
        synchronize: false,
      }),
    }),
  ],
})
export class DbModule {}
