import { Image, PencilRuler, Shield } from "lucide-react";
import React, { useState } from "react";

const SideNav = ({ selectedIndex }) => {
  const menuList = [
    {
      id: 1,
      name: "Icon",
      icon: PencilRuler,
    },
    {
      id: 2,
      name: "Background",
      icon: Image,
    },
    {
      id: 3,
      name: "Upgrade",
      icon: Shield,
    },
  ];
  const [activeIndex, setActiveIndex] = useState(1);
  return (
    <div className="border shadow-sm h-screen">
      <div>
        {menuList.map((item, index) => (
          <h2
            key={index}
            onClick={() => {
              setActiveIndex(item.id);
              selectedIndex(item.id);
            }}
            className={` ${
              activeIndex === item.id ? "bg-primary text-white" : "bg-white"
            } p-3 text-lg flex gap-2 items-center px-7 text-gray-500 my-2 cursor-pointer hover:bg-primary hover:text-white`}
          >
            <item.icon />
            {item.name}
          </h2>
        ))}
      </div>
    </div>
  );
};

export default SideNav;
