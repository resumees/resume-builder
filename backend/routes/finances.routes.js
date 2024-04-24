const express = require("express");
const {
  getFinancesData,
  uploadFinancesToDB,
  getFinancialProductData
} = require("../service/financials.service");
const router = express.Router();
const logger = require("../middleware/logger");
const authenticateJWT = require("../middleware/jwt");
const canstarData = require("../data/phone.json");
const Constant = require("../helpers/constants");

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
  try {
    const page = Number(req.query.page) || 1; 
    const pageSize = Number(req.query.pageSize) || 10; 
    const productType = req.query.productType

    productData = getFinancialProductData(page, pageSize, productType)
    logger.info(`${productType} data: ${productData}`)
    res.json({ data: productData });
  } catch (error) {
    res.locals.errorMessage = error.message;
    logger.error(`Retrieve ${productType} error: ` + error);
    res.status(500).json({ message: `Error: ${error}` });
  }
});

router.get("/financials/canstar", async (req, res) => {
  const dataLength = canstarData.data.table.products.length
  res.json({ dataLength });
});

module.exports = router;
