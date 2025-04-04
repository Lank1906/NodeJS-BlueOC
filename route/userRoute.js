const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const { authenticateToken } = require('../middleware/auth');
const authorizeRole = require('../middleware/authorizeRole');

// Public routes
router.post('/login', userController.loginUser);
router.post('/', userController.createUser);

// Protected routes
router.get('/', authenticateToken, userController.getAllUsers);
router.get('/:id', authenticateToken, userController.getUserById);
router.put('/:id', authenticateToken, userController.updateUser);
router.delete('/:id', authenticateToken,authorizeRole('admin'), userController.deleteUser);

module.exports = router;