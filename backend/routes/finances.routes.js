const express = require('express');
const { uploadFinancesToDB } = require('../service/financials.service');
const router = express.Router();
const logger = require('../middleware/logger');

router.post('/uploadFinancials', async (req, res) => {
  try {
    await uploadFinancesToDB(req.body);
    logger.info('Financial data uploaded');
    res.json({ message: 'Financial data uploaded' });
  } catch (error) {
    res.locals.errorMessage = error.message;
    logger.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;