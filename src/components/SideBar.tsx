"use client";

import React, { useState } from "react";
import "./SideBar.css";

const SideBar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button className="sidebar-toggle" onClick={() => setIsOpen(!isOpen)}>
        ☰
      </button>
      <div className={`sidebar ${isOpen ? "open" : ""}`}>
        <button className="close-btn" onClick={() => setIsOpen(false)}>
          ✖
        </button>
        <div className="sidebar-content">
          <img src="/sidebar.jpg" className="logo" />
          <ul>
            <li>
              <a href="#">View All Audios</a>
            </li>
            <li>
              <a href="#">About LCSCLO</a>
            </li>
            <li>
              <a href="#">Need Help?</a>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
};

export default SideBar;
