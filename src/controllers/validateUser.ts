import User, { AccountLevel } from '../models/userModel';
import jwt from 'jsonwebtoken';

export async function validateUser(token: string): Promise<boolean> {
  try {
    const verify = jwt.verify(token, process.env.SECRET as string);
    const user = await User.findById((verify as any)._id as string);

    const val = user?.accountLevel === AccountLevel.Admin;
    return val;
  } catch (error) {
    return false;
  }
}
