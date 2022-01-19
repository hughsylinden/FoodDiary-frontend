/* eslint-disable react/no-array-index-key */
import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import moment from "moment";
import { getMealsByYear, getDailyCalorieIntake } from "../utils/Meal";

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

function DateSelector({ id, selectedMonth, setSelectedDay, setSelectedMonth }) {
  const [monthsContainingActivity, setMonthsContainingActivity] = useState([]);
  const [caloriePerday, setCaloriePerday] = useState([]);
  useEffect(async () => {
    const formattedDate = moment(
      `${new Date().getFullYear()}-${selectedMonth}`
    ).format("YYYY MM DD");
    await getMealsByYear(id, formattedDate).then((res) => {
      setMonthsContainingActivity(res.map((day) => new Date(day.time)));
    });
    await getDailyCalorieIntake(id, formattedDate).then((res) => {
      setCaloriePerday(res);
    });
  }, [selectedMonth]);

  const days = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

  const dayArray = [...Array(days[months.indexOf(selectedMonth)]).keys()].map(
    (i) => i + 1
  );

  async function handleSelectMonth(e) {
    setSelectedMonth(e.target.getAttribute("name"));
  }

  async function handleSelectDay(e) {
    if (e.target.className === "meal-calendar-day-active") {
      setSelectedDay(e.target.firstChild.textContent);
    } else {
      setSelectedDay(e.target.parentNode.firstChild.textContent);
    }
  }

  return (
    <div className="date-selector">
      {!selectedMonth ? (
        <div className="meal-calendar-months">
          {months.map((month, i) => {
            const included = monthsContainingActivity
              .map((m) => m.getMonth())
              .includes(i);
            return (
              <div
                key={i}
                name={month}
                className={
                  included
                    ? "meal-calendar-month-active"
                    : "meal-calendar-month"
                }
                onClick={included ? handleSelectMonth : null}
                aria-hidden="true"
              >
                {month}
              </div>
            );
          })}
        </div>
      ) : (
        <div className="meal-calendar-days">
          {dayArray.map((day, i) => {
            const included = monthsContainingActivity
              .filter((m) => m.getMonth() === months.indexOf(selectedMonth))
              .map((d) => d.getDate())
              .includes(day);
            return (
              <div
                key={i}
                className={
                  monthsContainingActivity
                    .filter(
                      (m) => m.getMonth() === months.indexOf(selectedMonth)
                    )
                    .map((d) => d.getDate())
                    .includes(day)
                    ? "meal-calendar-day-active"
                    : "meal-calendar-day"
                }
                onClick={included ? handleSelectDay : null}
                aria-hidden="true"
              >
                <div>{day}</div>
                {caloriePerday[day] > 0 ? (
                  <div>{caloriePerday[day]}</div>
                ) : (
                  <div className="meal-calendar-day-empty">-</div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

DateSelector.propTypes = {
  selectedMonth: PropTypes.string.isRequired,
  setSelectedDay: PropTypes.func.isRequired,
  setSelectedMonth: PropTypes.func.isRequired,
  id: PropTypes.number.isRequired,
};

export default DateSelector;
