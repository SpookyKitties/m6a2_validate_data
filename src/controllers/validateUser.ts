import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
import User, { AccountLevel, type IUser } from '../models/userModel';
dotenv.config({ path: './.env.local' });

export async function realValidateUser(
  token: string
): Promise<{ accountLevel: AccountLevel; user: IUser } | undefined> {
  try {
    const verify = jwt.verify(token, process.env.SECRET as string);

    const user = (await User.findById((verify as any)._id as string)) as IUser;
    return { accountLevel: user?.accountLevel, user };
  } catch (error) {
    return undefined;
  }
}

export async function isAdmin(token: string): Promise<boolean> {
  try {
    const verify = jwt.verify(token, process.env.SECRET as string);

    const user = await User.findById((verify as any)?._id as string);

    return user?.accountLevel === AccountLevel.Admin;
  } catch {
    return false;
  }
}
