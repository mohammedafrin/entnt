import React, { useState } from "react";
import AdminModule from "./components/AdminModule";
import Dashboard from "./components/Dashboard";
import Notifications from "./components/Notifications";
import CalendarView from "./components/CalendarView";
import Header from "./components/Header";
import "./styles/App.css";

function App() {
  const [activeModule, setActiveModule] = useState("Dashboard");

  const renderModule = () => {
    switch (activeModule) {
      case "Admin":
        return <AdminModule />;
      case "Dashboard":
        return <Dashboard />;
      case "Notifications":
        return <Notifications />;
      case "Calendar":
        return <CalendarView />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="app-container">
      <Header setActiveModule={setActiveModule} />
      <div className="main-content">{renderModule()}</div>
    </div>
  );
}

export default App;
