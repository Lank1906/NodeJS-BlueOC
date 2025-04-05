const express = require('express');
const router = express.Router();
const userController = require('../controller/userController');
const { authenticateToken } = require('../middleware/auth');
const authorizeRole = require('../middleware/authorizeRole');
const { createUserValidator, updateUserValidator } = require('../validator/userValidator');
const validateRequest = require('../middleware/validateRequest');

router.post('/login', userController.loginUser);
router.post('/', createUserValidator, validateRequest,userController.createUser);

router.get('/', authenticateToken, userController.getAllUsers);
router.get('/:id', authenticateToken, userController.getUserById);
router.put('/:id', authenticateToken, updateUserValidator, validateRequest, userController.updateUser);
router.delete('/:id', authenticateToken, authorizeRole('admin'), userController.deleteUser);

module.exports = router;
