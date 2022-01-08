import React from "react";
import PropTypes from "prop-types";

function DateSelector({ selectedMonth, setSelectedDay, setSelectedMonth }) {
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

  const days = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

  async function handleSelectMonth(e) {
    setSelectedMonth(e.target.textContent);
  }

  async function handleSelectDay(e) {
    setSelectedDay(e.target.textContent);
  }

  return (
    <div>
      {" "}
      {!selectedMonth ? (
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
        <div className="meal-calendar-days">
          {[...Array(days[months.indexOf(selectedMonth)]).keys()]
            .map((i) => i + 1)
            .map((day) => (
              <div
                className="meal-calendar-day"
                onClick={handleSelectDay}
                aria-hidden="true"
              >
                {day}
              </div>
            ))}
        </div>
      )}
    </div>
  );
}

DateSelector.propTypes = {
  selectedMonth: PropTypes.string.isRequired,
  setSelectedDay: PropTypes.func.isRequired,
  setSelectedMonth: PropTypes.func.isRequired,
};

export default DateSelector;
