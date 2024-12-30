import React, { useState, useEffect } from "react";
import "./../styles/App.css";

function AdminModule() {
  const [companies, setCompanies] = useState([]);
  const [company, setCompany] = useState({
    name: "",
    location: "",
    linkedIn: "",
    emails: "",
    phoneNumbers: "",
    comments: "",
    periodicity: "",
  });

  useEffect(() => {
    const storedCompanies = JSON.parse(localStorage.getItem("companies")) || [];
    setCompanies(storedCompanies);
  }, []);

  const handleChange = (e) => {
    setCompany({ ...company, [e.target.name]: e.target.value });
  };

  const addCompany = () => {
    const updatedCompanies = [...companies, company];
    localStorage.setItem("companies", JSON.stringify(updatedCompanies));
    setCompanies(updatedCompanies);
    setCompany({
      name: "",
      location: "",
      linkedIn: "",
      emails: "",
      phoneNumbers: "",
      comments: "",
      periodicity: "",
    });
  };

  const deleteCompany = (index) => {
    const updatedCompanies = companies.filter((_, i) => i !== index);
    localStorage.setItem("companies", JSON.stringify(updatedCompanies));
    setCompanies(updatedCompanies);
  };

  return (
    <div className="container">
      <h2>Admin Module</h2>
      <div className="form">
        <input
          type="text"
          name="name"
          placeholder="Company Name"
          value={company.name}
          onChange={handleChange}
        />
        <input
          type="text"
          name="location"
          placeholder="Location"
          value={company.location}
          onChange={handleChange}
        />
        <input
          type="text"
          name="linkedIn"
          placeholder="LinkedIn Profile"
          value={company.linkedIn}
          onChange={handleChange}
        />
        <input
          type="text"
          name="emails"
          placeholder="Emails (comma-separated)"
          value={company.emails}
          onChange={handleChange}
        />
        <input
          type="text"
          name="phoneNumbers"
          placeholder="Phone Numbers (comma-separated)"
          value={company.phoneNumbers}
          onChange={handleChange}
        />
        <input
          type="text"
          name="comments"
          placeholder="Comments"
          value={company.comments}
          onChange={handleChange}
        />
        <input
          type="text"
          name="periodicity"
          placeholder="Communication Periodicity"
          value={company.periodicity}
          onChange={handleChange}
        />
        <button onClick={addCompany}>Add Company</button>
      </div>
      <div>
        <h3>Company List</h3>
        {companies.length > 0 ? (
          <table>
            <thead>
              <tr>
                <th>Company Name</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {companies.map((comp, index) => (
                <tr key={index}>
                  <td>{comp.name}</td>
                  <td>
                    <button onClick={() => deleteCompany(index)}>
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>No companies available.</p>
        )}
      </div>
    </div>
  );
}

export default AdminModule;
