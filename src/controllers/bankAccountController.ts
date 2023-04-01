import { Request, Response } from "express";
import BankAccount from "../models/bankAccountModel";

export const getBankAccounts = async (req: Request, res: Response) => {
  try {
    const bankAccounts = await BankAccount.find({});
    res.render("bankAccounts/index", { bankAccounts });
  } catch (err) {
    console.error(err);
    res.status(500).send("Server Error");
  }
};

export const getBankAccount = async (req: Request, res: Response) => {
  try {
    const bankAccount = await BankAccount.findById(req.params.id);
    if (!bankAccount) {
      return res.status(404).send("Bank Account not found");
    }
    res.render("bankAccounts/show", { bankAccount });
  } catch (err) {
    console.error(err);
    res.status(500).send("Server Error");
  }
};

export const createBankAccount = async (req: Request, res: Response) => {
  try {
    const { accountNumber, accountHolder, balance, email, status } = req.body;
    const bankAccount = new BankAccount({
      accountNumber,
      accountHolder,
      balance,
      email,
      status,
    });
    await bankAccount.save();
    res.redirect("/bank-accounts");
  } catch (err) {
    console.error(err);
    res.status(500).send("Server Error");
  }
};

export const updateBankAccount = async (req: Request, res: Response) => {
  try {
    const { accountNumber, accountHolder, balance, email, status } = req.body;
    const bankAccount = await BankAccount.findByIdAndUpdate(
      req.params.id,
      { accountNumber, accountHolder, balance, email, status },
      { new: true, runValidators: true }
    );
    if (!bankAccount) {
      return res.status(404).send("Bank Account not found");
    }
    res.redirect(`/bank-accounts/${bankAccount._id}`);
  } catch (err) {
    console.error(err);
    res.status(500).send("Server Error");
  }
};

export const deleteBankAccount = async (req: Request, res: Response) => {
  try {
    const bankAccount = await BankAccount.findByIdAndDelete(req.params.id);
    if (!bankAccount) {
      return res.status(404).send("Bank Account not found");
    }
    res.redirect("/bank-accounts");
  } catch (err) {
    console.error(err);
    res.status(500).send("Server Error");
  }
};
