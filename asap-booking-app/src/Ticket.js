import React, { useEffect, useState } from "react";
import "./Ticket.css";
import InventoryIcon from "@mui/icons-material/Inventory";
import ArrowCircleRightOutlinedIcon from "@mui/icons-material/ArrowCircleRightOutlined";
import CancelOutlinedIcon from "@mui/icons-material/CancelOutlined";
import SwapHorizontalCircleOutlinedIcon from "@mui/icons-material/SwapHorizontalCircleOutlined";
// import CheckCircleOutlinedIcon from "@mui/icons-material/CheckCircleOutlined";
import {
  onSnapshot,
  query,
  where,
  orderBy,
  updateDoc,
  doc,
  getDoc,
} from "firebase/firestore";
import { db, servicesColRef, ticketsColRef } from "./Firebase";

function Ticket() {
  // state for activating or deactivating a session
  const [checked, setChecked] = useState("true");

  // state for storing the service ID
  const [serviceID, setServiceID] = useState("1");
  // state for counting waiting, done, swapped and skipped tickets
  const [countRemaining, setCountRemaining] = useState(0);
  const [countDone, setCountDone] = useState(0);
  const [countSwapped, setCountSwapped] = useState(0);
  const [countSkipped, setCountSkipped] = useState(0);

  // state for storing waiting tickets,  done tickets, skipped tickets, current ticket, and next ticket
  const [waitingTickets, setWaitingTickets] = useState([]);
  const [ticketCurrent, setTicketCurrrent] = useState([]);
  const [ticketNext, setTicketNext] = useState([]);
  const [doneTickets, setDoneTickets] = useState([]);
  const [skippedTickets, setSkippedTickets] = useState([]);
  const [swappedTickets, setSwappedTickets] = useState([]);

  useEffect(() => {
    // querying the tickets collection.
    const queryTickets = query(
      ticketsColRef,
      where("status", "in", [
        "waiting",
        "done",
        "swapped",
        "in progress",
        "skipped",
      ]),
      where("serviceId", "==", serviceID)
    );

    // subscribing to a realtime listener in the database in order to retrieve data.
    const unsubscribe = onSnapshot(queryTickets, (snapshot) => {
      let totalRemaining = 0;
      let totalDone = 0;
      let totalSwapped = 0;
      let totalSkipped = 0;
      let waitingTickets = [];
      let doneTickets = [];

      // looping through each doc in the database (i.e "tickets" collection) to retrieve data.
      snapshot.docs.forEach((doc) => {
        if (doc.data().status === "waiting") {
          totalRemaining++;
        } else if (doc.data().status === "done") {
          totalDone++;
          doneTickets.push({ ...doc.data(), id: doc.id });
        } else if (doc.data().status === "swapped") {
          totalSwapped++;
          swappedTickets.push({ ...doc.data(), id: doc.id });
        } else if (doc.data().status === "skipped") {
          totalSkipped++;
          skippedTickets.push({ ...doc.data(), id: doc.id });
        }
        if (doc.data().status === "waiting") {
          waitingTickets.push({ ...doc.data(), id: doc.id });
        }
      });

      // updating the sate of the counting variables.
      setCountRemaining(totalRemaining);
      setCountDone(totalDone);
      setCountSwapped(totalSwapped);
      setCountSkipped(totalSkipped);

      // updating the state of waiting, done, skipped and swapped tickets.
      setWaitingTickets(
        waitingTickets.sort((a, b) => a.timestamp - b.timestamp)
      );
      setDoneTickets(doneTickets);
      setSkippedTickets(skippedTickets);
      setSwappedTickets(swappedTickets);

      // updating the state of current and next tickets.
      setTicketCurrrent(waitingTickets[0]);
      setTicketNext(waitingTickets[1]);

      console.log(waitingTickets);
      console.log("************************");
      console.log(doneTickets);
      console.log(swappedTickets);
      console.log(skippedTickets);
    });

    return unsubscribe;
  }, [serviceID]);

  useEffect(() => {
    console.log(ticketCurrent);
    console.log("######################");
    console.log(ticketNext);
  }, [waitingTickets]);

  const handleNextTicket = () => {
    const ticketCurrentId = ticketCurrent?.id;
    if (ticketCurrentId) {
      const ticketsColRef = doc(db, "tickets", ticketCurrentId);
      updateDoc(ticketsColRef, {
        status: "done",
      })
        .then(() => {
          console.log(ticketCurrent.ticketNumber + " is done 🎉");
        })
        .catch((error) => console.log(error.message));
    } else {
      console.log("All tickets are done");
    }
  };

  const handleSkipped = () => {
    const ticketCurrentId = ticketCurrent?.id;
    if (ticketCurrentId) {
      const ticketsColRef = doc(db, "tickets", ticketCurrentId);
      updateDoc(ticketsColRef, {
        status: "skipped",
      })
        .then(() => {
          console.log(ticketCurrent.ticketNumber + " is skipped");
        })
        .catch((error) => console.log(error.message));
    } else {
      return;
    }
  };

  return (
    <div className="ticket">
      {/* Ticket header */}
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
          <select
            className="ticket--menuDeskNumber"
            onChange={(e) => setServiceID(e.target.value)}
            value={serviceID}
          >
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
          </select>
        </div>
        <div className="ticket--menuAssignedService">
          <InventoryIcon />
        </div>
      </div>

      {/* Ticket body */}
      <div className="ticket--body">
        <div className="ticket--current">
          <p> Current</p>
          <h2>{ticketCurrent?.ticketNumber}</h2>
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
          <h2> {ticketNext?.ticketNumber}</h2>
        </div>
        <div
          style={{ backgroundColor: checked ? "#f1635b" : "gray" }}
          className="ticket--cancle"
          onClick={handleSkipped}
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
        {/* <div
          style={{ backgroundColor: checked ? "#82c91e" : "lightgray" }}
          className="ticket--markDone"
        >
          <CheckCircleOutlinedIcon />
        </div> */}
        <div className="ticket--countInfo">
          <div className="ticket--remaining">
            <h2> Remaining</h2>
            <h2 className="ticket--remainingNumber"> {countRemaining}</h2>
          </div>
          <div className="ticket--skipped">
            <h2>Skipped</h2>
            <h2 className="ticket--skippedNumber"> {countSkipped}</h2>
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
