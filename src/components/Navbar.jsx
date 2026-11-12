import React from "react";
import { NavLink } from "react-router";
const Navbar = () => {
  return (
    <div>
      <nav className="flex items-center justify-between mb-10 w-full">
        <h1>Logo</h1>
        <div className="flex items-center justify-center gap-20">
          <NavLink to={"/"}>Home</NavLink>
          <NavLink to={"/about"}>About</NavLink>
          <NavLink to={"/products"}>Products</NavLink>
        </div>
        <button className="cursor-pointer">Login</button>
      </nav>
    </div>
  );
};

export default Navbar;
