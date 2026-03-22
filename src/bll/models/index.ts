import {
  AccountType,
  PaymentStatus,
  PaymentMethodType,
  TransactionStatus,
} from '../../dal/entities/enums';

export interface UserModel {
  id?: string;
  email: string;
  passwordHash: string;
  isEmailVerified: boolean;
  createdAt?: Date;
}

export interface UserAccountModel {
  accountId?: string;
  balance: number;
  currency: string;
  accountType: AccountType;
}

export interface PaymentMethodModel {
  id?: string;
  isDefault: boolean;
  status: PaymentStatus;
  type: PaymentMethodType;
  addedAt?: Date;
}

export interface CreditCardModel {
  id?: string;
  maskedCardNumber: string;
  cardHolderName: string;
  expirationMonth: number;
  expirationYear: number;
  paymentToken: string;
  countryIsoCode: string;
}

export interface BankAccountModel {
  id?: string;
  iban: string;
  bankName: string;
  swiftCode: string;
}

export interface CountryModel {
  id?: string;
  isoCode: string;
  name: string;
  currency: string;
}

export interface TransactionModel {
  id?: string;
  amount: number;
  status: TransactionStatus;
  createdAt?: Date;
}
