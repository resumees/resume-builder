const express = require("express");
const connectDB = require("./middleware/dbConnect");
const financeRoutes = require("./routes/finances.routes");
const cors = require("cors");
const app = express();
require('dotenv').config();

app.use(
  cors({
    origin: process.env.FRONTEND_ENDPOINT
  })
);
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

connectDB();

app.use(financeRoutes);

app.listen(4000, () => {
  console.log("Server is running at http://localhost:4000");
});
