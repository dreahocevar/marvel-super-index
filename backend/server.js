const express = require("express");
const axios = require("axios");
const md5 = require("js-md5");
const cors = require("cors");
require("dotenv").config();

const app = express();
const PORT = 5000;

const PUBLIC_KEY = process.env.MARVEL_PUBLIC_KEY;
const PRIVATE_KEY = process.env.MARVEL_PRIVATE_KEY;

const generateHash = (ts) => md5(ts + PRIVATE_KEY + PUBLIC_KEY).toString();

app.use(cors());
app.get("/api/marvel", async (req, res) => {
  const ts = new Date().getTime().toString();
  const hash = generateHash(ts);

  try {
    const params = {
      ts,
      apikey: PUBLIC_KEY,
      hash,
      limit: req.query.limit || 20,
      offset: req.query.offset || 0,
      nameStartsWith: req.query.nameStartsWith || null,
      orderBy: req.query.orderBy || null,
    };

    console.log("Fetching Marvel data with params:", params);

    const response = await axios.get(
      "https://gateway.marvel.com/v1/public/characters",
      { params }
    );

    console.log("Marvel API response:", response.data);

    res.json(response.data);
  } catch (error) {
    console.error("Error fetching Marvel data:", error);

    if (error.response) {
      console.error("Marvel API response data:", error.response.data);
      console.error("Marvel API response status:", error.response.status);
      console.error("Marvel API response headers:", error.response.headers);
    }
    res.status(500).json({
      error: "Failed to fetch data",
      details: error.message,
    });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
