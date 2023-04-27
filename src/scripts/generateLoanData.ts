import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { faker } from '@faker-js/faker';
import fs from 'fs';
import User, { AccountLevel, type IUser } from '../models/userModel';
import Loan from '../models/loanModel';

async function createFakeUsers(count: number): Promise<IUser[]> {
  const users: IUser[] = [];

  for (let i = 0; i < count; i++) {
    try {
      const user = new User({
        username: faker.internet.userName().replace(/[_.]/g, ''),
        password: faker.internet.password(15, false),
        email: faker.internet.email(),
        firstName: faker.name.firstName(),
        lastName: faker.name.lastName(),
        dateOfBirth: faker.date.past(30, new Date(1980, 0, 1)),
        accountLevel: i % 5 === 0 ? AccountLevel.Admin : AccountLevel.Regular
      });

      await user.save();
      users.push(user);
    } catch (error) {
      console.log(error);
      if (i !== 0) {
        i--;
      }
    }
  }

  return users;
}

async function createFakeLoans(
  users: IUser[],
  countPerUser: number
): Promise<void> {
  for (const user of users) {
    for (let i = 0; i < countPerUser; i++) {
      const loan = new Loan({
        amount: faker.datatype.number({ min: 1000, max: 50000 }),
        interestRate: faker.datatype.number({
          min: 1,
          max: 10,
          precision: 0.01
        }),
        term: faker.datatype.number({ min: 12, max: 60 }),
        user: user._id
      });

      await loan.save();
    }
  }
}

void (async function () {
  dotenv.config({ path: './.env.local' });
  const MONGODB_URI =
    process.env.MONGODB_URI !== null
      ? (process.env.MONGODB_URI as string)
      : 'mongodb://localhost:27017/ift458_final';

  try {
    await mongoose.connect(MONGODB_URI, {});
    console.log('Connected to MongoDB');
  } catch (error) {
    console.error('Failed to connect to MongoDB', error);
    return;
  }

  const userCount = 50;
  const loansPerUser = 3;

  const users = await createFakeUsers(userCount);
  await createFakeLoans(users, loansPerUser);

  console.log(
    `Generated ${userCount} users and ${userCount * loansPerUser} loans`
  );

  try {
    const data = {
      users,
      loans: await Loan.find({}).lean()
    };

    const jsonData = JSON.stringify(data, null, 2);
    fs.writeFileSync('fakeData.json', jsonData);
    console.log('Fake data saved to fakeData.json');
  } catch (error) {
    console.error('Failed to save fake data to JSON file', error);
  }

  await mongoose.connection.close();
})();
