"use client";

import React, { useState, useEffect } from "react";

const StockSymbols = () => {
  const [inputText, setInputText] = useState("");
  const [stockSymbols, setStockSymbols] = useState([]);
  const [message, setMessage] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);

  const handleInputChange = (e) => {
    let value = e.target.value;
    setInputText(value);
    setShowDropdown(value.length > 0);
  };

  const handleSelectSuggestion = (selectedSuggestion) => {
    setInputText(selectedSuggestion);
    setShowDropdown(false);
  };

  useEffect(() => {
    const fetchStockSymbols = async () => {
      if (inputText) {
        const response = await fetch("/api/fetchStockSymbols");
        if (response.status === 429) {
          setMessage(response.statusText);
        } else {
          const data = await response.json();
          setStockSymbols(data);
        }
      }
    };

    fetchStockSymbols();
  }, [inputText]);

  return (
    <div className="flex flex-col relative">
      <input
        type="text"
        value={inputText}
        onChange={(e) => handleInputChange(e)}
        placeholder="Type a stock symbol..."
        className="w-full px-4 py-2 border rounded-md shadow-sm focus:outline-none focus:ring focus:border-blue-300"
      />
      {showDropdown && stockSymbols.length > 0 && (
        <ul
          className=" w-full mt-1 bg-white border rounded-md shadow-md"
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
      {message}
    </div>
  );
};

export default StockSymbols;
