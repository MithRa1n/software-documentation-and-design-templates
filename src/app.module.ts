import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { DalModule } from './dal/dal.module';
import { BllModule } from './bll/bll.module';
import { PlModule } from './pl/pl.module';
import { User } from './dal/entities/user.entity';
import { UserAccount } from './dal/entities/user-account.entity';
import { PaymentMethod } from './dal/entities/payment-method.entity';
import { CreditCard } from './dal/entities/credit-card.entity';
import { BankAccount } from './dal/entities/bank-account.entity';
import { Country } from './dal/entities/country.entity';
import { Transaction } from './dal/entities/transaction.entity';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST || 'localhost',
      port: parseInt(process.env.DB_PORT ?? '5432') || 5432,
      username: process.env.DB_USERNAME || 'paypal',
      password: process.env.DB_PASSWORD || 'paypal',
      database: process.env.DB_NAME || 'paypal',
      entities: [User, UserAccount, PaymentMethod, CreditCard, BankAccount, Country, Transaction],
      synchronize: true,
    }),
    DalModule,
    BllModule,
    PlModule,
  ],
})
export class AppModule {}
