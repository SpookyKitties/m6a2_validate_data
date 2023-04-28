/* eslint-disable @typescript-eslint/no-misused-promises */
import express from 'express';

import { faker } from '@faker-js/faker';
import {
  createLoanWeb,
  deleteLoanWeb,
  editLoanWeb,
  getLoanWeb,
  getLoansWeb,
  updateLoanWeb
} from '../controllers/loansController';
const router = express.Router();

// Web routes
router.get('/', getLoansWeb);
router.get('/new', (_req, res) => {
  res.render('loans/new', { faker });
});
router.get('/:id/edit', editLoanWeb);
router.post('/', createLoanWeb);
router.get('/:id', getLoanWeb);
router.put('/:id', updateLoanWeb);
router.delete('/:id', deleteLoanWeb);

export default router;
