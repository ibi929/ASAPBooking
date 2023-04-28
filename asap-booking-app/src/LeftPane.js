import React, { useState } from "react";
import "./LeftPane.css";
import PaneOptions from "./PaneOptions";
import ConfirmationNumberIcon from "@mui/icons-material/ConfirmationNumber";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";

function LeftPane() {
  return (
    <div className="leftPane-container">
      <div className="leftPane">
        <div className="leftPane--top">
          <a href="#">
            <img src="images/logo.png" />
          </a>
        </div>
        <div className="leftPane--bottom">
          <PaneOptions Icon={SettingsOutlinedIcon} name="TICKET CONTROL" />
          <PaneOptions Icon={ConfirmationNumberIcon} name="TICKET LIST" />
        </div>
      </div>
      <div className="leftPane--footer">ASAPBooking &copy; 2023</div>
    </div>
  );
}

export default LeftPane;
