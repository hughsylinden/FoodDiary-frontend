import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import saveMeal from "../utils/saveMeal"
import getMeals from "../utils/getMeals"
import Meal from "./Meal"

function FoodDiary() {
  const initialState = {
    fields: { username: "", password: "", date: null, time: "00:00" },
  };
  const [fields, setFields] = useState(initialState.fields);
  const [meals, setMeals] = useState([]);
  const { id } = useParams();
  useEffect(() => {
    getMeals(id).then(res=>{
      setMeals(res)
    })
  },[])

  const handleFieldChange = (e) => {
    e.preventDefault();
    setFields({ ...fields, [e.target.name]: e.target.value });
  };

  async function addMeal(e){
    e.preventDefault();
    const dateTime = `${fields.date+"T"+fields.time+":00Z"}`
    await saveMeal(fields.food,fields.calories,dateTime,id).then(res=>{
      let newMeals = [...meals,res]
      setMeals(newMeals)
    })
    document.getElementById("calories-id").value = ""
    document.getElementById("food-id").value = ""

  }
  return (
    <div>
      <form onSubmit={addMeal}>
        food <input type="text" id="food-id" name="food" onChange={handleFieldChange}/><br/>
        calories <input type="text" id="calories-id" name="calories" onChange={handleFieldChange}/><br/>
        date <input type="date" id="date-id" name="date" onChange={handleFieldChange}/><br/>
        time <input type="time" id="time-id" name="time" onChange={handleFieldChange}/><br/>
        <button>add meal</button><br/>
      </form>
      <br/>
      here are you meals:
      {meals.map(meal => {
        return <Meal name={meal.name} calories={meal.calories} time={meal.time}/>
      })}
    </div>
  )
}

export default FoodDiary
