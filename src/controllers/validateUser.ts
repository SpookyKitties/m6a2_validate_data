import User, { type AccountLevel, type IUser } from '../models/userModel';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
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
