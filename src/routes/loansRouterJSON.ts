/* eslint-disable @typescript-eslint/no-misused-promises */
import express from 'express';
import {
  createLoanWeb,
  deleteLoanWeb,
  getLoansJSON,
  updateLoanWeb,
  getLoanJSON
} from '../controllers/loansController';

const router = express.Router();

// JSON routes
router.get('/', getLoanJSON);
router.get('/:id', getLoansJSON);
router.post('/', createLoanWeb);
router.put('/:id', updateLoanWeb);
router.delete('/:id', deleteLoanWeb);

export default router;
