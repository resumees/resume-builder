const express = require('express');
const connectDB = require('./middleware/dbConnect');
const login = require('./routes/login.routes');
const upload = require('./routes/upload.routes');
const applicant = require('./routes/applicant.routes');
const recruiter = require("./routes/recruiter.routes")
const setupMiddleware = require('./middleware/app.middleware');
require('dotenv').config();
const app = express();

setupMiddleware(app);

connectDB();

app.use(login)
app.use(upload)
app.use(applicant)
app.use(recruiter)

app.listen(4000, () => {
  console.log('Server is running at http://localhost:4000');
});