import React from "react";
import { NavLink } from "react-router-dom";

const Navbar = () => {
  return (
    <div className="navbar">
      <ul>
        <li>
          <NavLink to="/politics/">정치</NavLink>
        </li>
        <li>
          <NavLink to="/economy">경제</NavLink>
        </li>
        <li>
          <NavLink to="/society">사회</NavLink>
        </li>
        <li>
          <NavLink to="/world">국제</NavLink>
        </li>
        <li>
          <NavLink to="/culture">문화</NavLink>
        </li>
        <li>
          <NavLink to="/philosophy">철학</NavLink>
        </li>
        <li>
          <NavLink to="/ideology">이념</NavLink>
        </li>
        <li>
          <NavLink to="/newspaper">신문</NavLink>
        </li>
      </ul>
    </div>
  );
};

export default Navbar;
