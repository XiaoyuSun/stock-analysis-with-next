const { fetchStockSymbols } = require("@/app/api/routes");

const StockSymbolsResponse = async (context) => {
  const { query } = context;
  const { data } = query;

  console.log("🚀 ~ StockSymbolsResponse ~ data:", data)

  const stockSymbols = await fetchStockSymbols(data);

  return (
    <div>
      <ul>
        {stockSymbols.map((symbol) => (
          <li key={symbol}>{symbol}</li>
        ))}
      </ul>
    </div>
  );
};

export default StockSymbolsResponse;