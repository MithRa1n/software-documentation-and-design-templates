import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Transaction } from '../entities/transaction.entity';
import { ITransactionRepository } from '../interfaces/transaction.repository.interface';

@Injectable()
export class TransactionRepository implements ITransactionRepository {
    constructor(
        @InjectRepository(Transaction)
        private readonly repo: Repository<Transaction>,
    ) {}

    async create(transaction: Partial<Transaction>): Promise<Transaction> {
        return this.repo.save(this.repo.create(transaction));
    }

    async findById(id: string): Promise<Transaction | null> {
        return this.repo.findOne({ where: { id } });
    }

    async findByUserAccountId(userAccountId: string): Promise<Transaction[]> {
        return this.repo.find({ where: { userAccount: { accountId: userAccountId } } });
    }
}
