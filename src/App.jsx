import { useState } from "react";
import BackgroundController from "./components/BackgroundController";

import Header from "./components/Header";
import IconController from "./components/IconController";
import SideNav from "./components/SideNav";
import { Button } from "./components/ui/button";
import LogoPeview from "./components/LogoPeview";
import { UpdateStorageContext } from "./context/updateStorageContext";

export default function App() {
  const [selectedIndex, setSelectedIndex] = useState(1);
  const [updateStorage, setUpdateStorage] = useState({});
  const [downloadIcon, setDownloadIcon] = useState();
  return (
    <UpdateStorageContext.Provider value={{ updateStorage, setUpdateStorage }}>
      <Header setDownloadIcon={setDownloadIcon} />
      <div className="w-64 fixed">
        <SideNav selectedIndex={(value) => setSelectedIndex(value)} />
      </div>
      <div className="ml-64 grid grid-cols-1 md:grid-cols-6 fixed">
        <div className="md:col-span-2 p-5 bodrer h-screen shadow-sm overflow-auto">
          {selectedIndex === 1 ? <IconController /> : <BackgroundController />}
        </div>
        <div className="md:col-span-3 bg-red-50">
          <LogoPeview downloadIcon={downloadIcon} />
        </div>
        <div className="bg-blue-300 md:col-span-1">result</div>
      </div>
    </UpdateStorageContext.Provider>
  );
}
