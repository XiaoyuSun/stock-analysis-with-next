const fakeData = {
  bestMatches: [
    {
      "1. symbol": "TSCO.LON",
      "2. name": "Tesco PLC",
      "3. type": "Equity",
      "4. region": "United Kingdom",
      "5. marketOpen": "08:00",
      "6. marketClose": "16:30",
      "7. timezone": "UTC+01",
      "8. currency": "GBX",
      "9. matchScore": "0.7273",
    },
    {
      "1. symbol": "TSCDF",
      "2. name": "Tesco plc",
      "3. type": "Equity",
      "4. region": "United States",
      "5. marketOpen": "09:30",
      "6. marketClose": "16:00",
      "7. timezone": "UTC-04",
      "8. currency": "USD",
      "9. matchScore": "0.7143",
    },
    {
      "1. symbol": "TSCDY",
      "2. name": "Tesco plc",
      "3. type": "Equity",
      "4. region": "United States",
      "5. marketOpen": "09:30",
      "6. marketClose": "16:00",
      "7. timezone": "UTC-04",
      "8. currency": "USD",
      "9. matchScore": "0.7143",
    },
    {
      "1. symbol": "TCO2.FRK",
      "2. name": "TESCO PLC ADR/1 LS-05",
      "3. type": "Equity",
      "4. region": "Frankfurt",
      "5. marketOpen": "08:00",
      "6. marketClose": "20:00",
      "7. timezone": "UTC+02",
      "8. currency": "EUR",
      "9. matchScore": "0.5455",
    },
    {
      "1. symbol": "TCO0.FRK",
      "2. name": "TESCO PLC LS-0633333",
      "3. type": "Equity",
      "4. region": "Frankfurt",
      "5. marketOpen": "08:00",
      "6. marketClose": "20:00",
      "7. timezone": "UTC+02",
      "8. currency": "EUR",
      "9. matchScore": "0.5455",
    },
  ],
};

export default async function fetchStockSymbols(req, res) {
  const { query } = req;
  const { symbol } = query;

  const apiKey = process.env.ALPHA_VANTAGE_API_KEY;

  const url = `https://www.alphavantage.co/query?function=SYMBOL_SEARCH&keywords=${symbol}&apikey=${apiKey}`;

  try {
    const response = await fetch(url);

    if (!response.ok) {
      // throw new Error("Failed to fetch stock symbols");
      return res.status(500).json({ message: "Failed to fetch stock symbols" });
    }

    const data = await response.json();

    if (data?.bestMatches || fakeData) {
      let finalData = data?.bestMatches || fakeData;

      return res
        .status(200)
        .json(finalData.bestMatches.map((match) => match["1. symbol"]));
    }

    return res.status(429).json({ message: data?.message?.Information });
  } catch (error) {
    console.error("Error fetching stock symbols:", error);
    return [];
  }
}
