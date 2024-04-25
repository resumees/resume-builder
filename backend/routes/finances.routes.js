const express = require("express");
const {
  getFinancesData,
  uploadFinancesToDB,
  getFinancialProductData,
} = require("../service/financials.service");
const router = express.Router();
const logger = require("../middleware/logger");
const authenticateJWT = require("../middleware/jwt");
const canstarData = require("../data/electricity_endeavour.json");
const axios = require("axios");

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

  try {
    productData = getFinancialProductData(page, pageSize, productType);
    logger.info(`${productType} data: ${productData}`);
    res.json({ data: productData });
  } catch (error) {
    res.locals.errorMessage = error.message;
    logger.error(`Retrieve ${productType} error: ` + error);
    res.status(500).json({ message: `Error: ${error}` });
  }
});

router.get("/financials/canstar", async (req, res) => {
  const dataLength = canstarData.data.table.products.length;
  res.json({ dataLength });
});

router.get("/financials/distributors", async (req, res) => {
  try {
    const { postcode, electricity, gas, solar } = req.query;

    // Construct the API URL with the provided postcode
    const apiUrl = `https://www.originenergy.com.au/api/distributor/v1/postcodes/${postcode}/distributors?postcode=${postcode}&electricity=${electricity}&gas=${gas}&solar=${solar}`;

    const response = await axios.get(apiUrl, {
      headers: {
        accept: "application/json, text/plain, */*",
        "accept-language": "en-GB,en-US;q=0.9,en;q=0.8",
        cookie:
          "AMCV_E3470C0F53D670ED0A490D45%40AdobeOrg=179643557%7CMCMID%7C08911511953309496481158575750307972599%7CMCAID%7CNONE%7CvVersion%7C5.5.0; bzid.id=4789918a-da0b-4155-a2e2-dab7df6f17ca; bzid.created=true; intercom-id-hs2d6jw6=c9b4e729-93e9-4df3-8359-96a804d50090; intercom-device-id-hs2d6jw6=2be9dac7-5d6d-4e69-a15b-c816ebe322b5; s_ppn=originenergy:electricity-gas:plans; target_state=nsw; intercom-session-hs2d6jw6=; ab.storage.deviceId.3b8383c1-c29d-435f-8dcd-e91a86955afe=%7B%22g%22%3A%22dbaf62b0-06e0-8735-c097-6623b1358ca4%22%2C%22c%22%3A1712483512253%2C%22l%22%3A1714026447351%7D; ab.storage.userId.3b8383c1-c29d-435f-8dcd-e91a86955afe=%7B%22g%22%3A%224789918a-da0b-4155-a2e2-dab7df6f17ca%22%2C%22c%22%3A1712483512251%2C%22l%22%3A1714026447352%7D; ab.storage.sessionId.3b8383c1-c29d-435f-8dcd-e91a86955afe=%7B%22g%22%3A%221585d0d0-453d-fbf5-4bc4-00365e6bf8a1%22%2C%22e%22%3A1714028519029%2C%22c%22%3A1714026447351%2C%22l%22%3A1714026719029%7D; arp_scroll_position=292",
        referer:
          "https://www.originenergy.com.au/for-home/electricity-and-gas/info/find-my-distributor/",
        "sec-ch-ua":
          '"Google Chrome";v="123", "Not:A-Brand";v="8", "Chromium";v="123"',
        "sec-ch-ua-mobile": "?0",
        "sec-ch-ua-platform": '"macOS"',
        "sec-fetch-dest": "empty",
        "sec-fetch-mode": "cors",
        "sec-fetch-site": "same-origin",
        "user-agent":
          "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/123.0.0.0 Safari/537.36",
      },
    });

    // Send the response from the API to the client
    res.json(response.data);
  } catch (error) {
    // If there's an error, send an error response to the client
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;

module.exports = router;
