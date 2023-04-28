import { type NextFunction, type Request, type Response } from 'express';
import Loan, { type ILoan } from '../models/loanModel';
import { AccountLevel } from '../models/userModel';
import { isAdmin, realValidateUser } from './validateUser';
async function getLoans(): Promise<ILoan[]> {
  return await Loan.find({});
}

export const getLoanJSON = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const token = req.cookies.token as string;
    const user = await realValidateUser(token);
    if (user?.user !== undefined) {
      const loan = await Loan.findById(req.body.id as string);

      res.json({ loan: [loan] });
    } else {
      res.redirect('/loans');
    }
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
    const token = req.headers.token as string;
    const user = await realValidateUser(token);
    console.log(user);

    if (user?.accountLevel === AccountLevel.Admin) {
      const loans = await getLoans();

      res.json({ loans });
    } else if (user?.user !== undefined) {
      //   const id = new ObjectId(user.user._id);

      const loans = await Loan.findOne({
        user: user.user._id
      });

      res.json({ loans: [loans] });
    } else {
      throw new Error("User either doesn't exist, or isn't and admin");
    }
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
    const token = req.cookies.token as string;
    const user = await realValidateUser(token);

    if (user?.accountLevel === AccountLevel.Admin) {
      const loans = await getLoans();

      res.render('loans/index', { loans });
    } else if (user?.user !== undefined) {
      //   const id = new ObjectId(user.user._id);

      const loans = await Loan.findOne({
        user: user.user._id
      });

      res.render('loans/index', { loans: [loans] });
    } else {
      throw new Error("User either doesn't exist, or isn't and admin");
    }
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
  console.log('asdfasdfasdfwerqwe');

  try {
    const { amount, interestRate, term, user } = req.body;
    const loan = new Loan({
      amount,
      interestRate,
      term,
      user
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
    const userIsAdmin = await isAdmin(req.cookies.token as string);
    if (userIsAdmin) {
      const loan = await Loan.findByIdAndDelete(req.params.id);
      if (loan == null) {
        return res.status(404).send('Loan not found');
      } else {
        throw new Error('User either does not exist, or is not Admin');
      }
    }
    res.redirect('/loans');
  } catch (err) {
    next(err);
  }
};

export const deleteLoanJson = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Response<any, Record<string, any>> | undefined> => {
  try {
    const userIsAdmin = await isAdmin(req.headers.token as string);
    if (userIsAdmin) {
      const loan = await Loan.findByIdAndDelete(req.params.id);
      if (loan == null) {
        return res.status(404).json('Loan not found');
      } else {
        res.json(`Successfully deleted loan: ${loan?._id as string}`);
      }
    } else {
      throw new Error('User either does not exist, or is not Admin');
    }
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
