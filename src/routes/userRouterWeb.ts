/* eslint-disable @typescript-eslint/no-misused-promises */
import express from 'express';
import {
  getUserWeb,
  getUsersWeb,
  createUserWeb,
  updateUserWeb,
  deleteUserWeb,
  loginUser,
  showLoginForm,
  logoutUser,
  newUserWeb
} from '../controllers/userController';

const router = express.Router();

// Web routes
router.get('/', getUsersWeb);
router.post('/', createUserWeb);
router.get('/new', newUserWeb);
router.get('/login', showLoginForm);
router.post('/login', loginUser);

router.post('/create', createUserWeb);
router.post('/logout', logoutUser);
router.get('/:id', getUserWeb);
router.put('/:id', updateUserWeb);
router.delete('/:id', deleteUserWeb);

export default router;
