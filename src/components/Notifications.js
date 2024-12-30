import React, { useEffect, useState } from "react";
import "./../styles/App.css";

function Notifications() {
  const [overdue, setOverdue] = useState([]);
  const [dueToday, setDueToday] = useState([]);

  useEffect(() => {
    const companies = JSON.parse(localStorage.getItem("companies")) || [];
    const today = new Date().toISOString().split("T")[0];

    const overdueCompanies = [];
    const dueTodayCompanies = [];

    companies.forEach((company) => {
      const nextCommunicationDate = company.nextCommunication;
      if (nextCommunicationDate) {
        if (nextCommunicationDate < today) {
          overdueCompanies.push(company);
        } else if (nextCommunicationDate === today) {
          dueTodayCompanies.push(company);
        }
      }
    });

    setOverdue(overdueCompanies);
    setDueToday(dueTodayCompanies);
  }, []);

  return (
    <div className="container">
      <h2>Notifications</h2>
      <div className="notification-section">
        <h3>Overdue Communications</h3>
        {overdue.length > 0 ? (
          overdue.map((company, index) => (
            <p key={index}><strong>{company.name}</strong> - Overdue</p>
          ))
        ) : (
          <p>No overdue communications.</p>
        )}
      </div>
      <div className="notification-section">
        <h3>Communications Due Today</h3>
        {dueToday.length > 0 ? (
          dueToday.map((company, index) => (
            <p key={index}><strong>{company.name}</strong> - Due Today</p>
          ))
        ) : (
          <p>No communications due today.</p>
        )}
      </div>
    </div>
  );
}

export default Notifications;
