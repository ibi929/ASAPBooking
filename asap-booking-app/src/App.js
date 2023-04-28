import React, { useEffect } from "react";
import "./App.css";
import LeftPane from "./LeftPane";
import Header from "./Header";
import Ticket from "./Ticket";
import TicketList from "./TicketList";

function App() {
  useEffect(() => {
    document.title = "ASAPBooking";
  }, []);
  return (
    <div className="app">
      {/* left pane */}
      <LeftPane className="leftPane" />
      {/* app body */}
      <div className="app-body">
        <Header />
        {/* <Ticket /> */}
        <TicketList />
      </div>
    </div>
  );
}

export default App;
