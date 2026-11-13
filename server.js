const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

// Bitrefill API configuration
const BITREFILL_API_URL = "https://api.bitrefill.com/v2/products";

app.get("/api/health", (req, res) => {
  res.json({
    success: true,
    message: "YALO PAY API is running"
  });
});

// Get products from Bitrefill
app.get("/api/products", async (req, res) => {
  try {
    const apiKey = process.env.BITREFILL_API_KEY;

    if (!apiKey) {
      return res.status(500).json({
        success: false,
        message: "Bitrefill API key is missing"
      });
    }

    const response = await fetch(BITREFILL_API_URL, {
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${apiKey}`
      }
    });

    const data = await response.json();

    if (!response.ok) {
      return res.status(response.status).json({
        success: false,
        message: "Bitrefill API request failed",
        details: data
      });
    }

    res.json({
      success: true,
      products: data
    });

  } catch (error) {
    console.error("Bitrefill error:", error.message);

    res.status(500).json({
      success: false,
      message: "Unable to load products"
    });
  }
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`YALO PAY running on port ${PORT}`);
});

