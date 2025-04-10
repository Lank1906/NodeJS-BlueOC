import bcrypt from 'bcryptjs';
import pool from './initDB.js';

export async function getAllUsers() {
  const result = await pool.query(
    'SELECT id, name, email, role, password_hash FROM users ORDER BY id',
  );
  return result.rows;
}

export async function getUserById(id) {
  const result = await pool.query('SELECT id, name, email, role FROM users WHERE id = $1', [id]);
  return result.rows[0];
}

export async function createUser(data) {
  const hashedPassword = await bcrypt.hash(data.password, 12);
  const result = await pool.query(
    `INSERT INTO users (name, email, password_hash, role)
     VALUES ($1, $2, $3, $4)
     RETURNING id, name, email, role`,
    [data.name, data.email, hashedPassword, data.role || 'user'],
  );
  return result.rows[0];
}

export async function updateUser(id, data) {
  const fields = [];
  const values = [];
  let idx = 1;

  for (const key in data) {
    if (key !== 'password') {
      fields.push(`${key} = $${idx}`);
      values.push(data[key]);
      idx++;
    }
  }

  if (fields.length === 0) return null;

  values.push(id);
  const result = await pool.query(
    `UPDATE users SET ${fields.join(', ')} WHERE id = $${idx} RETURNING id, name, email, role`,
    values,
  );

  return result.rows[0];
}

export async function deleteUser(id) {
  const result = await pool.query(
    'DELETE FROM users WHERE id = $1 RETURNING id, name, email, role',
    [id],
  );
  return result.rows[0];
}
