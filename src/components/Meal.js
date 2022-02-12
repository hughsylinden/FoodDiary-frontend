import React from "react";
import moment from "moment";
import PropTypes from "prop-types";

function Meal({ name, calories, datetime }) {
  const date = moment(datetime).format("DD/MM/YYYY");
  const time = moment(datetime).format("HH:mm:ss");
  return (
    <div>
      <div>{name}</div>
      <div>{calories}</div>
      <div>{date}</div>
      <div>{time}</div>
    </div>
  );
}

Meal.propTypes = {
  name: PropTypes.string.isRequired,
  calories: PropTypes.number.isRequired,
  datetime: PropTypes.string.isRequired,
};

export default Meal;
