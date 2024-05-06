const express = require("express");
const {
  getFinancesData,
  uploadFinancesToDB,
  getFinancialProductData,
} = require("../service/financials.service");
const router = express.Router();
const logger = require("../middleware/logger");
const authenticateJWT = require("../middleware/jwt");

router.post("/uploadFinancials", authenticateJWT, async (req, res) => {
  try {
    await uploadFinancesToDB(req);
    logger.info("Financial data uploaded");
    res.json({ message: "Financial data uploaded" });
  } catch (error) {
    res.locals.errorMessage = error.message;
    logger.error("Upload financials error: " + error);
    res.status(500).json({ message: "Server error" });
  }
});

router.get("/financials/getFinancials", authenticateJWT, async (req, res) => {
  try {
    const finances = await getFinancesData(req);
    logger.info("Financial data retrieved");
    res.json({ data: finances });
  } catch (error) {
    res.locals.errorMessage = error.message;
    logger.error("Retrieve financials error: " + error);
    res.status(500).json({ message: `Error: ${error}` });
  }
});

router.get("/financials/comparison", authenticateJWT, async (req, res) => {
  const page = Number(req.query.page) || 1;
  const pageSize = Number(req.query.pageSize) || 10;
  const productType = req.query.productType || null;
  const params = JSON.parse(req.query.params) || null;

  try {
    productData = await getFinancialProductData(page, pageSize, productType, params);
    logger.info(`PATH: /financials/comparison || Status: ${res.statusCode} || ProductType: ${productType} || Data: ${productData}`)
    res.json({ data: productData });
  } catch (error) {
    res.locals.errorMessage = error.message;
    logger.error(`PATH: /financials/comparison || Status: ${res.statusCode} || ProductType: ${productType} || Error: ${error}`)
    res.status(500).json({ message: `Error: ${error}` });
  }
});

module.exports = router;
