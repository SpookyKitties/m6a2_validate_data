import mongoose, { Schema, type Document, type CallbackError } from 'mongoose';
import validator from 'validator';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

const SALT_ROUNDS = 10;

export enum AccountLevel {
  Admin = 'admin',
  Regular = 'regular'
}
export type IUserMethods = {
  comparePassword: (password: string) => Promise<boolean>;

  generateAuthToken: () => Promise<string>;
};
export type IUser = {
  username: string;
  password: string;
  email: string;
  firstName: string;
  lastName: string;
  dateOfBirth: Date;
  accountLevel: AccountLevel;
} & Document &
  IUserMethods;

const UserSchema: Schema = new Schema({
  username: {
    type: String,
    required: [true, 'Username is required'],
    unique: true,
    validate: {
      validator: (value: string) => validator.isAlphanumeric(value),
      message: 'Username can only contain letters and numbers'
    }
  },
  password: {
    type: String,
    required: [true, 'Password is required'],
    minlength: [8, 'Password must be at least 8 characters long']
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
    validate: {
      validator: (value: string) => validator.isEmail(value),
      message: 'Invalid email format'
    }
  },
  firstName: { type: String, required: [true, 'First name is required'] },
  lastName: { type: String, required: [true, 'Last name is required'] },
  dateOfBirth: { type: Date, required: [true, 'Date of birth is required'] },
  accountLevel: {
    type: String,
    enum: Object.values(AccountLevel),
    default: AccountLevel.Regular,
    required: true
  }
});

UserSchema.pre<IUser>('save', async function (next) {
  if (!this.isModified('password')) {
    next();
    return;
  }

  try {
    const salt = await bcrypt.genSalt(SALT_ROUNDS);
    const hash = await bcrypt.hash(this.password, salt);
    this.password = hash;
    next();
    return;
  } catch (error) {
    next(error as CallbackError);
  }
});

UserSchema.methods.comparePassword = async function (
  password: string
): Promise<boolean> {
  try {
    return await bcrypt.compare(password, this.password);
  } catch (error) {
    throw new Error('Passwords do not match.');
  }
};

UserSchema.methods.generateAuthToken = async function () {
  try {
    dotenv.config({ path: './.env.local' });
    const token = jwt.sign({ _id: this._id }, process.env.SECRET as string);

    // this.tokens = this.tokens.concat({ token });
    await this.save;
    console.log(`Token: ${token}`);
    return token;
  } catch (error) {
    console.log(`Error ${error as string}`);
  }
};
export default mongoose.model<IUser>('User', UserSchema);
