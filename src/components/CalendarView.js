import React, { useState, useEffect } from "react";
import { Pie } from "react-chartjs-2";
import "chart.js/auto";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import "../styles/CalendarView.css";

function CalendarView() {
  const [companies, setCompanies] = useState([]);
  const [selectedCompany, setSelectedCompany] = useState("");
  const [chartData, setChartData] = useState({});
  const [selectedDate, setSelectedDate] = useState(null);

  useEffect(() => {
    // Fetch companies from local storage
    const storedCompanies = JSON.parse(localStorage.getItem("companies")) || [];
    setCompanies(storedCompanies);

    // Generate initial chart data for all companies
    const initialData = storedCompanies.reduce((acc, company) => {
      const communicationMethods = company.communicationMethods || "";
      communicationMethods.split(",").forEach((method) => {
        acc[method] = (acc[method] || 0) + 1;
      });
      return acc;
    }, {});

    setChartData({
      labels: Object.keys(initialData),
      datasets: [
        {
          data: Object.values(initialData),
          backgroundColor: Object.keys(initialData).map((_, i) => `hsl(${(i * 50) % 360}, 70%, 60%)`),
          hoverBackgroundColor: Object.keys(initialData).map((_, i) => `hsl(${(i * 50) % 360}, 70%, 50%)`),
        },
      ],
    });
  }, []);

  const handleFilterChange = (e) => {
    const companyName = e.target.value;
    setSelectedCompany(companyName);

    if (companyName === "") {
      // Show aggregated data for all companies
      const aggregatedData = companies.reduce((acc, company) => {
        const communicationMethods = company.communicationMethods || "";
        communicationMethods.split(",").forEach((method) => {
          acc[method] = (acc[method] || 0) + 1;
        });
        return acc;
      }, {});

      setChartData({
        labels: Object.keys(aggregatedData),
        datasets: [
          {
            data: Object.values(aggregatedData),
            backgroundColor: Object.keys(aggregatedData).map((_, i) => `hsl(${(i * 50) % 360}, 70%, 60%)`),
            hoverBackgroundColor: Object.keys(aggregatedData).map((_, i) => `hsl(${(i * 50) % 360}, 70%, 50%)`),
          },
        ],
      });
      return;
    }

    const company = companies.find((c) => c.name === companyName);
    if (company) {
      const communicationMethods = company.communicationMethods || "";
      const methodCounts = communicationMethods
        .split(",")
        .reduce((acc, method) => {
          acc[method] = (acc[method] || 0) + 1;
          return acc;
        }, {});

      setChartData({
        labels: Object.keys(methodCounts),
        datasets: [
          {
            data: Object.values(methodCounts),
            backgroundColor: Object.keys(methodCounts).map((_, i) => `hsl(${(i * 50) % 360}, 70%, 60%)`),
            hoverBackgroundColor: Object.keys(methodCounts).map((_, i) => `hsl(${(i * 50) % 360}, 70%, 50%)`),
          },
        ],
      });
    } else {
      setChartData({});
    }
  };

  const handleDateClick = (info) => {
    console.log("Selected date:", info.dateStr); // Add a log to see if it's firing correctly
    setSelectedDate(info.dateStr);
  };

  return (
    <div className="calendar-view-container">
      <h2>Calendar View</h2>
      <div className="filter-section">
        <label htmlFor="companyFilter">Select a Company:</label>
        <select
          id="companyFilter"
          value={selectedCompany}
          onChange={handleFilterChange}
        >
          <option value="">All Companies</option>
          {companies.map((company, index) => (
            <option key={index} value={company.name}>
              {company.name}
            </option>
          ))}
        </select>
      </div>

      {chartData.labels ? (
        <div className="chart-section">
          <h3>
            Communication Methods {selectedCompany ? `for ${selectedCompany}` : "for All Companies"}
          </h3>
          <div className="chart-wrapper" style={{ width: "6cm", height: "6cm" }}>
            <Pie
              data={chartData}
              options={{
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                  legend: {
                    position: "bottom",
                    labels: { boxWidth: 10 },
                  },
                },
              }}
            />
          </div>
        </div>
      ) : (
        <div className="chart-placeholder">
          <p>Please select a company to view communication statistics.</p>
        </div>
      )}

      <div className="calendar-section">
        <h3>Full Calendar</h3>
        <FullCalendar
          plugins={[dayGridPlugin]}
          initialView="dayGridMonth"
          fixedWeekCount={false}
          firstDay={0}
          dateClick={handleDateClick}
          height="auto"
          contentHeight="auto"
          aspectRatio={1.5}
        />
        {selectedDate && (
          <p>Calendar view on {selectedDate}</p> // Display selected date here
        )}
      </div>
    </div>
  );
}

export default CalendarView;
