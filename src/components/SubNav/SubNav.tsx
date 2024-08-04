"use client";

import React, { useState } from "react";
import SubMenuHover from "./SubMenuHover";
import subComponents from "@/data/subMenus.json";

const SubNav: React.FC = () => {
  const [activeMenu, setActiveMenu] = useState<string | null>(null);

  const handleHover = (menu: string | null) => {
    setActiveMenu(menu);
  };

  return (
    <nav className="hidden md:block m-auto py-6 relative">
      <ul className="flex flex-wrap justify-center gap-8 uppercase text-sm">
        <li
          className="cursor-pointer"
          onMouseEnter={() => handleHover("computers")}
          onMouseLeave={() => handleHover(null)}
        >
          компютри
          {activeMenu === "computers" && (
            <SubMenuHover menus={subComponents[0]["computers"]} />
          )}
        </li>
        <li
          className="cursor-pointer"
          onMouseEnter={() => handleHover("components")}
          onMouseLeave={() => handleHover(null)}
        >
          компоненти
          {activeMenu === "components" && (
            <SubMenuHover menus={subComponents[0]["components"]} />
          )}
        </li>
        <li
          className="cursor-pointer"
          onMouseEnter={() => handleHover("peripherals")}
          onMouseLeave={() => handleHover(null)}
        >
          периферия
          {activeMenu === "peripherals" && (
            <SubMenuHover menus={subComponents[0]["peripherals"]} />
          )}
        </li>
        <li
          className="cursor-pointer"
          onMouseEnter={() => handleHover("laptops")}
          onMouseLeave={() => handleHover(null)}
        >
          лаптопи
          {activeMenu === "laptops" && (
            <SubMenuHover menus={subComponents[0]["laptops"]} />
          )}
        </li>
        <li className="cursor-pointer">монитори</li>
        <li
          className="cursor-pointer"
          onMouseEnter={() => handleHover("second-hand")}
          onMouseLeave={() => handleHover(null)}
        >
          втора употреба
          {activeMenu === "second-hand" && (
            <SubMenuHover menus={subComponents[0]["second-hand"]} />
          )}
        </li>
        <li className="cursor-pointer">сервиз</li>
        <li className="cursor-pointer">контакти</li>
      </ul>
    </nav>
  );
};

export default SubNav;
