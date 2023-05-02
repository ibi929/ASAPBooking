import React from "react";
import "./Header.css";
import NotificationsNoneOutlinedIcon from "@mui/icons-material/NotificationsNoneOutlined";

function Header() {
  return (
    <div className="header">
      <h1 className="header--title"> ZAYED UNIVERSITY</h1>
      <a className="header-logout" href="#">
        {/* <NotificationsNoneOutlinedIcon /> */}
      </a>
    </div>
  );
}

export default Header;
