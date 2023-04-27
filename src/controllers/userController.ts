import { type Request, type Response, type NextFunction } from 'express';
import User, { type IUser } from '../models/userModel';
import dotenv from 'dotenv';
import { validateUser, validateUserAdmin } from './validateUser';
dotenv.config({ path: './.env.local' });
async function getUsers(): Promise<IUser[]> {
  return await User.find({});
}

export const getUsersJSON = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const verify = await validateUserAdmin(req.headers.authorization as string);

    if (verify) {
      const users = await getUsers();

      res.json({ users });
    }
    throw new Error("User either doesn't exist, or isn't and admin");
  } catch (err) {
    next(err);
  }
};

export const getUsersWeb = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const verify = await validateUserAdmin(req.cookies.token as string);

    if (verify) {
      const users = await getUsers();

      res.render('users/index', { users });
    }
    res.redirect('/users/login');
  } catch (err) {
    next(err);
  }
};

export const getUserWeb = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Response<any, Record<string, any>> | undefined> => {
  try {
    const user = await User.findById(req.params.id);
    if (user === null) {
      res.status(404);
      return res.send('User not found');
    }
    res.render('users/show', { user });
  } catch (err) {
    next(err);
  }
};
export const getUserJSON = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Response<any, Record<string, any>> | undefined> => {
  try {
    const user = await User.findById(req.params.id);
    if (user === null) {
      res.status(404);
      return res.json('User not found');
    }
    res.json(user);
  } catch (err) {
    next(err);
  }
};
export const createUserWeb = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const {
      username,
      password,
      firstName,
      lastName,
      email,
      dateOfBirth,
      accountLevel
    } = req.body;
    console.log(req.body);
    const user = new User({
      username,
      password,
      email,
      firstName,
      lastName,
      dateOfBirth,
      accountLevel
    });
    await user.save();
    res.redirect('/users');
  } catch (err) {
    next(err);
  }
};

export const newUserWeb = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  if (!(await validateUser(req.cookies.token as string))) {
    res.render('users/new');
  }
  res.redirect('/users');
};

export const createUserJSON = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const {
      username,
      password,
      firstName,
      lastName,
      email,
      dateOfBirth,
      accountLevel
    } = req.body;
    console.log(req.body);
    const user = new User({
      username,
      password,
      email,
      firstName,
      lastName,
      dateOfBirth,
      accountLevel
    });
    await user.save();
    res.json(user);
  } catch (err) {
    next(err);
  }
};
export const updateUserWeb = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Response<any, Record<string, any>> | undefined> => {
  try {
    const { firstName, lastName, email, age } = req.body;
    const user = await User.findByIdAndUpdate(
      req.params.id,
      { firstName, lastName, email, age },
      { new: true, runValidators: true }
    );
    if (user == null) {
      return res.status(404).send('User not found');
    }
    res.redirect(`/users/${user._id as number}`);
  } catch (err) {
    next(err);
  }
};

export const updateUserJSON = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Response<any, Record<string, any>> | undefined> => {
  try {
    const { firstName, lastName, email, age } = req.body;
    const user = await User.findByIdAndUpdate(
      req.params.id,
      { firstName, lastName, email, age },
      { new: true, runValidators: true }
    );
    if (user == null) {
      return res.status(404).json('User not found');
    }
    res.json(`User ${user._id as number} updated.`);
  } catch (err) {
    next(err);
  }
};

export const deleteUserWeb = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Response<any, Record<string, any>> | undefined> => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (user == null) {
      return res.status(404).send('User not found');
    }
    res.redirect('/users');
  } catch (err) {
    next(err);
  }
};

export const deleteUserJSON = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Response<any, Record<string, any>> | undefined> => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (user == null) {
      return res.status(404).send('User not found');
    }
    res.json(`User with _id ${req.params.id} has been deleted`);
  } catch (err) {
    next(err);
  }
};
export const editUserWeb = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const user = await User.findById(req.params.id);
    res.render('users/edit', { user });
  } catch (err) {
    next(err);
  }
};

export const editUserJSON = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const user = await User.findById(req.params.id);
    res.json(user);
  } catch (err) {
    next(err);
  }
};
export const ensureAuthenticated = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  if ((req.session as any).user !== undefined) {
    next();
    return;
  }
  res.redirect('/users/login');
};

export const showLoginForm = async (
  req: Request,
  res: Response
): Promise<void> => {
  res.render('users/login');
};

export const loginUser = async (req: Request, res: Response): Promise<void> => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (user == null) {
    res.status(400).render('users/login', {
      errorMessage: 'Invalid email or password'
    });
    return;
  }

  const isMatch = await user.comparePassword(password);
  console.log(isMatch);
  if (!isMatch) {
    res.status(400).render('users/login', {
      errorMessage: 'Invalid email or password'
    });
    return;
  }

  if (req?.session !== undefined) {
    (req.session as any).user = user;
  }
  const token = await user.generateAuthToken();
  console.log(token);
  res.cookie('token', token);
  res.redirect('/users'); // Redirect to the desired page after successful login
};

export const logoutUser = async (
  req: Request,
  res: Response
): Promise<void> => {
  res.clearCookie('token');
  res.redirect('/users/login');
};
