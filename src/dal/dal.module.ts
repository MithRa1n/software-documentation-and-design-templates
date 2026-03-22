import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { UserAccount } from './entities/user-account.entity';
import { PaymentMethod } from './entities/payment-method.entity';
import { CreditCard } from './entities/credit-card.entity';
import { BankAccount } from './entities/bank-account.entity';
import { Country } from './entities/country.entity';
import { Transaction } from './entities/transaction.entity';
import { UserRepository } from './repositories/user.repository';
import { UserAccountRepository } from './repositories/user-account.repository';
import { PaymentMethodRepository } from './repositories/payment-method.repository';
import { CountryRepository } from './repositories/country.repository';
import { TransactionRepository } from './repositories/transaction.repository';
import { CsvReaderService } from './csv/csv-reader.service';
import { TOKENS } from '../constants/injection-tokens';

@Module({
    imports: [
        TypeOrmModule.forFeature([
            User,
            UserAccount,
            PaymentMethod,
            CreditCard,
            BankAccount,
            Country,
            Transaction,
        ]),
    ],
    providers: [
        { provide: TOKENS.USER_REPOSITORY, useClass: UserRepository },
        { provide: TOKENS.USER_ACCOUNT_REPOSITORY, useClass: UserAccountRepository },
        { provide: TOKENS.PAYMENT_METHOD_REPOSITORY, useClass: PaymentMethodRepository },
        { provide: TOKENS.COUNTRY_REPOSITORY, useClass: CountryRepository },
        { provide: TOKENS.TRANSACTION_REPOSITORY, useClass: TransactionRepository },
        { provide: TOKENS.CSV_READER, useClass: CsvReaderService },
    ],
    exports: [
        TOKENS.USER_REPOSITORY,
        TOKENS.USER_ACCOUNT_REPOSITORY,
        TOKENS.PAYMENT_METHOD_REPOSITORY,
        TOKENS.COUNTRY_REPOSITORY,
        TOKENS.TRANSACTION_REPOSITORY,
        TOKENS.CSV_READER,
    ],
})
export class DalModule {}
