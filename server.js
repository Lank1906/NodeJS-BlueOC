import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import booksRouter from './route/bookRoute.js';
import userRouter from './route/userRoute.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(express.static('public'));

// Route chính
app.use('/users', userRouter);
app.use('/books', booksRouter);

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
