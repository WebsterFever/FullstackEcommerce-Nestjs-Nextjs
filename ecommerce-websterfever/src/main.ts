import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe({ whitelist: true }));

  const config = new DocumentBuilder()
    .setTitle('E-commerce API')
    .setDescription(
      `
  Professional E-commerce REST API built with NestJS, TypeORM, PostgreSQL, JWT Authentication, Role-Based Authorization, File Uploads, and Swagger Documentation.

  Features:
  - User Authentication & Authorization
  - JWT Protected Routes
  - Admin & User Roles
  - Products Management
  - Categories Management
  - Orders System
  - Pagination & Filtering
  - DTO Validation with Pipes
  - File/Image Upload
  - Secure Password Hashing with bcrypt
  - Error Handling & HTTP Status Codes
  - Role-Based Access Control
  - Repository Pattern Architecture
  - Swagger OpenAPI Documentation

  Architecture Flow:
  Request HTTP
  → Middleware
  → Guard
  → Interceptor
  → Pipe + DTO Validation
  → Controller
  → Service
  → Repository
  → PostgreSQL Database
  → Response

  Technologies:
  NestJS • TypeORM • PostgreSQL • JWT • bcrypt • Swagger • TypeScript
  `,
    )
    .setVersion('1.0')
    .addBearerAuth(
      {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
        name: 'JWT Authentication',
        description: `
      Enter JWT token obtained from /auth/signin.

      Example:
      Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...

      Authentication Flow:
      1. User signs in using email and password
      2. Server validates credentials
      3. JWT token is generated and returned
      4. Client sends token in Authorization header
      5. AuthGuard validates JWT signature and expiration
      6. RolesGuard validates user permissions

      Protected Routes:
      - Users
      - Orders
      - Admin Operations
      - Product Management

      Roles Supported:
      - Admin
      - User

      Security:
      - JWT Signature Validation
      - Expiration Verification
      - Role-Based Authorization
      - Protected Endpoints
      `,
        in: 'header',
      },
      'access-token',
    )
    .addTag('e-commerce')
    .build();

  const document = SwaggerModule.createDocument(app, config);

  SwaggerModule.setup('api', app, document, {
    swaggerOptions: {
      persistAuthorization: true,
    },
  });

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
