import { Transaction } from '../entities/transaction.entity';

export interface ITransactionRepository {
  create(transaction: Partial<Transaction>): Promise<Transaction>;
  findById(id: string): Promise<Transaction | null>;
  findByUserAccountId(userAccountId: string): Promise<Transaction[]>;
}
