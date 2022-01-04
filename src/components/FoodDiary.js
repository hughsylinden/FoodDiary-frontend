import React, { useContext, useState, useEffect } from "react";
import { UserContext } from "../contexts/UserContext";
import { useParams } from "react-router-dom";
import saveMeal from "../utils/saveMeal"
import getMeals from "../utils/getMeals"

function FoodDiary() {
  const initialState = {
    fields: { username: "", password: "" },
  };
  const [fields, setFields] = useState(initialState.fields);
  const [meals, setMeals] = useState([]);
  const { user, setUser } = useContext(UserContext);
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
    await saveMeal(fields.food,fields.calories,id).then(res=>{
      let newMeals = [...meals,res]
      setMeals(newMeals)
    })
    document.getElementById("calories-id").value = ""
    document.getElementById("food-id").value = ""

  }
  return (
    <div>
      <form onSubmit={addMeal}>
        food <input type="text" id="food-id" name="food" onChange={handleFieldChange}/>
        calories <input type="text" id="calories-id" name="calories" onChange={handleFieldChange}/><br/>
        <button>add meal</button><br/>
      </form>
      <br/>
      here are you meals:
      {meals.map(meal => {
        return <div key={meal.id}>{meal.name}</div>
      })}
    </div>
  )
}

export default FoodDiary
