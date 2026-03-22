import { TransactionModel } from '../models';

export interface ITransactionService {
  createTransaction(
    transaction: TransactionModel,
    userAccountId: string,
    paymentMethodId: string,
  ): Promise<TransactionModel>;
  findByUserAccountId(userAccountId: string): Promise<TransactionModel[]>;
}
