const express = require("express");
const {
  getFinancesData,
  uploadFinancesToDB,
  getPhoneData
} = require("../service/financials.service");
const router = express.Router();
const logger = require("../middleware/logger");
const authenticateJWT = require("../middleware/jwt");
const canstarData = require("../data/phone.json");

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

router.get("/financials/phone", authenticateJWT, async (req, res) => {
  try {

    console.log(req.query.page)
    console.log(req.query.pageSize)
    
    const page = Number(req.query.page) || 1; // default to 1 if not provided
    const pageSize = Number(req.query.pageSize) || 10; // default to 10 if not provided

    let data = getPhoneData(page, pageSize);
    logger.info("phone data retrieved");
    res.json({ data: data });
  } catch (error) {
    res.locals.errorMessage = error.message;
    logger.error("Retrieve phone error: " + error);
    res.status(500).json({ message: `Error: ${error}` });
  }
});

router.get("/financials/canstar", async (req, res) => {
  const dataLength = canstarData.data.table.products.length
  res.json({ dataLength });
});

module.exports = router;
