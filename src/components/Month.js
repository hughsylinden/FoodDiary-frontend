/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React from "react";
import PropTypes from "prop-types";

function Month({ month, handleSelectMonth }) {
  return (
    // eslint-disable-next-line react/jsx-no-comment-textnodes
    <div className="meal-calendar-month">
      <div name="name" onClick={(e) => handleSelectMonth(e)}>
        {month}
      </div>
    </div>
  );
}

Month.propTypes = {
  month: PropTypes.string.isRequired,
  handleSelectMonth: PropTypes.func.isRequired,
};

export default Month;
