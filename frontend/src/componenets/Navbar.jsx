import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom"

function Navbar() {
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  return (
    <div className="navbar bg-base-200 shadow-sm px-5">
      <div className="flex-1">
        <Link to="/" className="btn btn-ghost text-xl">TrackExpense</Link>
      </div>
      {isLoggedIn ? (
        <div className="flex-none">
          <ul className="menu menu-horizontal px-1">
            <li>
              <Link to="/create">Create</Link>
            </li>
            <li>
              <a>Logout</a>
            </li>
          </ul>
        </div>
      ) : (
        <div className="flex-none">
          <ul className="menu menu-horizontal px-1">
            <li>
              <Link to="/signin" className="text-lg">Login</Link>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
}

export default Navbar;
