import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { CsvSeederService } from './bll/services/csv-seeder.service';
import { TOKENS } from './constants/injection-tokens';
import * as path from 'path';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const seeder = app.get<CsvSeederService>(TOKENS.CSV_SEEDER);
  await seeder.seed(path.join(process.cwd(), 'data', 'seed.csv'));

  await app.listen(3000);
}

bootstrap();
