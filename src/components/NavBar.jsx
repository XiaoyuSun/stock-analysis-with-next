import React from "react";
import ThemeToggle from "./ThemeToggle";

const NavBar = () => {
  return (
    <nav className="flex flex-row-reverse w-full">
      <ThemeToggle />
    </nav>
  );
};

export default NavBar;
