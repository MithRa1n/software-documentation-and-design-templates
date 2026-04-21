import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Transaction } from '../entities/transaction.entity';
import { TransactionStatus } from '../entities/enums';
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
        return this.repo.findOne({
            where: { id },
            relations: ['userAccount', 'paymentMethod'],
        });
    }

    async findByUserAccountId(userAccountId: string): Promise<Transaction[]> {
        return this.repo.find({
            where: { userAccount: { accountId: userAccountId } },
            relations: ['userAccount', 'paymentMethod'],
        });
    }

    async findAll(): Promise<Transaction[]> {
        return this.repo.find({
            relations: ['userAccount', 'paymentMethod'],
            order: { createdAt: 'DESC' },
        });
    }

    async findByStatus(status: TransactionStatus): Promise<Transaction[]> {
        return this.repo.find({
            where: { status },
            relations: ['userAccount', 'paymentMethod'],
            order: { createdAt: 'DESC' },
        });
    }

    async delete(id: string): Promise<void> {
        await this.repo.delete(id);
    }

    async update(id: string, data: Partial<Transaction>): Promise<Transaction> {
        await this.repo.update(id, data);
        const updated = await this.findById(id);
        if (!updated) {
            throw new Error(`Transaction ${id} not found after update`);
        }
        return updated;
    }
}
