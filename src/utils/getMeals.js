import axios from "axios"

async function getMeals(FoodDiaryId){
  return axios
    .get(`http://localhost:4000/meal/search/${FoodDiaryId}`)
    .then(res=>{
      return res.data
    })
}

export default getMeals