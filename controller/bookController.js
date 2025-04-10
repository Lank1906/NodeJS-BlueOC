import * as BookModel from '../model/bookModel.js';
import { pool } from '../model/initDB.js';

export const getBooks = async (req, res) => {
  try {
    const books = await BookModel.getAllBooks();
    res.json(books);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getBook = async (req, res) => {
  const id = parseInt(req.params.id);
  try {
    const book = await BookModel.getBookById(id);
    if (!book) {
      return res.status(404).json({ message: 'Book not found' });
    }
    res.json(book);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const addBook = async (req, res) => {
  const { title, author, genre, published_year } = req.body;
  try {
    const book = await BookModel.createBook({ title, author, genre, published_year });
    res.status(201).json(book);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getMostBorrowedBooks = async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT
        b.id AS book_id,
        b.title,
        COUNT(*) AS most_borrowed
      FROM BorrowingHistory bh
      JOIN Books b ON bh.book_id = b.id
      WHERE bh.borrowed_date >= CURRENT_DATE - INTERVAL '6 months'
      GROUP BY b.id, b.title
      ORDER BY most_borrowed DESC
      LIMIT 5;
    `);

    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
