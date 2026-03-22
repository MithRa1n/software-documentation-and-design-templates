import { CountryModel } from '../../bll/models';

export interface ICountryController {
    findAll(): Promise<CountryModel[]>;
    findByIsoCode(isoCode: string): Promise<CountryModel | null>;
}
