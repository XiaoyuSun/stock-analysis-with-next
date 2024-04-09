import symbols from "@/data/symbols";
import balanceData from "@/data/balance";
import incomeData from "@/data/income";
import { FUNCTION_TYPES } from "@/utils/constant";

export default async function fetchData(req, res) {
  const { query } = req;
  const { symbol, functionType, demoMode } = query;

  // Use the demo data if requested
  if (demoMode === "true") {
    const cachedData = {
      [FUNCTION_TYPES.SYMBOL_SEARCH]: symbols,
      [FUNCTION_TYPES.BALANCE_SHEET]: balanceData,
      [FUNCTION_TYPES.INCOME_STATEMENT]: incomeData,
    };

    const data = cachedData[functionType];
    if (data) {
      return res.status(200).json(data);
    }

    return res.status(500).json({ message: "Cached data not found" });
  }

  const apiKey = process.env.ALPHA_VANTAGE_API_KEY;
  let key =
    functionType === FUNCTION_TYPES.SYMBOL_SEARCH ? "keywords" : "symbol";

  const url = `https://www.alphavantage.co/query?function=${functionType}&${key}=${symbol}&apikey=${apiKey}`;

  try {
    const response = await fetch(url);

    if (!response.ok) {
      return res.status(500).json({ message: "Failed to fetch stock symbols" });
    }

    const data = await response.json();

    if (data?.Information) {
      return res.status(429).json({ message: data?.Information });
    }

    return res.status(200).json(data);
  } catch (error) {
    return res.status(500).json({ message: "Failed to fetch stock symbols" });
  }
}
