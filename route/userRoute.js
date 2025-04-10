import express from 'express';
import {
  loginUser,
  createUser,
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
} from '../controller/userController.js';

import { authenticateToken } from '../middleware/auth.js';
import authorizeRole from '../middleware/authorizeRole.js';
import { createUserValidator, updateUserValidator } from '../validator/userValidator.js';
import validateRequest from '../middleware/validateRequest.js';

const router = express.Router();

router.post('/login', loginUser);
router.post('/', createUserValidator, validateRequest, createUser);

router.get('/', authenticateToken, getAllUsers);
router.get('/:id', authenticateToken, getUserById);
router.put('/:id', authenticateToken, updateUserValidator, validateRequest, updateUser);
router.delete('/:id', authenticateToken, authorizeRole('admin'), deleteUser);

export default router;
