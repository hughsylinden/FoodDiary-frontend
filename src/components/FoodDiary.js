import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import saveMeal from "../utils/saveMeal";
import getMeals from "../utils/getMeals";
import Meal from "./Meal";
import DateSelector from "./DateSelector";
import "../styles/FoodDiary.css";

function FoodDiary() {
  const initialState = {
    fields: {
      username: "",
      password: "",
      date: "0000-00-00",
      time: "00:00",
    },
  };
  const [fields, setFields] = useState(initialState.fields);
  const [meals, setMeals] = useState([]);
  const [selectedMonth, setSelectedMonth] = useState("");
  const [selectedDay, setSelectedDay] = useState("");
  const { id } = useParams();

  useEffect(() => {
    getMeals(id).then((res) => {
      setMeals(res);
    });
  }, []);

  const handleFieldChange = (e) => {
    e.preventDefault();
    setFields({ ...fields, [e.target.name]: e.target.value });
  };

  async function addMeal(e) {
    e.preventDefault();
    const dateTime = `${`${fields.date}T${fields.time}:00Z`}`;
    await saveMeal(fields.food, fields.calories, dateTime, id).then((res) => {
      const newMeals = [...meals, res];
      setMeals(newMeals);
    });
    document.getElementById("calories-id").value = "";
    document.getElementById("food-id").value = "";
  }

  async function clear() {
    setSelectedDay("");
    setSelectedMonth("");
  }
  return (
    <div>
      <form onSubmit={addMeal}>
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
      </form>
      <br />
      <br />
      {selectedDay ? (
        <div>
          <div>day: {selectedDay}</div>
          <div>month: {selectedMonth}</div>
        </div>
      ) : (
        <DateSelector
          selectedMonth={selectedMonth}
          setSelectedDay={setSelectedDay}
          setSelectedMonth={setSelectedMonth}
        />
      )}
      <br />
      <br />
      <br />
      here are you meals:
      {meals.map((meal) => (
        <Meal
          key={meal.id}
          name={meal.name}
          calories={meal.calories}
          datetime={meal.time}
        />
      ))}
      <button type="button" onClick={clear}>
        clear
      </button>
    </div>
  );
}

export default FoodDiary;
