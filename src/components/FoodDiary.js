/* eslint-disable react/jsx-no-bind */
import React, { useState, useEffect } from "react";
import moment from "moment";
import { useParams } from "react-router-dom";
// eslint-disable-next-line no-unused-vars
import { saveMeal, getMealsByDate } from "../utils/Meal";
import { getFoodDiary } from "../utils/FoodDiary";
import Meal from "./Meal";
import DateSelector from "./DateSelector";
import "../styles/FoodDiary.css";
import AddMealForm from "./inputs/AddMealForm";

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
    showAddMealForm: false,
  };
  const [fields, setFields] = useState(initialState.fields);
  const [meals, setMeals] = useState([]);
  const [selectedMonth, setSelectedMonth] = useState("");
  const [selectedDay, setSelectedDay] = useState("");
  const [foodDiary, setFoodDiary] = useState(initialState.foodDiary);
  const [showAddMealForm, setShowAddMealForm] = useState(
    initialState.showAddMealForm
  );
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
    await getMealsByDate(id, formattedDate).then((res) => {
      setMeals(res);
    });
  }, [selectedDay]);

  const handleFieldChange = (e) => {
    e.preventDefault();
    setFields({ ...fields, [e.target.name]: e.target.value });
  };

  const handleShowMealForm = (e) => {
    e.preventDefault();
    setShowAddMealForm(!showAddMealForm);
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

  return (
    <div className="fooddiary">
      <div className="fooddiary-dashboard">
        <div>dashboard</div>
        daily calorie goal: {foodDiary.dailyCalorieTarget}
        <br />
        total calories:
      </div>
      {!showAddMealForm && (
        <button type="button" onClick={handleShowMealForm}>
          Add Meal
        </button>
      )}
      {showAddMealForm && (
        <div className="meal-form">
          <AddMealForm
            handleFieldChange={handleFieldChange}
            addMeal={addMeal}
            handleShowMealForm={handleShowMealForm}
          />
        </div>
      )}
      <br />
      {foodDiary.name}
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
      {selectedDay &&
        meals.map((meal) => (
          <Meal
            key={meal.id}
            name={meal.name}
            calories={meal.calories}
            datetime={meal.time}
          />
        ))}
      {(selectedMonth || selectedDay) && (
        <button type="button" onClick={clear}>
          clear date
        </button>
      )}
    </div>
  );
}

export default FoodDiary;
