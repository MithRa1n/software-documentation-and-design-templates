import Redis from 'ioredis';
import { IOutputStrategy } from '../interfaces/output-strategy.interface';

export class RedisStrategy implements IOutputStrategy {
  private readonly client: Redis;

  constructor(host: string, port: number) {
    this.client = new Redis({
      host,
      port,
      lazyConnect: true,
      maxRetriesPerRequest: 1,
    });
  }

  async output(data: Record<string, string>[]): Promise<void> {
    try {
      await this.client.connect();
      const pipeline = this.client.pipeline();
      for (const row of data) {
        const key = `air-quality:${row['State Code'] ?? ''}:${row['Site Num'] ?? ''}:${row['Parameter Code'] ?? ''}`;
        pipeline.hset(key, row);
      }
      await pipeline.exec();
      console.log(`[RedisStrategy] Stored ${data.length} hashes`);
    } catch (err) {
      console.error('[RedisStrategy] Failed to store data:', (err as Error).message);
    } finally {
      await this.client.quit().catch(() => undefined);
    }
  }
}
