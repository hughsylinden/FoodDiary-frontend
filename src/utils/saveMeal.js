import axios from "axios";


async function saveMeal(meal,calories, foodDiaryId) {
  return axios
    .post('http://localhost:4000/meal',
    {
      name: meal,
      calories: calories,
      FoodDiaryId:foodDiaryId
    })
    .then(res => {
      return res.data
  }) 
}

export default saveMeal