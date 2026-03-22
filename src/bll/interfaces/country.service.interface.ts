import { CountryModel } from '../models';

export interface ICountryService {
  createCountry(country: CountryModel): Promise<CountryModel>;
  findByIsoCode(isoCode: string): Promise<CountryModel | null>;
  findAll(): Promise<CountryModel[]>;
}
