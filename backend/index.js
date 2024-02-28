const express = require('express');
const connectDB = require('./middleware/dbConnect');
const financeRoutes = require('./routes/finances.routes');

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json()); 

connectDB();

app.use(financeRoutes);

app.listen(4000, () => {
  console.log('Server is running at http://localhost:4000');
});