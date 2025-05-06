"use client";

import React, { useState } from "react";
import "./SideBar.css";
import { SignInButton, SignedIn, SignedOut, UserButton } from "@clerk/nextjs";

const SideBar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button className="sidebar-toggle" onClick={() => setIsOpen(!isOpen)}>
        ☰
      </button>
      <div className={`sidebar ${isOpen ? "open" : ""}`}>
        <div className="sidebar-image">
          <img src="/sidebarImage.png" className="logo" />
          <button className="close-btn" onClick={() => setIsOpen(false)}>
            ✖
          </button>
        </div>
        <div className="sidebar-links">
          <ul>
            <li>
              <button onClick={() => setIsOpen(false)}>
                <a href="#">View All Audios</a>
              </button>
            </li>
            <li>
              <a href="https://lcslo.org/">About LCSCLO</a>
            </li>
            <li>
              <a href="https://lcslo.org/contact-us/">Need Help?</a>
            </li>
            <li>
              <SignedOut>
                <a>
                  <SignInButton />
                </a>
              </SignedOut>
              <SignedIn>
                <UserButton />
              </SignedIn>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
};

export default SideBar;
