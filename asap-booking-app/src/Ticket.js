import React, { useEffect, useState } from "react";
import "./Ticket.css";
import InventoryIcon from "@mui/icons-material/Inventory";
import ArrowCircleRightOutlinedIcon from "@mui/icons-material/ArrowCircleRightOutlined";
import CancelOutlinedIcon from "@mui/icons-material/CancelOutlined";
import SwapHorizontalCircleOutlinedIcon from "@mui/icons-material/SwapHorizontalCircleOutlined";
import CheckCircleOutlinedIcon from "@mui/icons-material/CheckCircleOutlined";
import {
  onSnapshot,
  query,
  where,
  orderBy,
  updateDoc,
  doc,
  getDoc,
} from "firebase/firestore";
import { db, ticketsColRef } from "./Firebase";

function Ticket() {
  const [checked, setChecked] = useState("true");
  const [countRemaining, setCountRemaining] = useState(0);
  const [countDone, setCountDone] = useState(0);
  const [countSwapped, setCountSwapped] = useState(0);
  const [displayCurrentTicket, setDisplayCurrentTicket] = useState(null);
  const [displayNextTicket, setDisplayNextTicket] = useState(null);

  const [waitingTickets, setWaitingTickets] = useState([]);

  const [ticketCurrent, setTicketCurrrent] = useState([]);
  const [ticketNext, setTicketNext] = useState([]);
  const [doneTickets, setDoneTickets] = useState([]);
  const [currentTicketNumber, setCurrentTicketNumber] = useState(
    doneTickets.length
  );

  useEffect(() => {
    const queryTickets = query(
      ticketsColRef,
      where(
        "status",
        "in",
        ["waiting", "done", "swapped", "in progress"],
        orderBy("timestamp")
      )
    );
    const unsubscribe = onSnapshot(queryTickets, (snapshot) => {
      let totalRemaining = 0;
      let totalDone = 0;
      let totalSwapped = 0;
      let waitingTickets = [];
      let doneTickets = [];
      snapshot.docs.forEach((doc) => {
        if (doc.data().status === "waiting") {
          totalRemaining++;
        } else if (doc.data().status === "done") {
          totalDone++;
          doneTickets.push({ ...doc.data(), id: doc.id });
        } else if (doc.data().status === "swapped") {
          totalSwapped++;
        }
        if (
          doc.data().status === "waiting"
          // doc.data().status === "in progress"
        ) {
          waitingTickets.push({ ...doc.data(), id: doc.id });
        }
      });

      // settinng the current and next tickets
      setTicketCurrrent(waitingTickets[0]);
      setTicketNext(waitingTickets[1]);

      setCountRemaining(totalRemaining);
      setCountDone(totalDone);
      setCountSwapped(totalSwapped);
      setWaitingTickets(
        waitingTickets.sort((a, b) => a.timestamp - b.timestamp)
      );
      setDisplayCurrentTicket(waitingTickets[1]?.ticketNumber);
      setDisplayNextTicket(waitingTickets[0]?.ticketNumber);
      setDoneTickets(doneTickets);

      setCurrentTicketNumber(doneTickets.length);
      // console.log(waitingTickets);
      console.log(ticketCurrent);
      console.log("************************");
      console.log(ticketNext);
      // console.log(doneTickets);
      // console.log(currentTicketNumber);
    });

    return unsubscribe;
  }, []);

  // const handleNextTicket = () => {
  //   if (waitingTickets.length === 0) {
  //     alert("All tickets are served 🎉");
  //     return;
  //   }

  //   const currentTicket = waitingTickets[0];
  //   let ticketStatus;
  //   const ticketDocRef = doc(db, "tickets", currentTicket.id);
  //   getDoc(ticketDocRef).then((doc) => {
  //     ticketStatus = doc.data().status;
  //     console.log(ticketStatus);
  //   });
  //   let id;

  //   if (currentTicket.status !== "in progress") {
  //     id = currentTicket.id;
  //     const ticketDocRef = doc(db, "tickets", id);
  //     updateDoc(ticketDocRef, {
  //       status: "in progress",
  //     }).then(() => {
  //       console.log(`Ticket ${currentTicketNumber + 1} is now in progress.`);
  //     });
  //   } else if (ticketStatus === "done") {
  //     const nextTicketNumber = currentTicketNumber + 1;
  //     if (nextTicketNumber < waitingTickets.length) {
  //       const nextTicket = waitingTickets[nextTicketNumber];
  //       id = nextTicket.id;
  //       const ticketDocRef = doc(db, "tickets", id);
  //       updateDoc(ticketDocRef, {
  //         status: "in progress",
  //       }).then(() => {
  //         console.log(`Ticket ${nextTicketNumber + 1} is now in progress.`);
  //       });
  //     } else {
  //       alert("All tickets are served 🎉");
  //     }
  //   } else {
  //     console.log(
  //       "ticket already in progress! click done or cancel to proceed to next"
  //     );
  //   }
  //   if (currentTicket.status === "in progress") {
  //     id = currentTicket.id;
  //     const ticketDocRef = doc(db, "tickets", id);
  //     updateDoc(ticketDocRef, {
  //       status: "done",
  //     }).then(() => {
  //       console.log(`Ticket ${currentTicketNumber + 1} is now done.`);
  //     });
  //   }
  // };

  const handleNextTicket = () => {};

  const handleDoneTicket = () => {
    if (waitingTickets.length === 0) {
      alert("There are no tickets to mark as done.");
      return;
    }

    const currentTicket = waitingTickets[0];
    const nextTicket = waitingTickets[1];
    if (currentTicket.status !== "in progress") {
      alert("The current ticket is not in progress.");
      return;
    }

    const ticketDocRef = doc(db, "tickets", currentTicket.id);

    updateDoc(ticketDocRef, {
      status: "done",
    }).then(() => {
      console.log(`Ticket ${currentTicketNumber + 1} is now done.`);
    });
  };

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
          <p> Current</p>
          <h2>{displayCurrentTicket}</h2>
        </div>
        <div
          style={{ backgroundColor: checked ? "#2bb673" : "gray" }}
          type="submit"
          className="ticket--next"
          onClick={handleNextTicket}
        >
          <ArrowCircleRightOutlinedIcon />
        </div>
        <div className="ticket--update">
          <p> NEXT TICKET</p>
          <h2> {displayNextTicket}</h2>
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
          onClick={handleDoneTicket}
        >
          <CheckCircleOutlinedIcon />
        </div>
        <div className="ticket--countInfo">
          <div className="ticket--remaining">
            <h2> Remaining</h2>
            <h2 className="ticket--remainingNumber"> {countRemaining}</h2>
          </div>
          <div className="ticket--skipped">
            <h2>Skipped</h2>
            <h2 className="ticket--skippedNumber"> 0</h2>
          </div>
          <div className="ticket--swapped">
            <h2>Swapped</h2>
            <h2 className="ticket--swappedNumber"> {countSwapped}</h2>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Ticket;
