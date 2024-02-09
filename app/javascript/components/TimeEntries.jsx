import React, { useState, useEffect } from "react";
import { toDecimal, toHHMM } from 'hour-parser'
import UserSelect from "./UserSelect";
import TimeSelect from "./TimeSelect";
const TimeEntries = () => {
  const [timeEntries, setTimeEntries] = useState([]);
  const total_hours = timeEntries.reduce(function (prev, current) {
    return prev + +current.time_hours
  }, 0);

  const today = new Date();
  const startDate = new Date(
    today.setDate(today.getDate() - today.getDay()),
  ).toISOString().split('T')[0];

  const endDate = new Date(
    today.setDate(today.getDate() - today.getDay() + 6),
  ).toISOString().split('T')[0];


  useEffect(() => {
    const data = { start_date: startDate, end_date: endDate, user_id: "null" };
    const url = `/api/v1/time_entries/index?start_date=${encodeURIComponent(data.start_date)}&end_date=${encodeURIComponent(data.end_date)}&user_id=${encodeURIComponent(data.user_id)}`;
    fetch(url)
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        throw new Error("Network response was not ok.");
      })
      .then((res) => setTimeEntries(res))
      .catch(() => urlError);
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

  const totalTime = (
    <div className="row">
      <div className="col-8">
      </div>
      <div className="col-4 d-flex align-items-center">
        <span>{toHHMM(total_hours)}</span>
      </div>
    </div>
  );

  const noTimeEntries = (
    <div className="vw-100 vh-50 d-flex align-items-center justify-content-center">
      <h4>
        No matching time entries found.  Try new search filters.
      </h4>
    </div>
  );

  const urlError = (
    <div className="vw-100 vh-50 d-flex align-items-center justify-content-center">
      <h4>
       Unable to access backend.
      </h4>
    </div>
  );

  return (
    <>
      <div className="py-5">
        <main className="container">
          <div className="row justify-content-front">
            <TimeSelect />
          </div>
          <div className="row justify-content-end">
            <UserSelect />
          </div>
          {timeEntries.length > 0 ? [ allTimeEntries, totalTime] : noTimeEntries}
        </main>
      </div>
    </>
  );
};

export default TimeEntries;