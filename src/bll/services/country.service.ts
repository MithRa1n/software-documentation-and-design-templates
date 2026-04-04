import { Inject, Injectable } from '@nestjs/common';
import type { ICountryRepository } from '../../dal/interfaces/country.repository.interface';
import { ICountryService } from '../interfaces/country.service.interface';
import { CountryModel } from '../models';
import { TOKENS } from '../../constants/injection-tokens';

@Injectable()
export class CountryService implements ICountryService {
  constructor(
    @Inject(TOKENS.COUNTRY_REPOSITORY)
    private readonly countryRepo: ICountryRepository,
  ) {}

  async createCountry(country: CountryModel): Promise<CountryModel> {
    return this.countryRepo.create(country);
  }

  async findByIsoCode(isoCode: string): Promise<CountryModel | null> {
    return this.countryRepo.findByIsoCode(isoCode);
  }

  async findAll(): Promise<CountryModel[]> {
    return this.countryRepo.findAll();
  }
}
