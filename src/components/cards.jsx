import React, { useState, useEffect } from "react";
import "./card.css"; // Import CSS file for styling

const Cards = ({ data }) => {
  const [filteredData, setFilteredData] = useState(data);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedLocation, setSelectedLocation] = useState("all");
  const [selectedSalary, setSelectedSalary] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  useEffect(() => {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const body = JSON.stringify({
      limit: 10,
      offset: 0,
    });

    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body,
    };

    fetch(
      "https://api.weekday.technology/adhoc/getSampleJdJSON",
      requestOptions
    )
      .then((response) => response.json())
      .then((data) => {
        console.log(data); // Logging the fetched data
        setFilteredData(data); // Setting the fetched data to filteredData
      })
      .catch((error) => console.error(error));
  }, []);

  console.log(filteredData);

  const data1 = filteredData.jdList;

  return (
    <div>
      <div className="filters">
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
        >
          <option value="all">Job Role</option>
          {Array.from(new Set(data1?.map((item) => item.jobRole))).map(
            (role, index) => (
              <option key={index} value={role}>
                {role}
              </option>
            )
          )}
        </select>

        <select
          value={selectedLocation}
          onChange={(e) => setSelectedLocation(e.target.value)}
        >
          <option value="all">Location</option>
          {Array.from(new Set(data1?.map((item) => item.location))).map(
            (location, index) => (
              <option key={index} value={location}>
                {location}
              </option>
            )
          )}
        </select>
        <select
          value={selectedSalary}
          onChange={(e) => setSelectedSalary(e.target.value)}
        >
          <option value="all">Min Base Pay</option>
          {Array.from(new Set(data1?.map((item) => item))).map(
            (item, index) => (
              <option key={index} value={item.minJdSalary}>
                {item.minJdSalary}
                {item.salaryCurrencyCode}
              </option>
            )
          )}
        </select>

        <input
          type="text"
          placeholder="Search Company Name..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div className="card-grid-container">
        <div className="card-grid">
          {Array.isArray(data1) &&
            data1
              .filter((item) => {
                // Filter based on selected category
                return (
                  selectedCategory === "all" ||
                  item.jobRole === selectedCategory
                );
              })
              .filter((item) => {
                // Filter based on selected category
                return (
                  selectedLocation === "all" ||
                  item.location === selectedLocation
                );
              })
              .filter((item) => {
                // Filter based on selected category
                return (
                  selectedSalary === "all" ||
                  item.minJdSalary === selectedSalary
                );
              })
              .filter((item) => {
                // Filter based on company name
                return item.companyName
                  .toLowerCase()
                  .includes(searchTerm.toLowerCase());
              })
              .map((item, index) => (
                <div className="card" key={index}>
                  <div className="card-header">
                    <img
                      src={item.logoUrl}
                      alt="Company Logo"
                      className="logo"
                    />
                    <div>
                      <p
                        className="title"
                        style={{ margin: "2px 0", fontSize: "12px" }}
                      >
                        {item.companyName.toUpperCase()}
                      </p>
                      <p
                        style={{
                          margin: "2px 0",
                          fontSize: "16px",
                          color: "gray",
                        }}
                      >
                        {item.jobRole.toUpperCase()}
                      </p>
                      <p style={{ margin: "2px 0", fontSize: "12px" }}>
                        {item.location.toUpperCase()}
                      </p>
                    </div>
                  </div>
                  <div className="card-content">
                    <p className="description">{item.jobDetailsFromCompany}</p>
                    <a
                      className="link"
                      href={item.jobUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{ color: "blue", cursor: "pointer" }}
                    >
                      View Job
                    </a>
                    {item.minExp !== null && (
                      <p style={{ textAlign: "left" }}>
                        Minimum Experience
                        <br />
                        {item.minExp} years
                      </p>
                    )}
                    <button
                      className="apply-button"
                      style={{
                        color: "black",
                        fontWeight: "700",
                        fontSize: "0.8em",
                      }}
                    >
                      ⚡ Easy Apply
                    </button>
                  </div>
                </div>
              ))}
        </div>
      </div>
    </div>
  );
};

export default Cards;
