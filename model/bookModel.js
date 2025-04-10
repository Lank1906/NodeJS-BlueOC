import pool from './initDB.js';

export const getAllBooks = async () => {
  const result = await pool.query('SELECT * FROM books ORDER BY id');
  return result.rows;
};

export const getBookById = async (id) => {
  const result = await pool.query('SELECT * FROM books WHERE id = $1', [id]);
  return result.rows[0];
};

export const createBook = async ({ title, author, genre, published_year }) => {
  const result = await pool.query(
    'INSERT INTO books (title, author, genre, published_year) VALUES ($1, $2, $3, $4) RETURNING *',
    [title, author, genre, published_year],
  );
  return result.rows[0];
};
