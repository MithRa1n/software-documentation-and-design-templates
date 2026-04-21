import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import hbs = require('hbs');
import * as path from 'path';
import { AppModule } from './app.module';
import { CsvSeederService } from './bll/services/csv-seeder.service';
import { TOKENS } from './constants/injection-tokens';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  app.setBaseViewsDir(path.join(process.cwd(), 'views'));
  app.setViewEngine('hbs');
  hbs.registerPartials(path.join(process.cwd(), 'views', 'partials'));

  hbs.registerHelper('eq', (a: unknown, b: unknown) => a === b);
  hbs.registerHelper('statusBadge', (status: string) => {
    const map: Record<string, string> = {
      PENDING: 'warning',
      COMPLETED: 'success',
      FAILED: 'danger',
      REFUNDED: 'secondary',
    };
    return map[status] ?? 'light';
  });
  hbs.registerHelper('shortId', (id: string) => (id ? id.slice(0, 8) : ''));
  hbs.registerHelper('formatDate', (d: Date | string) => {
    if (!d) return '';
    const date = new Date(d);
    return date.toLocaleString();
  });

  const seeder = app.get<CsvSeederService>(TOKENS.CSV_SEEDER);
  await seeder.seed(path.join(process.cwd(), 'data', 'seed.csv'));

  await app.listen(3000);
}

bootstrap();
