/* eslint-disable @typescript-eslint/no-misused-promises */
import express from 'express';

import {
  createLoanWeb,
  deleteLoanWeb,
  editLoanWeb,
  getLoanWeb,
  getLoansWeb,
  updateLoanWeb
} from '../controllers/loansController';
import { realValidateUser } from '../controllers/validateUser';
const router = express.Router();

// Web routes
router.get('/', getLoansWeb);
router.get('/new', async (_req, res) => {
  const token = _req.cookies.token as string;

  const verify = await realValidateUser(token);

  res.render('loans/new', { userID: verify?.user._id });
});
router.post('/create', createLoanWeb);
router.get('/:id/edit', editLoanWeb);
router.get('/:id/delete', deleteLoanWeb);
router.get('/:id', getLoanWeb);
router.put('/:id', updateLoanWeb);
router.delete('/:id', deleteLoanWeb);

export default router;
