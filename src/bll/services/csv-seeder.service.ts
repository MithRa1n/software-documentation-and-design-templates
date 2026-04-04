import { Inject, Injectable } from '@nestjs/common';
import type { ICsvSeeder } from '../interfaces/csv-seeder.interface';
import type { ICsvReader } from '../../dal/interfaces/csv-reader.interface';
import type { IUserRepository } from '../../dal/interfaces/user.repository.interface';
import type { IUserAccountRepository } from '../../dal/interfaces/user-account.repository.interface';
import type { IPaymentMethodRepository } from '../../dal/interfaces/payment-method.repository.interface';
import type { ICountryRepository } from '../../dal/interfaces/country.repository.interface';
import type { ITransactionRepository } from '../../dal/interfaces/transaction.repository.interface';
import { TOKENS } from '../../constants/injection-tokens';
import {
  AccountType,
  PaymentMethodType,
  PaymentStatus,
  TransactionStatus,
} from '../../dal/entities/enums';

@Injectable()
export class CsvSeederService implements ICsvSeeder {
  constructor(
    @Inject(TOKENS.CSV_READER) private readonly csvReader: ICsvReader,
    @Inject(TOKENS.USER_REPOSITORY) private readonly userRepo: IUserRepository,
    @Inject(TOKENS.USER_ACCOUNT_REPOSITORY)
    private readonly accountRepo: IUserAccountRepository,
    @Inject(TOKENS.PAYMENT_METHOD_REPOSITORY)
    private readonly methodRepo: IPaymentMethodRepository,
    @Inject(TOKENS.COUNTRY_REPOSITORY)
    private readonly countryRepo: ICountryRepository,
    @Inject(TOKENS.TRANSACTION_REPOSITORY)
    private readonly transactionRepo: ITransactionRepository,
  ) {}

  async seed(filePath: string): Promise<void> {
    const rows = await this.csvReader.read(filePath);

    const countryRows = rows.filter((r) => r.type === 'COUNTRY');
    const userRows = rows.filter((r) => r.type === 'USER');
    const accountRows = rows.filter((r) => r.type === 'USER_ACCOUNT');
    const creditCardRows = rows.filter((r) => r.type === 'CREDIT_CARD');
    const bankAccountRows = rows.filter((r) => r.type === 'BANK_ACCOUNT');
    const transactionRows = rows.filter((r) => r.type === 'TRANSACTION');

    for (const row of countryRows) {
      const existing = await this.countryRepo.findByIsoCode(row.isoCode);
      if (!existing) {
        await this.countryRepo.create({
          id: row.id,
          isoCode: row.isoCode,
          name: row.name,
          currency: row.currency,
        });
      }
    }

    for (const row of userRows) {
      const existing = await this.userRepo.findByEmail(row.email);
      if (!existing) {
        await this.userRepo.create({
          id: row.id,
          email: row.email,
          passwordHash: row.passwordHash,
          isEmailVerified: row.isEmailVerified === 'true',
        });
      }
    }

    for (const row of accountRows) {
      const user = await this.userRepo.findById(row.userId);
      if (user) {
        await this.accountRepo.create({
          accountId: row.id,
          balance: parseFloat(row.balance),
          currency: row.currency,
          accountType: row.accountType as AccountType,
          user,
        });
      }
    }

    for (const row of creditCardRows) {
      const user = await this.userRepo.findById(row.userId);
      if (user) {
        await this.methodRepo.create({
          id: row.id,
          isDefault: row.isDefault === 'true',
          status: row.status as PaymentStatus,
          type: PaymentMethodType.CREDIT_CARD,
          user,
        });
      }
    }

    for (const row of bankAccountRows) {
      const user = await this.userRepo.findById(row.userId);
      if (user) {
        await this.methodRepo.create({
          id: row.id,
          isDefault: row.isDefault === 'true',
          status: row.status as PaymentStatus,
          type: PaymentMethodType.BANK_ACCOUNT,
          user,
        });
      }
    }

    for (const row of transactionRows) {
      const userAccount = await this.accountRepo.findById(row.userAccountId);
      const paymentMethod = await this.methodRepo.findById(row.paymentMethodId);
      if (userAccount && paymentMethod) {
        await this.transactionRepo.create({
          id: row.id,
          amount: parseFloat(row.amount),
          status: row.status as TransactionStatus,
          userAccount,
          paymentMethod,
        });
      }
    }
  }
}
