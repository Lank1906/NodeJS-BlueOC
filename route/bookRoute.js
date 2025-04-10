import express from 'express';
import { getBooks, getBook, addBook, getMostBorrowedBooks } from '../controller/bookController.js';
import { authenticateToken } from '../middleware/auth.js';

const router = express.Router();

router.use(authenticateToken);

router.get('/', getBooks);
router.get('/most-borrowed', getMostBorrowedBooks);
router.get('/:id', getBook);
router.post('/', addBook);

export default router;
