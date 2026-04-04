import { createObjectCsvWriter } from 'csv-writer';
import { faker } from '@faker-js/faker';
import * as path from 'path';
import * as fs from 'fs';

const csvWriter = createObjectCsvWriter({
  path: path.join(__dirname, '..', 'data', 'seed.csv'),
  header: [
    { id: 'type', title: 'type' },
    { id: 'id', title: 'id' },
    { id: 'email', title: 'email' },
    { id: 'passwordHash', title: 'passwordHash' },
    { id: 'isEmailVerified', title: 'isEmailVerified' },
    { id: 'userId', title: 'userId' },
    { id: 'balance', title: 'balance' },
    { id: 'currency', title: 'currency' },
    { id: 'accountType', title: 'accountType' },
    { id: 'isDefault', title: 'isDefault' },
    { id: 'status', title: 'status' },
    { id: 'isoCode', title: 'isoCode' },
    { id: 'name', title: 'name' },
    { id: 'maskedCardNumber', title: 'maskedCardNumber' },
    { id: 'cardHolderName', title: 'cardHolderName' },
    { id: 'expirationMonth', title: 'expirationMonth' },
    { id: 'expirationYear', title: 'expirationYear' },
    { id: 'paymentToken', title: 'paymentToken' },
    { id: 'iban', title: 'iban' },
    { id: 'bankName', title: 'bankName' },
    { id: 'swiftCode', title: 'swiftCode' },
    { id: 'userAccountId', title: 'userAccountId' },
    { id: 'paymentMethodId', title: 'paymentMethodId' },
    { id: 'amount', title: 'amount' },
  ],
});

const createEmptyRow = (): Record<string, string> => ({
  type: '',
  id: '',
  email: '',
  passwordHash: '',
  isEmailVerified: '',
  userId: '',
  balance: '',
  currency: '',
  accountType: '',
  isDefault: '',
  status: '',
  isoCode: '',
  name: '',
  maskedCardNumber: '',
  cardHolderName: '',
  expirationMonth: '',
  expirationYear: '',
  paymentToken: '',
  iban: '',
  bankName: '',
  swiftCode: '',
  userAccountId: '',
  paymentMethodId: '',
  amount: '',
});

const records: Record<string, string>[] = [];

const countryIds: string[] = [];
const userIds: string[] = [];
const accountIds: string[] = [];
const methodIds: string[] = [];

const currencies = ['USD', 'EUR', 'GBP', 'UAH', 'PLN'];
const isoCodes = [
  'US',
  'UA',
  'GB',
  'PL',
  'DE',
  'FR',
  'IT',
  'ES',
  'CA',
  'AU',
  'JP',
  'CN',
  'BR',
  'MX',
  'IN',
  'KR',
  'SE',
  'NO',
  'CH',
  'NL',
  'BE',
  'AT',
  'PT',
  'CZ',
  'HU',
  'RO',
  'BG',
  'HR',
  'SK',
  'SI',
];

for (let i = 0; i < 30; i++) {
  const id = faker.string.uuid();
  countryIds.push(id);
  records.push({
    ...createEmptyRow(),
    type: 'COUNTRY',
    id,
    isoCode: isoCodes[i],
    name: faker.location.country(),
    currency: currencies[Math.floor(Math.random() * currencies.length)],
  });
}

// Generate users
for (let i = 0; i < 100; i++) {
  const id = faker.string.uuid();
  userIds.push(id);
  records.push({
    ...createEmptyRow(),
    type: 'USER',
    id,
    email: faker.internet.email(),
    passwordHash: faker.string.alphanumeric(60),
    isEmailVerified: faker.datatype.boolean().toString(),
  });
}

for (let i = 0; i < 100; i++) {
  const id = faker.string.uuid();
  accountIds.push(id);
  records.push({
    ...createEmptyRow(),
    type: 'USER_ACCOUNT',
    id,
    userId: userIds[i],
    balance: faker.finance.amount({ min: 0, max: 10000 }),
    currency: currencies[Math.floor(Math.random() * currencies.length)],
    accountType: Math.random() > 0.5 ? 'PERSONAL' : 'BUSINESS',
  });
}

for (let i = 0; i < 200; i++) {
  const id = faker.string.uuid();
  methodIds.push(id);
  records.push({
    ...createEmptyRow(),
    type: 'CREDIT_CARD',
    id,
    userId: userIds[Math.floor(Math.random() * userIds.length)],
    isDefault: faker.datatype.boolean().toString(),
    status: 'ACTIVE',
    maskedCardNumber: `**** **** **** ${faker.finance.creditCardNumber('####')}`,
    cardHolderName: faker.person.fullName(),
    expirationMonth: faker.number.int({ min: 1, max: 12 }).toString(),
    expirationYear: faker.number.int({ min: 2025, max: 2030 }).toString(),
    paymentToken: faker.string.uuid(),
  });
}

for (let i = 0; i < 100; i++) {
  const id = faker.string.uuid();
  methodIds.push(id);
  records.push({
    ...createEmptyRow(),
    type: 'BANK_ACCOUNT',
    id,
    userId: userIds[Math.floor(Math.random() * userIds.length)],
    isDefault: faker.datatype.boolean().toString(),
    status: 'ACTIVE',
    iban: faker.finance.iban(),
    bankName: faker.company.name(),
    swiftCode: faker.finance.bic(),
  });
}

for (let i = 0; i < 500; i++) {
  records.push({
    ...createEmptyRow(),
    type: 'TRANSACTION',
    id: faker.string.uuid(),
    userAccountId: accountIds[Math.floor(Math.random() * accountIds.length)],
    paymentMethodId: methodIds[Math.floor(Math.random() * methodIds.length)],
    amount: faker.finance.amount({ min: 1, max: 5000 }),
    status: ['PENDING', 'COMPLETED', 'FAILED', 'REFUNDED'][
      Math.floor(Math.random() * 4)
    ],
  });
}

if (!fs.existsSync(path.join(__dirname, '..', 'data'))) {
  fs.mkdirSync(path.join(__dirname, '..', 'data'));
}

csvWriter.writeRecords(records).then(() => {
  console.log(`Generated ${records.length} rows`);
});
