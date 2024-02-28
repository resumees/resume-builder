const express = require('express');
const router = express.Router();

router.post('/uploadFinancials', (req, res) => {
  console.log(req.body);
  res.send('Financial data uploaded');
});

module.exports = router;