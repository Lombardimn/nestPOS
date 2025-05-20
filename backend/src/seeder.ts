/** Montar la sub-aplicación para la carga de datos */

import { NestFactory } from '@nestjs/core';
import { SeederModule } from './seeder/seeder.module';
import { SeederService } from './seeder/seeder.service';

async function bootstrap() {
  const app = await NestFactory.create(SeederModule)
  const seeder = app.get(SeederService)
  
  /** Ejecutar la carga de datos y cierre de la app */
  await seeder.seed()
  await app.close()
}
bootstrap();
