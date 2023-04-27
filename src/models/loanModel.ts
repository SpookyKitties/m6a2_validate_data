import mongoose, { Schema, type Document } from 'mongoose';
import { type IUser } from './userModel';

export type ILoan = {
  amount: number;
  interestRate: number;
  term: number;
  user: IUser['_id'];
} & Document;

const LoanSchema: Schema = new Schema({
  amount: { type: Number, required: true },
  interestRate: { type: Number, required: true },
  term: { type: Number, required: true },
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true }
});

export default mongoose.model<ILoan>('Loan', LoanSchema);
