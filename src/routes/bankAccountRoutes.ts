import express from "express";

import BankAccount from "../models/bankAccountModel";
const router = express.Router();

// Index
router.get("/", async (req, res) => {
  try {
    const bankAccounts = await BankAccount.find({});
    res.render("bankAccounts/index", { bankAccounts });
  } catch (error) {
    console.error(error);
    res.redirect("/bankAccounts");
  }
});

// New
router.get("/new", (req, res) => {
  res.render("bankAccounts/new");
});

// Create
router.post("/", async (req, res) => {
  try {
    const { accountNumber, accountHolder, balance, email, status } = req.body;

    await BankAccount.create({
      accountNumber: accountNumber,
      accountHolder: accountHolder,
      balance: balance,
      email: email,
      status: status,
    });
    res.redirect("/bankAccounts");
  } catch (error) {
    console.error(error);
    res.redirect("/bankAccounts/new");
  }
});

// Show
router.get("/:id", async (req, res) => {
  try {
    const bankAccount = await BankAccount.findById(req.params.id);
    res.render("bankAccounts/show", { bankAccount });
  } catch (error) {
    console.error(error);
    res.redirect("/bankAccounts");
  }
});

// Edit
router.get("/:id/edit", async (req, res) => {
  try {
    const bankAccount = await BankAccount.findById(req.params.id);
    res.render("bankAccounts/edit", { bankAccount });
  } catch (error) {
    console.error(error);
    res.redirect("/bankAccounts");
  }
});

// Update
router.post("/:id", async (req, res) => {
  const { accountNumber, accountHolder, balance, email, status } = req.body;

  try {
    await BankAccount.findByIdAndUpdate(req.params.id, {
      accountNumber: accountNumber,
      accountHolder: accountHolder,
      balance: balance,
      email: email,
      status: status,
    });
    res.redirect(`/bankAccounts/${req.params.id}`);
  } catch (error) {
    console.error(error);
    res.redirect(`/bankAccounts/${req.params.id}/edit`);
  }
});

// Delete
router.delete("/:id", async (req, res) => {
  try {
    await BankAccount.findByIdAndRemove(req.params.id);
    res.redirect("/bankAccounts");
  } catch (error) {
    console.error(error);
    res.redirect("/bankAccounts");
  }
});

export default router;
