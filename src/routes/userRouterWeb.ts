/* eslint-disable @typescript-eslint/no-misused-promises */
import express from 'express';
import {
  createUserWeb,
  deleteUserWeb,
  editUserWeb,
  getUserWeb,
  getUsersWeb,
  loginUser,
  logoutUser,
  newUserWeb,
  showLoginForm,
  updateUserWeb
} from '../controllers/userController';

const router = express.Router();

// Web routes
router.get('/', getUsersWeb);
router.post('/', createUserWeb);
router.post('/create', createUserWeb);
router.get('/new', newUserWeb);
router.get('/login', showLoginForm);
router.post('/login', loginUser);
router.get('/:id/edit', editUserWeb);
router.post('/:id', updateUserWeb);

router.get('/delete/:id', deleteUserWeb);
router.get('/logout', logoutUser);
router.get('/:id', getUserWeb);
router.put('/:id', updateUserWeb);

export default router;
