import React from "react";
import PropTypes from "prop-types";

function DiaryInputs({ handleAddFoodDiary, handleFieldChange }) {
  return (
    <>
      diary name
      <input
        className="title-input"
        type="text"
        name="name"
        onChange={handleFieldChange}
      />
      <br />
      daily calorie target
      <input
        className="title-input"
        type="text"
        name="dailyCalorieTarget"
        onChange={handleFieldChange}
      />
      <button
        type="submit"
        className="title-button"
        onClick={handleAddFoodDiary}
      >
        add
      </button>
      <br />
    </>
  );
}

DiaryInputs.propTypes = {
  handleAddFoodDiary: PropTypes.func.isRequired,
  handleFieldChange: PropTypes.func.isRequired,
};

export default DiaryInputs;
