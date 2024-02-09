import React from 'react';

const TimeSelect = () => {

  const today = new Date();
  const startDate = new Date(
    today.setDate(today.getDate() - today.getDay()),
  ).toISOString().split('T')[0];

  const endDate = new Date(
    today.setDate(today.getDate() - today.getDay() + 6),
  ).toISOString().split('T')[0];

  return (
    <div className="drop-down col-auto">
      <h3>Entries for {startDate} to {endDate}</h3>
    </div>
  );
}
export default TimeSelect;