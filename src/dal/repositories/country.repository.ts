import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Country } from '../entities/country.entity';
import { ICountryRepository } from '../interfaces/country.repository.interface';

@Injectable()
export class CountryRepository implements ICountryRepository {
    constructor(
        @InjectRepository(Country)
        private readonly repo: Repository<Country>,
    ) {}

    async create(country: Partial<Country>): Promise<Country> {
        return this.repo.save(this.repo.create(country));
    }

    async findById(id: string): Promise<Country | null> {
        return this.repo.findOne({ where: { id } });
    }

    async findByIsoCode(isoCode: string): Promise<Country | null> {
        return this.repo.findOne({ where: { isoCode } });
    }

    async findAll(): Promise<Country[]> {
        return this.repo.find();
    }
}
