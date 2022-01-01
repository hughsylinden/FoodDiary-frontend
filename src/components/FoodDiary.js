import React, { useContext, useState } from "react";
import { UserContext } from "../contexts/UserContext";
import { useNavigate, useParams } from "react-router-dom";
import saveMeal from "../utils/saveMeal"

function FoodDiary() {
  const initialState = {
    fields: { username: "", password: "" },
  };
  const [fields, setFields] = useState(initialState.fields);
  const { user, setUser } = useContext(UserContext);
  const { id } = useParams();

  let navigate = useNavigate();

  const handleFieldChange = (e) => {
    e.preventDefault();
    setFields({ ...fields, [e.target.name]: e.target.value });
  };


  async function logout(){
    setUser("")
    navigate("/")
  }

  async function addMeal(e){
    e.preventDefault();
    saveMeal(fields.food,fields.calories,user.id)
  }

/*   async function viewDiaries(e){
    e.preventDefault();
    console.log(user)
    getFoodDiaryByUser(user.id).then(res => {
      console.log(res)
    })
  } */
  return (
    <div>
      fd
        {id}
{/*       hello {user.username}
      here are you diaries:
      <form onSubmit={addMeal}>
        food <input type="text" name="food" onChange={handleFieldChange}/>
        calories <input type="password" name="calories" onChange={handleFieldChange}/><br/>
        <button>add meal</button><br/>
      </form>
      <button onClick={logout}>log out</button>  */}
    </div>
  )
}

export default FoodDiary
