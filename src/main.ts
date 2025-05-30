import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle('Encryption API')
    .setVersion('1.0')
    .build();

  const doc = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api-docs', app, doc);

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
