import { Module, MiddlewareConsumer, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';

import { UsersModule } from './users/users.module';
import { ProductsModule } from './products/products.module';
import { AuthModule } from './auth/auth.module';

import { LoggerGlobalMiddleware } from './middlewares/logger.middleware';

import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import typeorm from './config/typeorm';
import { DataSourceOptions } from 'typeorm';
import { CategoriesModule } from './categories/categories.module';
import { OrdersModule } from './orders/orders.module';
import { FileUploadModule } from './file-upload/file-upload.module';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [typeorm],
    }),

    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        const config = configService.get<DataSourceOptions>('typeorm');

        if (!config) {
          throw new Error('TypeORM config not found');
        }

        return config;
      },
    }),

    UsersModule,
    ProductsModule,
    AuthModule,
    CategoriesModule,
    OrdersModule,
    FileUploadModule,
    AuthModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '1h' },
      global: true,
    }),
  ],

  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerGlobalMiddleware).forRoutes('*');
  }
}
