import { TransactionModel } from '../models';
import { TransactionStatus } from '../../dal/entities/enums';

export interface ITransactionService {
  createTransaction(
    transaction: TransactionModel,
    userAccountId: string,
    paymentMethodId: string,
  ): Promise<TransactionModel>;
  findByUserAccountId(userAccountId: string): Promise<TransactionModel[]>;
  findAll(): Promise<TransactionModel[]>;
  findById(id: string): Promise<TransactionModel | null>;
  findByStatus(status: TransactionStatus): Promise<TransactionModel[]>;
  delete(id: string): Promise<void>;
  update(id: string, data: Partial<TransactionModel>): Promise<TransactionModel>;
}
