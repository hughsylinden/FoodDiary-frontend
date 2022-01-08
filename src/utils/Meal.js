import axios from "axios";

async function getMeals(FoodDiaryId) {
  return axios
    .get(`http://localhost:4000/meal/search/${FoodDiaryId}`)
    .then((res) => {
      return res.data;
    });
}

async function saveMeal(meal, calories, time, foodDiaryId) {
  return axios
    .post("http://localhost:4000/meal", {
      name: meal,
      calories,
      time,
      FoodDiaryId: foodDiaryId,
    })
    .then((res) => {
      return res.data;
    });
}

async function getMealsByDate(foodDiaryId, date) {
  return axios
    .post("http://localhost:4000/meal/searchbydate/", {
      FoodDiaryId: foodDiaryId,
      date,
    })
    .then((res) => {
      return res.data;
    });
}

export { getMeals, saveMeal, getMealsByDate };
