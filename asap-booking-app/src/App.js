import React, { useEffect } from "react";
import "./App.css";
import LeftPane from "./LeftPane";
import Header from "./Header";
import Ticket from "./Ticket";
import TicketList from "./TicketList";
import { useSelector } from "react-redux";
import { selectPaneOption } from "./features/paneOptionSlice";
import TicketService from "./TicketService";

function App() {
  const paneOption = useSelector(selectPaneOption);
  useEffect(() => {
    document.title = "ASAPBooking";
  }, [paneOption?.name]);
  return (
    <div className="app">
      {/* left pane */}
      <LeftPane className="leftPane" />
      {/* app body */}
      <div className="app-body">
        <Header />
        {paneOption?.name === "TICKET CONTROL" ? (
          <Ticket />
        ) : paneOption?.name === "TICKET LIST" ? (
          <TicketList />
        ) : (
          <TicketService />
        )}
      </div>
    </div>
  );
}

export default App;
