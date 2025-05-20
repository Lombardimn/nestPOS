import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';

async function bootstrap() {
  /** Crear la instancia de la app - El tipado del genérico permite acceder a las propiedades de Express */
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  /** Pipes de forma global */
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
    })
  );

  /** Configuración de archivos estáticos */
  app.useStaticAssets(join(__dirname, '..', '/public'));
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
