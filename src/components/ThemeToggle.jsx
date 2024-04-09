"use client";

import React, { useState, useEffect } from "react";
import { FaMoon } from "react-icons/fa";
import { BsSunFill } from "react-icons/bs";
import { useDarkMode } from "./DarkModeContext";

const ThemeToggle = () => {
  const [darkMode, toggleDarkMode] = useDarkMode();

  useEffect(() => {
    if (localStorage.getItem("theme") === "dark") {
      toggleDarkMode(true);
    }
  }, []);

  useEffect(() => {
    if (darkMode === null) return;

    if (darkMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [darkMode]);

  if (darkMode === null) {
    return null;
  }

  return (
    <div
      className="relative w-16 h-8 flex items-center dark:bg-gray-900 bg-teal-500 cursor-pointer rounded-full p-1"
      onClick={() => toggleDarkMode(!darkMode)}
    >
      <FaMoon className="text-white text-xl" size={18} />
      <div
        className="absolute bg-white dark:bg-medium w-6 h-6 rounded-full shadow-md transform transition-transform duration-300"
        style={darkMode ? { right: "2px" } : { left: "2px" }}
      ></div>
      <BsSunFill className="ml-auto mr-1 text-yellow-400" size={18} />
    </div>
  );
};

export default ThemeToggle;
