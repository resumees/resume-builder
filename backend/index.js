const express = require('express');
const connectDB = require('./middleware/dbConnect');
const financeRoutes = require('./routes/finances.routes');
const login = require('./routes/login.routes');
const setupMiddleware = require('./middleware/app.middleware');
require('dotenv').config();
const app = express();

setupMiddleware(app);

connectDB();

app.use(login)
app.use(financeRoutes);

app.listen(4000, () => {
  console.log('Server is running at http://localhost:4000');
});