import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

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
        entities: [],
        // important! if it is true, TypePRM will change the DB schema according to the entities every starting time.
        synchronize: false,
      }),
    }),
  ],
})
export class DbModule {}
