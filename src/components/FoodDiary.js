import React, { useState, useEffect } from "react";
import moment from "moment";
import { useParams } from "react-router-dom";
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
      <div className="fooddiary__dateselector">
        <div className="fooddiary__dashboard">
          <div>{foodDiary.name}</div>
          daily calorie goal: {foodDiary.dailyCalorieTarget}
          <br />
        </div>
        <br />
        <br />
        {selectedDay ? (
          <div>
            date: {selectedDay} {selectedMonth} {new Date().getFullYear()}
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
        {!showAddMealForm && (
          <button type="button" onClick={handleShowMealForm}>
            Add Meal
          </button>
        )}
        {(selectedMonth || selectedDay) && (
          <button type="button" onClick={clear}>
            clear date
          </button>
        )}
      </div>
      <div className="fooddiary__meals">
        {!selectedDay && !showAddMealForm && (
          <div className="fooddiary__meals--title">
            <div>SELECT A DATE</div>
          </div>
        )}
        {showAddMealForm && (
          <AddMealForm
            handleFieldChange={handleFieldChange}
            addMeal={(e) => addMeal(e)}
            handleShowMealForm={handleShowMealForm}
          />
        )}
        {/*         {selectedDay && (
          <div>
            Total Calories:
            {meals
              .filter((meal) => {
                const mealDate = moment(new Date(meal.time)).format(
                  "YYYY MM DD"
                );
                const selectedDate = moment(
                  `${new Date().getFullYear()}-${selectedMonth}-${selectedDay}`
                ).format("YYYY MM DD");
                // eslint-disable-next-line eqeqeq
                return mealDate == selectedDate;
              })
              .map((userMeals) => userMeals.calories)
              .reduce((total, amount) => total + amount)}
          </div>
        )} */}
        {selectedDay &&
          meals
            .filter((meal) => {
              const mealDate = moment(new Date(meal.time)).format("YYYY MM DD");
              const selectedDate = moment(
                `${new Date().getFullYear()}-${selectedMonth}-${selectedDay}`
              ).format("YYYY MM DD");
              return mealDate === selectedDate;
            })
            .map((meal) => (
              <Meal
                key={meal.id}
                name={meal.name}
                calories={meal.calories}
                datetime={meal.time}
              />
            ))}
      </div>
    </div>
  );
}

export default FoodDiary;
