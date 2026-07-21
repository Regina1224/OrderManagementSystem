import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // dto decorator effective
  app.useGlobalPipes(new ValidationPipe());

  // Cross-Origin Resource Sharing
  // Tell NestJS "Allow other sources to access my interface"
  app.enableCors();

  const config = new DocumentBuilder()
    .setTitle('Order Management API')
    .setDescription('Order Management system Interface document')
    .setVersion('1.0')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api-docs', app, document);

  await app.listen(process.env.PORT ?? 5001);
  console.log('Application is running on: http://localhost:5001');
}
bootstrap().catch((err) => {
  console.error('Application failed to start:', err);
  process.exit(1);
});
