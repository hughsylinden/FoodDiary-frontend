import React, { useState } from "react";
import PropTypes from "prop-types";
import Day from "./Day";

function DateSelector({ setSelectedDate }) {
  const [monthSelected, setMonthSelected] = useState("");
  const months = [
    "Janaury",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  async function handleSelectMonth(e) {
    setMonthSelected(e.target.textContent);
  }

  async function handleSelectDay(e) {
    setSelectedDate(e.target.textContent);
  }

  return (
    <div>
      {" "}
      {!monthSelected ? (
        <div className="meal-calendar">
          {months.map((month) => (
            <div
              className="meal-calendar-month"
              onClick={handleSelectMonth}
              aria-hidden="true"
            >
              {month}
            </div>
          ))}
        </div>
      ) : (
        <Day
          month={monthSelected}
          handleSelectDay={(e) => handleSelectDay(e)}
        />
      )}
    </div>
  );
}

DateSelector.propTypes = {
  setSelectedDate: PropTypes.func.isRequired,
};

export default DateSelector;
