import React, { useEffect, useState } from "react";
import "./PaneOptions.css";
import { useDispatch, useSelector } from "react-redux";
import {
  selectPaneOption,
  ticket,
  ticketList,
} from "./features/paneOptionSlice";

function PaneOptions({ name, Icon }) {
  const paneOption = useSelector(selectPaneOption);
  const dispatch = useDispatch();
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    handleClick(name);
    console.log(paneOption?.name);
  }, []);

  const handleClick = (name) => {
    if (name === "TICKET CONTROL") {
      dispatch(ticket({ name: name }));
      setIsActive(!isActive);
    } else {
      dispatch(ticketList({ name: name }));
      setIsActive(true);
    }
  };
  return (
    <div className="paneOptions">
      <button
        onClick={() => handleClick(name)}
        className={`btn ${isActive ? "active" : "inactive"}`}
      >
        <Icon className="paneOptions--icon " />
        <h2 className="paneOptions--iconName">{name}</h2>
      </button>
    </div>
  );
}

export default PaneOptions;
