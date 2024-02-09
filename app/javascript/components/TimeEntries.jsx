import React, { useState, useEffect } from "react";
import { toDecimal, toHHMM } from 'hour-parser'
const TimeEntries = () => {
  const [timeEntries, setTimeEntries] = useState([]);

  useEffect(() => {
    const url = "/api/v1/time_entries/index";
    fetch(url)
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        throw new Error("Network response was not ok.");
      })
      .then((res) => setTimeEntries(res))
      .catch(() => navigate("/"));
  }, []);

  const allTimeEntries = timeEntries.map((timeEntry, index) => (
    <div key={index} className="row">
      <div className="col-8">
        <div>Tracked By <strong>{timeEntry.user_name}</strong></div>
        <div><strong>{timeEntry.project_name}</strong> ({timeEntry.client_name})</div>
        <div>{timeEntry.task}</div>
        {timeEntry.notes ? <div style={{ fontWeight: 'lighter' }}>{timeEntry.notes}</div> : null}
      </div>
      <div className="col-4 d-flex align-items-center">
        <span>{toHHMM(timeEntry.time_hours)}</span>
      </div>
      <hr></hr>
    </div>
  ));
  const noTimeEntries = (
    <div className="vw-100 vh-50 d-flex align-items-center justify-content-center">
      <h4>
        No matching time entries found.  Try new search filters.
      </h4>
    </div>
  );

  return (
    <>
      <section className="jumbotron jumbotron-fluid text-center">
        <div className="container py-5">
          <h1 className="display-4">Time Entries</h1>
        </div>
      </section>
      <div className="py-5">
        <main className="container">
            {timeEntries.length > 0 ? allTimeEntries : noTimeEntries}
        </main>
      </div>
    </>
  );
};

export default TimeEntries;