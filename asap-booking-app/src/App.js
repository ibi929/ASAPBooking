import React from "react";
import "./App.css";
import LeftPane from "./LeftPane";
import Header from "./Header";
import Ticket from "./Ticket";

function App() {
  return (
    <div className="app">
      {/* left pane */}
      <LeftPane />
      {/* app body */}
      <div className="app-body">
        <Header />
        <Ticket />
      </div>
    </div>
  );
}

export default App;
