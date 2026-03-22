import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserAccount } from '../entities/user-account.entity';
import { IUserAccountRepository } from '../interfaces/user-account.repository.interface';

@Injectable()
export class UserAccountRepository implements IUserAccountRepository {
    constructor(
        @InjectRepository(UserAccount)
        private readonly repo: Repository<UserAccount>,
    ) {}

    async create(account: Partial<UserAccount>): Promise<UserAccount> {
        return this.repo.save(this.repo.create(account));
    }

    async findById(id: string): Promise<UserAccount | null> {
        return this.repo.findOne({ where: { accountId: id } });
    }

    async findByUserId(userId: string): Promise<UserAccount | null> {
        return this.repo.findOne({ where: { user: { id: userId } } });
    }

    async updateBalance(id: string, balance: number): Promise<void> {
        await this.repo.update({ accountId: id }, { balance });
    }
}
