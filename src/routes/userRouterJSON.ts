/* eslint-disable @typescript-eslint/no-misused-promises */
import express from 'express';
import {
  getUserJSON,
  getUsersJSON,
  createUserJSON,
  updateUserJSON,
  deleteUserJSON,
  loginUserJSON,
  editUserJSON
} from '../controllers/userController';

const router = express.Router();

// JSON routes
router.get('/', getUsersJSON);
router.get('/new', createUserJSON);

router.post('/login', loginUserJSON);
router.get('/:id/edit', editUserJSON);
router.post('/:id/edit', editUserJSON);

router.get('/delete/:id', deleteUserJSON);
router.post('/create', createUserJSON);

router.get('/:id', getUserJSON);
router.put('/:id', updateUserJSON);

export default router;
