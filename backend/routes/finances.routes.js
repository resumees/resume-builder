const express = require('express');
const { uploadFinancesToDB } = require('../service/financials.service');
const router = express.Router();
const logger = require('../middleware/logger');
const authenticateJWT = require('../middleware/jwt');

router.post('/uploadFinancials', authenticateJWT, async (req, res) => {
  try {
    await uploadFinancesToDB(req);
    logger.info('Financial data uploaded');
    res.json({ message: 'Financial data uploaded' });
  } catch (error) {
    res.locals.errorMessage = error.message;
    logger.error("Upload financials error: " + error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;