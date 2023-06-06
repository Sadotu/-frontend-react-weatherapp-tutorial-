import React from 'react';
import './TabBarMenu.css';
import {NavLink} from "react-router-dom";

function TabBarMenu() {
  return (
    <nav className="tab-bar">
      <ul>
        <li>
          <NavLink className={({ isActive }) => isActive && 'active'} to="/">
            Vandaag
          </NavLink>
        </li>
        <li>
          <NavLink className={({ isActive }) => isActive && 'active'} to="/komende-week">
            Komende week
          </NavLink>
        </li>
      </ul>
    </nav>
  );
}

export default TabBarMenu;
