import { Module } from '@nestjs/common';
import { DalModule } from '../dal/dal.module';
import { UserService } from './services/user.service';
import { UserAccountService } from './services/user-account.service';
import { CountryService } from './services/country.service';
import { PaymentMethodService } from './services/payment-method.service';
import { TransactionService } from './services/transaction.service';
import { CsvSeederService } from './services/csv-seeder.service';
import { TOKENS } from '../constants/injection-tokens';

@Module({
  imports: [DalModule],
  providers: [
    { provide: TOKENS.USER_SERVICE, useClass: UserService },
    { provide: TOKENS.USER_ACCOUNT_SERVICE, useClass: UserAccountService },
    { provide: TOKENS.COUNTRY_SERVICE, useClass: CountryService },
    { provide: TOKENS.PAYMENT_METHOD_SERVICE, useClass: PaymentMethodService },
    { provide: TOKENS.TRANSACTION_SERVICE, useClass: TransactionService },
    { provide: TOKENS.CSV_SEEDER, useClass: CsvSeederService },
  ],
  exports: [
    TOKENS.USER_SERVICE,
    TOKENS.USER_ACCOUNT_SERVICE,
    TOKENS.COUNTRY_SERVICE,
    TOKENS.PAYMENT_METHOD_SERVICE,
    TOKENS.TRANSACTION_SERVICE,
    TOKENS.CSV_SEEDER,
  ],
})
export class BllModule {}
