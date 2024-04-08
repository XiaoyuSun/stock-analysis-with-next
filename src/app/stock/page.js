import React from "react";
import { fetchBalanceSheetData } from "../../utils/alphavantage";

const getBalanceSheetData = async () => {
  const balanceSheetData = await fetchBalanceSheetData();
  return balanceSheetData;
};

const StockPage = async () => {
  // Use the balanceSheetData in your component
  const balanceSheetData = await getBalanceSheetData();

  return (
    <div>
      <h1>Balance Sheet Data</h1>
      <pre>{JSON.stringify(balanceSheetData, null, 2)}</pre>
    </div>
  );
};

export default StockPage;
