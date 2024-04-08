export async function fetchBalanceSheetData() {
  const apiKey = "U9BO1MJVY3BNHDY5";
  const symbol = "AAPL";
  const functionType = "BALANCE_SHEET";

  const url = `https://www.alphavantage.co/query?function=${functionType}&symbol=${symbol}&apikey=${apiKey}`;

  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error("Failed to fetch data");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching balance sheet data:", error);
    return null;
  }
}
