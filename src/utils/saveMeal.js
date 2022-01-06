import axios from "axios";


async function saveMeal(meal,calories,time,foodDiaryId) {
  console.log(time)
  return axios
    .post('http://localhost:4000/meal',
    {
      name: meal,
      calories: calories,
      time: time,
      FoodDiaryId:foodDiaryId
    })
    .then(res => {
      return res.data
  }) 
}

export default saveMeal