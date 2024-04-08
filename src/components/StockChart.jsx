import React from "react";
import LineChart from "./LineChart";

/**
 * Quarterly net income from the Income Statement.
 * Quarterly total revenue from the Income Statement.
 * Quarterly total shareholder equity from the Balance Sheet.
 */
const BalancePlot = ({ balanceData, incomeData }) => {
  const stockData = {};

  balanceData.quarterlyReports.forEach(
    ({ fiscalDateEnding, totalShareholderEquity }) => {
      stockData[fiscalDateEnding] = {
        ...stockData[fiscalDateEnding],
        totalShareholderEquity,
      };
    }
  );

  incomeData.quarterlyReports.forEach(
    ({ fiscalDateEnding, netIncome, totalRevenue }) => {
      stockData[fiscalDateEnding] = {
        ...stockData[fiscalDateEnding],
        netIncome,
        totalRevenue,
      };
    }
  );

  return (
    <section className="flex flex-1 w-full">
      <LineChart stockData={stockData} />
    </section>
  );
};

export default BalancePlot;
