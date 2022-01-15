import React, { useState, useEffect } from "react";
import moment from "moment";
import { useParams } from "react-router-dom";
import { saveMeal, getMealsByDate, getMealsByMonth } from "../utils/Meal";
import { getFoodDiary } from "../utils/FoodDiary";
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
    foodDiary: {
      name: "",
      dailyCalorieTarget: "",
    },
  };
  const [fields, setFields] = useState(initialState.fields);
  const [meals, setMeals] = useState([]);
  const [selectedMonth, setSelectedMonth] = useState("");
  const [selectedDay, setSelectedDay] = useState("");
  const [foodDiary, setFoodDiary] = useState(initialState.foodDiary);
  const { id } = useParams();

  useEffect(async () => {
    await getFoodDiary(id).then((res) => {
      setFoodDiary(res);
    });
  }, []);

  useEffect(async () => {
    const formattedDate = moment(
      `${new Date().getFullYear()}-${selectedMonth}-${selectedDay}`
    ).format("YYYY MM DD");
    console.log(`${new Date().getFullYear()}-${selectedMonth}-${selectedDay}`);
    await getMealsByDate(id, formattedDate).then((res) => {
      setMeals(res);
    });
  }, [selectedDay]);

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

  function clear() {
    setSelectedDay("");
    setSelectedMonth("");
  }

  async function month() {
    const formattedDate = moment(
      `${new Date().getFullYear()}-${selectedMonth}`
    ).format("YYYY MM DD");
    getMealsByMonth(id, formattedDate).then((res) => {
      console.log(res);
    });
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
      Food Diary: {foodDiary.name}
      <br />
      {selectedDay ? (
        <div>
          <div>
            date: {selectedDay} {selectedMonth} {new Date().getFullYear()}
          </div>
        </div>
      ) : (
        <DateSelector
          id={id}
          selectedMonth={selectedMonth}
          setSelectedDay={setSelectedDay}
          setSelectedMonth={setSelectedMonth}
          setMeals={setMeals}
        />
      )}
      <br />
      {meals.length > 0 && (
        <div>
          Total Calories:
          {meals
            .map((meal) => meal.calories)
            .reduce((total, amount) => total + amount)}
        </div>
      )}
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
        clear date
      </button>
      <button type="button" onClick={month}>
        get by month
      </button>
      <br />
    </div>
  );
}

export default FoodDiary;
