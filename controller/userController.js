import jwt from 'jsonwebtoken';
import * as userModel from '../model/userModel.js';
import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';

dotenv.config();

// Tạo user mới
export async function createUser(req, res) {
  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    return res.status(400).json({ message: 'Missing required fields' });
  }

  try {
    const newUser = await userModel.createUser(req.body);
    res.status(201).json(newUser);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

// Lấy tất cả users
export async function getAllUsers(req, res) {
  try {
    const users = await userModel.getAllUsers();
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

// Lấy user theo ID
export async function getUserById(req, res) {
  const id = parseInt(req.params.id);
  try {
    const user = await userModel.getUserById(id);
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.json(user);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

// Cập nhật user
export async function updateUser(req, res) {
  const id = parseInt(req.params.id);
  try {
    const updated = await userModel.updateUser(id, req.body);
    if (!updated) return res.status(404).json({ message: 'User not found' });
    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

// Xóa user
export async function deleteUser(req, res) {
  const id = parseInt(req.params.id);
  try {
    const deleted = await userModel.deleteUser(id);
    if (!deleted) return res.status(404).json({ message: 'User not found' });
    res.json(deleted);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

// Đăng nhập
export async function loginUser(req, res) {
  const { email, password } = req.body;

  try {
    const allUsers = await userModel.getAllUsers();
    const user = allUsers.find((u) => u.email === email);

    if (!user) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    const isMatch = await bcrypt.compare(password, user.password_hash);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    const token = jwt.sign(
      { id: user.id, email: user.email, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: '4h' },
    );

    res.json({ token });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}
