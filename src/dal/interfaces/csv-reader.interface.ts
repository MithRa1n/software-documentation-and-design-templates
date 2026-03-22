export interface ICsvReader {
  read(filePath: string): Promise<Record<string, string>[]>;
}
