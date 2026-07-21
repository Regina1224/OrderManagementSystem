import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
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
bootstrap();
