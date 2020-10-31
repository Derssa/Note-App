import React, { useState } from "react";
import { Link } from "react-router-dom";
import MenuRoundedIcon from "@material-ui/icons/MenuRounded";
import { IconButton } from "@material-ui/core";

const Nav = ({ setIsLogin }) => {
  const logoutSubmit = () => {
    localStorage.clear();
    setIsLogin(false);
  };

  const [toggle, setToggle] = useState(false);

  return (
    <header>
      <div className="logo">
        <h1>
          <Link to="/">Note App</Link>
        </h1>
      </div>
      <div className="nav-menu-icon">
        <IconButton onClick={() => setToggle(true)}>
          <MenuRoundedIcon />
        </IconButton>
      </div>
      <ul className={toggle ? "toggle" : ""}>
        <li className="nav-menu">
          <Link onClick={() => setToggle(false)} to="/">
            Home
          </Link>
        </li>
        <li className="nav-menu">
          <Link onClick={() => setToggle(false)} to="/create">
            Create Note
          </Link>
        </li>
        <li className="nav-menu" onClick={logoutSubmit}>
          <Link onClick={() => setToggle(false)} to="/">
            Logout
          </Link>
        </li>
      </ul>
    </header>
  );
};

export default Nav;
