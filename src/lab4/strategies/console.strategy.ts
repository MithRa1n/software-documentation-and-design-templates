import { IOutputStrategy } from '../interfaces/output-strategy.interface';

export class ConsoleStrategy implements IOutputStrategy {
  async output(data: Record<string, string>[]): Promise<void> {
    for (const row of data) {
      const parameter = row['Parameter Name'] ?? '';
      const year = row['Year'] ?? '';
      const units = row['Units of Measure'] ?? '';
      const observations = row['Observation Count'] ?? '';
      console.log(
        `[AirQuality] ${parameter} | year=${year} | units=${units} | observations=${observations}`,
      );
    }
  }
}
