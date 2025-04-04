require('dotenv').config(); 

const express = require('express');
const userRoutes = require('./route/userRoute');
const app = express();

const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use('/users', userRoutes);

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
