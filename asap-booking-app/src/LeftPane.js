import React from "react";
import "./LeftPane.css";
import PaneOptions from "./PaneOptions";
import ConfirmationNumberIcon from "@mui/icons-material/ConfirmationNumber";
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
          <PaneOptions Icon={ConfirmationNumberIcon} name="TICKET" />
        </div>
      </div>
      <div className="leftPane--footer">ASAPBooking &copy; 2023</div>
    </div>
  );
}

export default LeftPane;
