import React, { useEffect, useState } from "react";
import "./LeftPane.css";
import PaneOptions from "./PaneOptions";
import ConfirmationNumberIcon from "@mui/icons-material/ConfirmationNumber";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import LibraryAddOutlinedIcon from "@mui/icons-material/LibraryAddOutlined";
import { useDispatch } from "react-redux";
import { ticket, ticketList, ticketService } from "./features/paneOptionSlice";

function LeftPane() {
  const [isActive, setIsActive] = useState("");
  const dispatch = useDispatch();

  useEffect(() => {
    console.log(isActive);
  }, [isActive]);

  const handleClick = (name) => {
    if (name === "TICKET CONTROL") {
      dispatch(ticket({ name: name }));
      setIsActive("ticket-control");
    } else if (name === "TICKET LIST") {
      dispatch(ticketList({ name: name }));
      setIsActive("ticket-list");
    } else {
      dispatch(ticketService({ name: name }));

      setIsActive("add-service");
    }
  };
  return (
    <div className="leftPane-container">
      <div className="leftPane">
        <div className="leftPane--top">
          <a href="#">
            <img src="images/logo.png" />
          </a>
        </div>
        <div className="leftPane--bottom">
          {/* <PaneOptions Icon={SettingsOutlinedIcon} name="TICKET CONTROL" /> */}
          <div className="paneOptions">
            <button
              onClick={() => handleClick("TICKET CONTROL")}
              className={`btn ${
                isActive == "ticket-control" ? "ticket-control" : "inactive"
              }`}
            >
              <div className="paneOptions--icon">
                <SettingsOutlinedIcon />
              </div>
              <h2 className="paneOptions--iconName">TICKET CONTROL</h2>
            </button>
          </div>

          {/* <PaneOptions Icon={ConfirmationNumberIcon} name="TICKET LIST" /> */}
          <div className="paneOptions">
            <button
              onClick={() => handleClick("TICKET LIST")}
              className={`btn ${
                isActive == "ticket-list" ? "ticket-list" : "inactive"
              }`}
            >
              <div className="paneOptions--icon">
                <ConfirmationNumberIcon />
              </div>
              <h2 className="paneOptions--iconName">TICKET LIST</h2>
            </button>
          </div>
          {/* add service tab */}
          <div className="paneOptions">
            <button
              onClick={() => handleClick("ADD SERVICE")}
              className={`btn ${
                isActive == "add-service" ? "add-service" : "inactive"
              }`}
            >
              <div className="paneOptions--icon">
                <LibraryAddOutlinedIcon />
              </div>
              <h2 className="paneOptions--iconName"> ADD SERVICE</h2>
            </button>
          </div>
        </div>
      </div>
      <div className="leftPane--footer">ASAPBooking &copy; 2023</div>
    </div>
  );
}

export default LeftPane;
