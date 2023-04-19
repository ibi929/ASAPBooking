import React, { useEffect, useState } from "react";
import "./Ticket.css";
import InventoryIcon from "@mui/icons-material/Inventory";
import ArrowCircleRightOutlinedIcon from "@mui/icons-material/ArrowCircleRightOutlined";
import CancelOutlinedIcon from "@mui/icons-material/CancelOutlined";
import SwapHorizontalCircleOutlinedIcon from "@mui/icons-material/SwapHorizontalCircleOutlined";
import CheckCircleOutlinedIcon from "@mui/icons-material/CheckCircleOutlined";
import { onSnapshot, query, where } from "firebase/firestore";
import { colRef } from "./Firebase";
function Ticket() {
  const [checked, setChecked] = useState("");
  const [countRemaining, setCountRemaining] = useState(0);
  const [countDone, setCountDone] = useState(0);

  useEffect(() => {
    let totalRemaining = 0;
    const queryRemaining = query(colRef, where("status", "==", "waiting"));
    const unsubscribe = onSnapshot(queryRemaining, (snapshot) => {
      snapshot.docs.map(() => {
        setCountRemaining(totalRemaining++);
        setCountRemaining(0);
      });
    });
    return unsubscribe;
  }, []);

  useEffect(() => {
    let totalDone = 0;
    const queryDone = query(colRef, where("status", "==", "done"));
    const unsubscribe = onSnapshot(queryDone, (snapshot) => {
      snapshot.docs.map(() => {
        setCountDone(totalDone++);
      });
    });
    return unsubscribe;
  }, []);
  useEffect(() => {
    // let totalDone = 0;
    // const queryDone = query(colRef, where("status", "==", "done"));
    // const unsubscribe = onSnapshot(queryDone, (snapshot) => {
    //   snapshot.docs.map(() => {
    //     setCountDone(totalDone++);
    //   });
    // });
    // return unsubscribe;
  }, []);

  return (
    <div className="ticket">
      <div className="ticket--header">
        <div className="ticket--menu">
          <h2 className="ticket--menuSession"> Session</h2>
          <input
            type="checkbox"
            onChange={(e) => setChecked(e.target.checked)}
            checked={checked ? "checked" : ""}
          />
        </div>
        <div className="ticket--menuDesk">
          <h2 className="ticket--menuDeskName"> Desk:</h2>
          <select className="ticket--menuDeskNumber">
            <option> 1</option>
            <option> 2</option>
          </select>
        </div>
        <div className="ticket--menuAssignedService">
          <InventoryIcon />
        </div>
      </div>
      {/* ticket body */}
      <div className="ticket--body">
        <div className="ticket--current">
          <h2>CURRENT</h2>
        </div>
        <div
          style={{ backgroundColor: checked ? "#2bb673" : "gray" }}
          type="submit"
          className="ticket--next"
        >
          <ArrowCircleRightOutlinedIcon />
        </div>
        <div className="ticket--update">
          <h2> NEXT TICKET</h2>
        </div>
        <div
          style={{ backgroundColor: checked ? "#f1635b" : "gray" }}
          className="ticket--cancle"
        >
          <CancelOutlinedIcon />
        </div>
        <div className="ticket--swap">
          <SwapHorizontalCircleOutlinedIcon />
        </div>

        <div className="ticket--done">
          <h2>Done</h2>
          <h2 className="ticket--doneNumber">{countDone}</h2>
        </div>
        <div
          style={{ backgroundColor: checked ? "#82c91e" : "lightgray" }}
          className="ticket--markDone"
        >
          <CheckCircleOutlinedIcon />
        </div>
        <div className="ticket--countInfo">
          <div className="ticket--remaining">
            <h2> Remaining</h2>
            <h2 className="ticket--remainingNumber"> {countRemaining}</h2>
          </div>
          <div className="ticket--upcoming">
            <h2>Upcoming</h2>
            <h2 className="ticket--upcomingNumber"> 0</h2>
          </div>
          <div className="ticket--swapped">
            <h2>Swapped</h2>
            <h2 className="ticket--swappedNumber"> 0</h2>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Ticket;
