import express from "express";

import {
  createBankAccountWeb,
  getBankAccountsWeb,
  getBankAccountWeb,
  updateBankAccountWeb,
  deleteBankAccountWeb,
  editBankAccountWeb,
  getBankAccountsJSON,
  getBankAccountJSON,
  createBankAccountJSON,
  updateBankAccountJSON,
  deleteBankAccountJSON,
} from "../controllers/bankAccountController";
const router = express.Router();

// JSON routes
router.get("/", getBankAccountsJSON);
router.get("/:id", getBankAccountJSON);
router.post("/", createBankAccountJSON);
router.put("/:id", updateBankAccountJSON);
router.delete("/:id", deleteBankAccountJSON);

export default router;
