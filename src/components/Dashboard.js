import React from "react";

function Dashboard() {
  const companies = JSON.parse(localStorage.getItem("companies")) || [];

  return (
    <div>
      <h2>Dashboard</h2>
      <table>
        <thead>
          <tr>
            <th>Company Name</th>
            <th>Location</th>
            <th>Next Communication</th>
          </tr>
        </thead>
        <tbody>
          {companies.map((company, index) => (
            <tr key={index}>
              <td>{company.name}</td>
              <td>{company.location}</td>
              <td>{company.periodicity}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Dashboard;
