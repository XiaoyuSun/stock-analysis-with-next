import React, { useState } from "react";
// import { useDarkMode } from "./DarkModeContext";

const MonthYearSelector = ({
  handleChange,
  label = "Selected",
  defaultValue,
}) => {
  const [selectedYear, setSelectedYear] = useState("");
  // const [darkMode, toggleDarkMode] = useDarkMode();

  const startYear = 2008;
  const endYear = 2024;

  const years = Array.from(
    { length: endYear - startYear + 1 },
    (_, index) => startYear + index
  );

  const handleYearChange = (event) => {
    setSelectedYear(event.target.value);
    handleChange(event.target.value);
  };

  return (
    <div className="flex gap-4 w-full justify-center items-center my-4 text-gray-800 dark:text-gray-50">
      <select
        className="bg-white border border-gray-400 h-10 px-4 rounded-md text-gray-900"
        value={selectedYear}
        onChange={handleYearChange}
      >
        <option value="">Select Year</option>
        {years.map((year) => (
          <option key={year} value={year}>
            {year}
          </option>
        ))}
      </select>

      <p>
        {label} Year: <strong>{selectedYear || defaultValue}</strong>
      </p>
    </div>
  );
};

export default MonthYearSelector;
