"use client";

import React, { createContext, useState, useContext } from "react";

const DarkModeContext = createContext();

export const DarkModeProvider = ({ children }) => {
  const [darkMode, setIsDarkMode] = useState(false);

  const toggleDarkMode = () => {
    setIsDarkMode((prevMode) => !prevMode);
  };

  return (
    <DarkModeContext.Provider value={[darkMode, toggleDarkMode]}>
      {children}
    </DarkModeContext.Provider>
  );
};

export const useDarkMode = () => {
  return useContext(DarkModeContext);
};
