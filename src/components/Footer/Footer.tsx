import * as React from "react";
import { ThemeSelector } from "./ThemeSelector";

function Footer() {
  return (
    <footer className="flex h-7 w-max mx-auto items-center justify-center mt-md mb-2xs">
      <small className="font-lato text-base oldstyle-nums mr-4">
        &#127279; 2025 Jonah Bedouch and Brandon Wong
      </small>
      <ThemeSelector />
    </footer>
  );
}

export default Footer;
