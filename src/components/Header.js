import React from "react";
import "./../styles/App.css";

function Header({ setActiveModule }) {
  return (
    <div className="header">
      <h1>Calendar App</h1>
      <div className="nav">
        <button onClick={() => setActiveModule("Dashboard")}>Dashboard</button>
        <button onClick={() => setActiveModule("Admin")}>Admin Module</button>
        <button onClick={() => setActiveModule("Notifications")}>
          Notifications
        </button>
        <button onClick={() => setActiveModule("Calendar")}>
          Calendar View
        </button>
      </div>
    </div>
  );
}

export default Header;
