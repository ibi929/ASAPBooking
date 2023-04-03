import React from "react";
import "./Header.css";
import PowerSettingsNewIcon from "@mui/icons-material/PowerSettingsNew";

function Header() {
  return (
    <div className="header">
      <h1 className="header--title"> ZAYED UNIVERSITY</h1>
      <a className="header-logout" href="#">
        <PowerSettingsNewIcon />
      </a>
    </div>
  );
}

export default Header;
