"use client";

import React, { useState, useEffect, useReducer } from "react";
import StockChart from "./StockChart";
import { FUNCTION_TYPES } from "@/utils/constant";
import CheckBox from "./CheckBox";
import ErrorMessage from "./ErrorMessage";

const StockSymbols = () => {
  const [inputText, setInputText] = useState("");
  const [stockSymbols, setStockSymbols] = useState([]);
  const [selectedStockSymbol, setSelectedStockSymbol] = useState(null);
  const [balanceData, setBalanceData] = useState(null);
  const [incomeData, setIncomeData] = useState(null);
  const [message, setMessage] = useState(null);
  const [showDropdown, setShowDropdown] = useState(false);
  const [cachedMode, setCachedMode] = useState(false);

  const handleCachedModeChange = () => {
    setCachedMode(!cachedMode);
    setBalanceData(null);
    setIncomeData(null);
    setStockSymbols([]);
    setInputText("");
    setSelectedStockSymbol(null);
    setMessage(null);
  };

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
          `/api/fetchData?functionType=${FUNCTION_TYPES.SYMBOL_SEARCH}&symbol=${inputText}&cachedMode=${cachedMode}`
        );
        if (response.status === 429 || response.status === 500) {
          console.log(response);
          setMessage(response.statusText);
        } else {
          const data = await response.json();
          setStockSymbols(data.bestMatches.map((match) => match["1. symbol"]));
        }
      }
    };

    fetchStockSymbols();
  }, [inputText, cachedMode]);

  useEffect(() => {
    const fetchBalanceSheetData = async () => {
      if (selectedStockSymbol) {
        const response = await fetch(
          `/api/fetchData?functionType=${FUNCTION_TYPES.BALANCE_SHEET}&symbol=${selectedStockSymbol}&cachedMode=${cachedMode}`
        );
        if (response.status === 429 || response.status === 500) {
          setMessage(response.statusText);
        } else {
          const data = await response.json();
          console.log("fetchBalanceSheetData", data, response.statusText);
          setBalanceData(data);
        }
      }
    };

    const fetchIncomeData = async () => {
      if (selectedStockSymbol) {
        const response = await fetch(
          `/api/fetchData?functionType=${FUNCTION_TYPES.INCOME_STATEMENT}&symbol=${selectedStockSymbol}&cachedMode=${cachedMode}`
        );
        if (response.status === 429 || response.status === 500) {
          setMessage(response.statusText);
        } else {
          const data = await response.json();
          console.log("fetchIncomeData", data, response.statusText);

          setIncomeData(data);
        }
      }
    };

    fetchBalanceSheetData();
    fetchIncomeData();
  }, [selectedStockSymbol, cachedMode]);

  return (
    <section className="w-full flex flex-col flex-grow items-center relative dark:text-gray-500 ">
      <section className="w-1/3 flex gap-3 justify-center items-center relative">
        <input
          type="text"
          value={inputText}
          onChange={(e) => handleInputChange(e)}
          placeholder="Type a stock symbol..."
          className="w-full px-4 py-2 border-2 border-gray-400 rounded-lg shadow-sm focus:outline-none focus:ring focus:border-blue-300 relative"
        />

        {showDropdown && stockSymbols.length > 0 && (
          <ul
            className="absolute bg-white border-2 border-gray-400 rounded-lg shadow-md mt-2 z-10 top-10 w-full"
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
        <div className="absolute top-0 right-0 flex items-center h-full mr-1">
          <CheckBox onClick={handleCachedModeChange} checked={cachedMode} />
        </div>
      </section>

      {balanceData && incomeData && (
        <StockChart balanceData={balanceData} incomeData={incomeData} />
      )}

      <ErrorMessage message={message} />
    </section>
  );
};

export default StockSymbols;
