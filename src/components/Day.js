import React from "react";
import PropTypes from "prop-types";

function Day({ month }) {
  return <div>{month}</div>;
}

Day.propTypes = {
  month: PropTypes.string.isRequired,
};

export default Day;
