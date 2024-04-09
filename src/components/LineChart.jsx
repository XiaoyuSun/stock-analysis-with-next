import React from "react";
import { chart as chartjs } from "chart.js/auto";
import { Chart } from "react-chartjs-2";

const LineChart = ({ stockData }) => {
  let arr = [];

  Object.keys(stockData).forEach((key) => {
    arr.push({ label: key, ...stockData[key] });
  });

  arr.sort((a, b) => new Date(a.label) - new Date(b.label));

  const labels = arr.map((data) => data.label);
  const totalShareholderEquityData = arr.map(
    (data) => data.totalShareholderEquity
  );

  const netIncomeData = arr.map((data) => data.netIncome);
  const totalRevenueData = arr.map((data) => data.totalRevenue);

  const chartData = {
    labels: labels,
    datasets: [
      {
        label: "Total Shareholder Equity",
        data: totalShareholderEquityData,
        fill: false,
        borderColor: "rgb(75, 192, 192)",
        tension: 0.1,
      },
      {
        label: "Net Income",
        data: netIncomeData,
        fill: false,
        borderColor: "rgb(255, 99, 132)",
        tension: 0.1,
      },
      {
        label: "Total Revenue",
        data: totalRevenueData,
        fill: false,
        borderColor: "blue",
        tension: 0.1,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: true,
    scales: {
      x: {
        type: "category",
      },
      y: {
        beginAtZero: true,
      },
    },
  };

  return (
    <section className="w-full">
      <Chart type="line" data={chartData} options={options} />
    </section>
  );
};

export default LineChart;
