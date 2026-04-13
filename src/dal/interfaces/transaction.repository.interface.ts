import { Transaction } from '../entities/transaction.entity';
import { TransactionStatus } from '../entities/enums';

export interface ITransactionRepository {
  create(transaction: Partial<Transaction>): Promise<Transaction>;
  findById(id: string): Promise<Transaction | null>;
  findByUserAccountId(userAccountId: string): Promise<Transaction[]>;
  findAll(): Promise<Transaction[]>;
  findByStatus(status: TransactionStatus): Promise<Transaction[]>;
  delete(id: string): Promise<void>;
  update(id: string, data: Partial<Transaction>): Promise<Transaction>;
}
