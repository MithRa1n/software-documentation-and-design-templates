import { Inject, Injectable } from '@nestjs/common';
import type { ITransactionRepository } from '../../dal/interfaces/transaction.repository.interface';
import type { IUserAccountRepository } from '../../dal/interfaces/user-account.repository.interface';
import type { IPaymentMethodRepository } from '../../dal/interfaces/payment-method.repository.interface';
import type { ITransactionService } from '../interfaces/transaction.service.interface';
import { TransactionModel } from '../models';
import { TransactionStatus } from '../../dal/entities/enums';
import { TOKENS } from '../../constants/injection-tokens';

@Injectable()
export class TransactionService implements ITransactionService {
  constructor(
    @Inject(TOKENS.TRANSACTION_REPOSITORY)
    private readonly transactionRepo: ITransactionRepository,
    @Inject(TOKENS.USER_ACCOUNT_REPOSITORY)
    private readonly accountRepo: IUserAccountRepository,
    @Inject(TOKENS.PAYMENT_METHOD_REPOSITORY)
    private readonly methodRepo: IPaymentMethodRepository,
  ) {}

  async createTransaction(
    transaction: TransactionModel,
    userAccountId: string,
    paymentMethodId: string,
  ): Promise<TransactionModel> {
    const userAccount = await this.accountRepo.findById(userAccountId);
    const paymentMethod = await this.methodRepo.findById(paymentMethodId);
    return this.transactionRepo.create({
      ...transaction,
      userAccount: userAccount || undefined,
      paymentMethod: paymentMethod || undefined,
    });
  }

  async findByUserAccountId(
    userAccountId: string,
  ): Promise<TransactionModel[]> {
    return this.transactionRepo.findByUserAccountId(userAccountId);
  }

  async findAll(): Promise<TransactionModel[]> {
    return this.transactionRepo.findAll();
  }

  async findById(id: string): Promise<TransactionModel | null> {
    return this.transactionRepo.findById(id);
  }

  async findByStatus(status: TransactionStatus): Promise<TransactionModel[]> {
    return this.transactionRepo.findByStatus(status);
  }

  async delete(id: string): Promise<void> {
    await this.transactionRepo.delete(id);
  }

  async update(
    id: string,
    data: Partial<TransactionModel>,
  ): Promise<TransactionModel> {
    return this.transactionRepo.update(id, data);
  }
}
