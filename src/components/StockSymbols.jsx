"use client";

import React, { useState, useEffect, useReducer } from "react";
import StockChart from "./StockChart";
import { FUNCTION_TYPES } from "@/utils/constant";

const StockSymbols = () => {
  const [inputText, setInputText] = useState("");
  const [stockSymbols, setStockSymbols] = useState([]);
  const [selectedStockSymbol, setSelectedStockSymbol] = useState(null);
  const [balanceData, setBalanceData] = useState(null);
  const [incomeData, setIncomeData] = useState(null);
  const [message, setMessage] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);

  const handleInputChange = (e) => {
    let value = e.target.value;
    setInputText(value);
    setShowDropdown(value.length > 0);
  };

  const handleSelectSuggestion = (selectedSuggestion) => {
    setInputText(selectedSuggestion);
    setSelectedStockSymbol(selectedSuggestion);
    setShowDropdown(false);
  };

  useEffect(() => {
    const fetchStockSymbols = async () => {
      if (inputText) {
        const response = await fetch(
          `/api/fetchData?functionType=${FUNCTION_TYPES.SYMBOL_SEARCH}&symbol=${inputText}`
        );
        if (response.status === 429 || response.status === 500) {
          setMessage(response.statusText);
        } else {
          const data = await response.json();
          setStockSymbols(data);
        }
      }
    };

    fetchStockSymbols();
  }, [inputText]);

  useEffect(() => {
    const fetchBalanceSheetData = async () => {
      if (selectedStockSymbol) {
        const response = await fetch(
          `/api/fetchData?functionType=${FUNCTION_TYPES.BALANCE_SHEET}&symbol=${selectedStockSymbol}`
        );
        if (response.status === 429 || response.status === 500) {
          setMessage(response.statusText);
        } else {
          const data = await response.json();
          setBalanceData(data);
        }
      }
    };

    const fetchIncomeData = async () => {
      if (selectedStockSymbol) {
        const response = await fetch(
          `/api/fetchData?functionType=${FUNCTION_TYPES.INCOME_STATEMENT}&symbol=${selectedStockSymbol}`
        );
        if (response.status === 429 || response.status === 500) {
          setMessage(response.statusText);
        } else {
          const data = await response.json();
          setIncomeData(data);
        }
      }
    };

    fetchBalanceSheetData();
    fetchIncomeData();
  }, [selectedStockSymbol]);

  return (
    <div className="w-full flex flex-col flex-grow items-center relative dark:text-gray-500 ">
      <input
        type="text"
        value={inputText}
        onChange={(e) => handleInputChange(e)}
        placeholder="Type a stock symbol..."
        className="w-1/3 sm:w-1/3 px-4 py-2 border rounded-md shadow-sm focus:outline-none focus:ring focus:border-blue-300"
      />
      {showDropdown && stockSymbols.length > 0 && (
        <ul
          className=" w-1/3 mt-1 bg-white border rounded-md shadow-md absolute z-10 top-10"
          onMouseLeave={() => setShowDropdown(false)}
        >
          {stockSymbols.map((symbol) => (
            <li
              key={symbol}
              className="px-4 py-2 cursor-pointer hover:bg-gray-100"
              onClick={() => handleSelectSuggestion(symbol)}
            >
              {symbol}
            </li>
          ))}
        </ul>
      )}
      {balanceData && incomeData && (
        <StockChart balanceData={balanceData} incomeData={incomeData} />
      )}
      {message}
    </div>
  );
};

export default StockSymbols;
