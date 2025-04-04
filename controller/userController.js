const jwt = require('jsonwebtoken');
const userModel = require('../models/userModel');

exports.createUser = (req, res) => {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
        return res.status(400).json({ message: 'Missing required fields' });
    }
    const newUser = userModel.createUser({ name, email, password });
    res.status(201).json(newUser);
};

exports.getAllUsers = (req, res) => {
    res.json(userModel.getAllUsers());
};

exports.getUserById = (req, res) => {
    const user = userModel.getUserById(parseInt(req.params.id));
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.json(user);
};

exports.updateUser = (req, res) => {
    const updated = userModel.updateUser(parseInt(req.params.id), req.body);
    if (!updated) return res.status(404).json({ message: 'User not found' });
    res.json(updated);
};

exports.deleteUser = (req, res) => {
    const deleted = userModel.deleteUser(parseInt(req.params.id));
    if (!deleted) return res.status(404).json({ message: 'User not found' });
    res.json(deleted);
};



exports.loginUser = (req, res) => {
    const { email, password } = req.body;

    const user = userModel.getAllUsers().find(u => u.email === email && u.password === password);
    if (!user) {
        return res.status(401).json({ message: 'Invalid email or password' });
    }

    const token = jwt.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET, { expiresIn: '1h' });

    res.json({ token });
};