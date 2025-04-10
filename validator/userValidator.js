import { body } from 'express-validator';
import pool from '../model/initDB.js';

// Kiểm tra email có trùng trong database
const isEmailUnique = async (email) => {
  const result = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
  if (result.rows.length > 0) {
    throw new Error('Email already in use');
  }
};

// Validator cho tạo user
export const createUserValidator = [
  body('name').notEmpty().withMessage('Name is required'),

  body('email').isEmail().withMessage('Invalid email format').custom(isEmailUnique),

  body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters'),
];

// Validator cho cập nhật user
export const updateUserValidator = [
  body('email').optional().isEmail().withMessage('Invalid email format').custom(isEmailUnique),

  body('password')
    .optional()
    .isLength({ min: 6 })
    .withMessage('Password must be at least 6 characters'),
];
