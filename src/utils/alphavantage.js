export async function fetchData({ functionType, symbol }) {
  const apiKey = process.env.ALPHA_VANTAGE_API_KEY;
  console.log('----  fetchData  ----', apiKey)
  const url = `https://www.alphavantage.co/query?function=${functionType}&symbol=${symbol}&apikey=${apiKey}`;

  try {
    const response = await fetch(url);

    if (!response.ok) {
      return res.status(500).json({ message: "Failed to fetch stock symbols" });
    }

    const data = await response.json();

    if (data?.bestMatches || fakeData) {
      let finalData = data?.bestMatches.length > 0 ? data : fakeData;

      return res
        .status(200)
        .json(finalData?.bestMatches.map((match) => match["1. symbol"]));
    }

    return res.status(429).json({ message: data?.message?.Information });
  } catch (error) {
    console.error("Error fetching balance sheet data:", error);
    return res.status(500).json({ message: "Failed to fetch stock symbols" });
  }
}
