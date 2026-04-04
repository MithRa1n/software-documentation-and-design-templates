import { Injectable } from '@nestjs/common';
import { parse } from 'csv-parse/sync';
import * as fs from 'fs';
import { ICsvReader } from '../interfaces/csv-reader.interface';

@Injectable()
export class CsvReaderService implements ICsvReader {
    read(filePath: string): Promise<Record<string, string>[]> {
        const content = fs.readFileSync(filePath, 'utf-8');
        const records = parse(content, {
            columns: true,
            skip_empty_lines: true,
        }) as Record<string, string>[];
        return Promise.resolve(records);
    }
}
