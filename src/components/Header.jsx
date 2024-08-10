import React from "react";
import { Button } from "./ui/button";
import { Download } from "lucide-react";

const Header = ({ setDownloadIcon }) => {
  return (
    <div className="p-4 shadow-sm border flex justify-between items-center">
      <img src="/logo.svg" alt="" />
      <Button
        className="flex items-center gap-2"
        onClick={() => setDownloadIcon(Date.now())}
      >
        <Download className="w-4 h-4" /> Download
      </Button>
    </div>
  );
};

export default Header;
