import React from "react";
import { Link } from "react-router-dom";
import "./header.css"

export default function Header () {



  return(
    <div className="app">
      <nav className="nav-bar">
        <h2 className="rebase-academy">
          Rebase Academy
        </h2>
        <ul className="links">
          <li>
            <Link to="/create-profile">Create Account</Link>
          </li>
          <li>
            <Link to="/view-profile">View Account</Link>
          </li>
          <li>
            <Link to="/edite-profile">Edit Account</Link>
          </li>
        </ul>
      </nav>
    </div>
  )
}