const { body } = require('express-validator');
const userModel = require('../model/userModel');

const isEmailUnique = async (email) => {
  const existingUser = userModel.getAllUsers().find(user => user.email === email);
  if (existingUser) {
    throw new Error('Email already in use');
  }
};

const createUserValidator = [
  body('name').notEmpty().withMessage('Name is required'),

  body('email')
    .isEmail().withMessage('Invalid email format')
    .custom(isEmailUnique),

  body('password')
    .isLength({ min: 6 }).withMessage('Password must be at least 6 characters'),
];

const updateUserValidator = [
  body('email')
    .optional()
    .isEmail().withMessage('Invalid email format')
    .custom(isEmailUnique),

  body('password')
    .optional()
    .isLength({ min: 6 }).withMessage('Password must be at least 6 characters'),
];

module.exports = {
  createUserValidator,
  updateUserValidator,
};
