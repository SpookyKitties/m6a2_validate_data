import mongoose, { Schema, Document } from "mongoose";

const BankAccountSchema: Schema = new Schema({
  accountNumber: {
    type: String,
    required: true,
    unique: true,
    minlength: 6,
    maxlength: 20,
    range: {
      min: 10000000,
      max: 20000000,
    },
  },
  accountHolder: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 50,
  },
  balance: {
    type: Number,
    required: true,
    min: 0,
    max: 9999999,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    minlength: 5,
    maxlength: 50,
    validate: {
      validator: (value: any) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value),
      message: (props: any) => `${props.value} is no a valid email address`,
    },
  },
  status: {
    type: String,
    enum: ["active", "inactive"],
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
  transactions: [
    {
      amount: {
        type: Number,
        required: true,
        min: 0,
        max: 9999999,
      },
      description: {
        type: String,
        required: true,
        minlength: 1,
        maxlength: 100,
      },
      date: {
        type: Date,
        default: Date.now,
      },
    },
  ],
});

export default mongoose.model<Document>("BankAccount", BankAccountSchema);
