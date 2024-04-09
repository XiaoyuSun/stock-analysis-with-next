import React from "react";

function CheckBox({ onClick, checked }) {
  return (
    <div className="hidden sm:block">
      <input
        type="checkbox"
        id="demoMode"
        className="hidden"
        onChange={onClick}
        checked={checked}
      />
      <label htmlFor="demoMode" className="flex items-center cursor-pointer">
        <div className="w-6 h-6 border border-gray-400 rounded-md flex items-center justify-center mr-2">
          <svg
            className={`w-4 h-4 ${
              checked ? "text-grey-500" : "text-transparent"
            } pointer-events-none`}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M20 6L9 17l-5-5" />
          </svg>
        </div>
        <span className="text-sm">Demo Mode</span>
      </label>
    </div>
  );
}

export default CheckBox;
