import { faker } from '@faker-js/faker';
import fs from 'fs';

const NUM_BANK_ACCOUNTS = process.argv[2] as unknown as number;

type Transaction = {
  amount: number;
  description: string;
  date: string;
};

type BankAccount = {
  accountNumber: string;
  accountHolder: string;
  balance: number;
  email: string;
  status: string;
  createdAt: string;
  transactions: Transaction[];
};

const bankAccounts: BankAccount[] = [];

for (let i = 0; i < NUM_BANK_ACCOUNTS; i++) {
  const transactions: Array<{
    amount: number;
    description: string;
    date: string;
  }> = [];
  for (let j = 0; j < faker.datatype.number({ min: 1, max: 10 }); j++) {
    transactions.push({
      amount: parseFloat(faker.finance.amount()),
      description: faker.commerce.productName(),
      date: faker.date.recent().toString()
    });
  }

  bankAccounts.push({
    accountNumber: faker.finance.account(),
    accountHolder: faker.name.findName(),
    balance: parseFloat(faker.finance.amount()),
    email: faker.internet.email(),
    status: faker.helpers.arrayElement(['active', 'inactive']),
    createdAt: faker.date.recent().toString(),
    transactions
  });
}

fs.writeFileSync(
  './bankAccounts.json',
  JSON.stringify(bankAccounts, null, 2),
  'utf-8'
);

console.log(`Successfully generated ${NUM_BANK_ACCOUNTS} bank accounts!`);
