export default async function fetchBalanceSheetData(req, res) {
  const { query } = req;
  const { symbol } = query;

  const apiKey = process.env.ALPHA_VANTAGE_API_KEY;
  const functionType = "BALANCE_SHEET";

  const url = `https://www.alphavantage.co/query?function=${functionType}&symbol=${symbol}&apikey=${apiKey}`;

  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error("Failed to fetch data");
    }
    const data = await response.json();
    // return data;
    return res.status(200).json({ message: data });
  } catch (error) {
    console.error("Error fetching balance sheet data:", error);
    return null;
  }
}
