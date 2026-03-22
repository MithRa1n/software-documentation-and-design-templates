import { Country } from '../entities/country.entity';

export interface ICountryRepository {
  create(country: Partial<Country>): Promise<Country>;
  findById(id: string): Promise<Country | null>;
  findByIsoCode(isoCode: string): Promise<Country | null>;
  findAll(): Promise<Country[]>;
}
