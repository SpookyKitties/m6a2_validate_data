/* eslint-disable @typescript-eslint/no-misused-promises */
import express from 'express';

import {
  createBankAccountWeb,
  getBankAccountsWeb,
  getBankAccountWeb,
  updateBankAccountWeb,
  deleteBankAccountWeb,
  editBankAccountWeb
} from '../controllers/bankAccountController';
import { faker } from '@faker-js/faker';
const router = express.Router();

// Web routes
router.get('/', getBankAccountsWeb);
router.get('/new', (_req, res) => {
  res.render('bankAccounts/new', { faker });
});
router.post('/', createBankAccountWeb);
router.get('/:id', getBankAccountWeb);
router.get('/:id/edit', editBankAccountWeb);
router.put('/:id', updateBankAccountWeb);
router.delete('/:id', deleteBankAccountWeb);

export default router;
