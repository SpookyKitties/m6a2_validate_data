/* eslint-disable @typescript-eslint/no-misused-promises */
import express from 'express';
import {
  getUserJSON,
  getUsersJSON,
  createUserJSON,
  updateUserJSON,
  deleteUserJSON
} from '../controllers/userController';

const router = express.Router();

// JSON routes
router.get('/', getUsersJSON);

router.get('/delete/:id', deleteUserJSON);
router.get('/:id', getUserJSON);
router.post('/', createUserJSON);
router.put('/:id', updateUserJSON);

export default router;
