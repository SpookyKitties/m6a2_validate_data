import { type Request, type Response, type NextFunction } from 'express';
import Loan, { type ILoan } from '../models/loanModel';
import { validateUserAdmin } from './validateUser';

async function getLoans(): Promise<ILoan[]> {
  return await Loan.find({});
}

export const getLoanJSON = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const loans = await getLoans();
    res.json({ loans });
  } catch (err) {
    next(err);
  }
};

export const getLoansJSON = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const loans = await getLoans();
    res.json({ loans });
  } catch (err) {
    next(err);
  }
};

export const getLoansWeb = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const verify = await validateUserAdmin(req.headers.authorization as string);

    if (verify) {
      const loans = await getLoans();

      res.render('loans/index', { loans });
    }
    throw new Error("User either doesn't exist, or isn't and admin");
  } catch (err) {
    next(err);
  }
};

export const getLoanWeb = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Response<any, Record<string, any>> | undefined> => {
  try {
    const loan = await Loan.findById(req.params.id);
    if (loan === null) {
      res.status(404);
      return res.send('Loan not found');
    }
    res.render('loans/show', { loan });
  } catch (err) {
    next(err);
  }
};

export const createLoanWeb = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { amount, interestRate, term, borrower } = req.body;
    const loan = new Loan({
      amount,
      interestRate,
      term,
      borrower
    });
    await loan.save();
    res.redirect('/loans');
  } catch (err) {
    next(err);
  }
};

export const updateLoanWeb = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Response<any, Record<string, any>> | undefined> => {
  try {
    const { amount, interestRate, term, borrower } = req.body;
    const loan = await Loan.findByIdAndUpdate(
      req.params.id,
      { amount, interestRate, term, borrower },
      { new: true, runValidators: true }
    );
    if (loan == null) {
      return res.status(404).send('Loan not found');
    }
    res.redirect(`/loans/${loan._id as number}`);
  } catch (err) {
    next(err);
  }
};

export const deleteLoanWeb = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Response<any, Record<string, any>> | undefined> => {
  try {
    const loan = await Loan.findByIdAndDelete(req.params.id);
    if (loan == null) {
      return res.status(404).send('Loan not found');
    }
    res.redirect('/loans');
  } catch (err) {
    next(err);
  }
};

export const editLoanWeb = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const loan = await Loan.findById(req.params.id);
    res.render('loans/edit', { loan });
  } catch (err) {
    next(err);
  }
};
