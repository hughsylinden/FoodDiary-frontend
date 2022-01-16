import React from "react";
import PropTypes from "prop-types";

function AddMealForm({ addMeal, handleFieldChange, handleShowMealForm }) {
  return (
    <form onSubmit={addMeal}>
      <p className="addmealform-title">Add Meal</p>
      food{" "}
      <input
        type="text"
        id="food-id"
        name="food"
        onChange={handleFieldChange}
      />
      <br />
      calories{" "}
      <input
        type="text"
        id="calories-id"
        name="calories"
        onChange={handleFieldChange}
      />
      <br />
      date{" "}
      <input
        type="date"
        id="date-id"
        name="date"
        onChange={handleFieldChange}
      />
      <br />
      time{" "}
      <input
        type="time"
        id="time-id"
        name="time"
        onChange={handleFieldChange}
      />
      <br />
      <button type="submit">add meal</button>
      <br />
      <button type="button" onClick={handleShowMealForm}>
        hide
      </button>
    </form>
  );
}

AddMealForm.propTypes = {
  addMeal: PropTypes.func.isRequired,
  handleFieldChange: PropTypes.func.isRequired,
  handleShowMealForm: PropTypes.func.isRequired,
};

export default AddMealForm;
