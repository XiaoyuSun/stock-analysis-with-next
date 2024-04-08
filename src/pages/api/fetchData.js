import symbols from "@/data/symbols";
import balanceData from "@/data/balance";
import incomeData from "@/data/income";
import { FUNCTION_TYPES } from "@/utils/constant";

export default async function fetchData(req, res) {
  const { query } = req;
  const { symbol, functionType } = query;

  if (functionType === FUNCTION_TYPES.SYMBOL_SEARCH) {
    return res
      .status(200)
      .json(symbols.bestMatches.map((match) => match["1. symbol"]));
  }

  if (functionType === FUNCTION_TYPES.BALANCE_SHEET) {
    return res.status(200).json(balanceData);
  }

  if (functionType === FUNCTION_TYPES.INCOME_STATEMENT) {
    return res.status(200).json(incomeData);
  }

  const apiKey = process.env.ALPHA_VANTAGE_API_KEY;

  const url = `https://www.alphavantage.co/query?function=${functionType}&keywords=${symbol}&apikey=${apiKey}`;

  try {
    const response = await fetch(url);

    if (!response.ok) {
      return res.status(500).json({ message: "Failed to fetch stock symbols" });
    }

    const data = await response.json();

    if (data?.bestMatches) {
      return res
        .status(200)
        .json(data.bestMatches.map((match) => match["1. symbol"]));
    }

    return res.status(429).json({ message: data?.message?.Information });
  } catch (error) {
    console.error("Error fetching stock symbols:", error);
    return [];
  }
}