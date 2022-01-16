import React from "react";
import PropTypes from "prop-types";

function DiaryInputs({ handleAddFoodDiary, handleFieldChange }) {
  return (
    <>
      diary name
      <input type="text" name="name" onChange={handleFieldChange} />
      <br />
      daily calorie target
      <input
        type="text"
        name="dailyCalorieTarget"
        onChange={handleFieldChange}
      />
      <button type="submit" onClick={handleAddFoodDiary}>
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
