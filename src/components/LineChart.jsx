import React, { useEffect, useState } from "react";
import { chart as chartjs } from "chart.js/auto";
import { Chart } from "react-chartjs-2";
import MonthYearSelector from "./MonthYearSelector";
import { useDarkMode } from "./DarkModeContext";

function isLater(dateStr1, dateStr2) {
  const date1 = new Date(dateStr1);
  const date2 = new Date(dateStr2);
  return date1 > date2;
}

function isEarly(dateStr1, dateStr2) {
  const date1 = new Date(dateStr1);
  const date2 = new Date(dateStr2);
  return date1 < date2;
}

const LineChart = ({ stockData }) => {
  const [showData, setArr] = useState([]);
  const [startYear, setStartYear] = useState("2010");
  const [endYear, setEndYear] = useState("2024");
  const [darkMode, toggleDarkMode] = useDarkMode();

  useEffect(() => {
    let tmp = [];

    Object.keys(stockData)
      .filter((key) => isLater(key, startYear) && isEarly(key, endYear))
      .forEach((key) => {
        tmp.push({ label: key, ...stockData[key] });
      });

    tmp.sort((a, b) => new Date(a.label) - new Date(b.label));

    setArr(tmp);
  }, [stockData, startYear, endYear]);

  const labels = showData.map((data) => data.label);
  const totalShareholderEquityData = showData.map(
    (data) => data.totalShareholderEquity
  );

  const netIncomeData = showData.map((data) => data.netIncome);
  const totalRevenueData = showData.map((data) => data.totalRevenue);

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
        ticks: {
          color: darkMode ? "white" : "black",
        },
      },
      y: {
        beginAtZero: true,
        ticks: {
          color: darkMode ? "white" : "black",
        },
      },
    },
  };

  return (
    <section className="w-full flex flex-col gap-2 items-center dark:text-gray-50">
      <div className="flex w-full gap-6">
        <MonthYearSelector
          handleChange={setStartYear}
          label="Start"
          defaultValue={startYear}
        />
        <MonthYearSelector
          handleChange={setEndYear}
          label="End"
          defaultValue={endYear}
        />
      </div>
      <Chart type="line" data={chartData} options={options} />
    </section>
  );
};

export default LineChart;
