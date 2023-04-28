/* eslint-disable @typescript-eslint/no-misused-promises */
import express from 'express';
import {
  createLoanWeb,
  deleteLoanJson,
  deleteLoanWeb,
  getLoanJSON,
  getLoansJSON,
  updateLoanWeb
} from '../controllers/loansController';

const router = express.Router();

// JSON routes
router.get('/', getLoansJSON);
router.get('/:id/delete', deleteLoanJson);
router.get('/:id', getLoanJSON);
router.post('/', createLoanWeb);
router.put('/:id', updateLoanWeb);
router.delete('/:id', deleteLoanWeb);

export default router;
