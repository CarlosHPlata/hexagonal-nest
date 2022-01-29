import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HealthController } from './infrastructure/controllers/health.controller';
import { ExampleModule } from './modules/example/example.module';
import { SharedModule } from './shared.module';

const ENV = process.env.NODE_ENV;

const modules = [SharedModule, ExampleModule];

@Module({
  imports: [
    ...modules,

    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: !ENV ? '.env' : `env/.env.${ENV}`
    }),

    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (config: ConfigService) => ({
        type: 'mysql',
        host: config.get('DB_HOST'),
        port: parseInt(config.get('DB_PORT')),
        username: config.get('DB_USER'),
        password: config.get('DB_PASSWORD'),
        database: config.get('DB_NAME'),
        autoLoadEntities: true,
        synchronize: (config.get('DB_SYNC') ?? 'false') === 'true',
        logging: true,
        keepConnectionAlive: true
      }),
      inject: [ConfigService]
    })
  ],
  controllers: [HealthController],
  providers: []
})
export class AppModule {}
