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

async function getMealsByMonth(foodDiaryId, date) {
  return axios
    .post("http://localhost:4000/meal/searchbymonth/", {
      FoodDiaryId: foodDiaryId,
      date,
    })
    .then((res) => {
      return res.data;
    });
}

async function getMealsByYear(foodDiaryId, date) {
  return axios
    .post("http://localhost:4000/meal/searchbyyear/", {
      FoodDiaryId: foodDiaryId,
      date,
    })
    .then((res) => {
      return res.data;
    });
}

async function getDailyCalorieIntake(foodDiaryId, date) {
  return axios
    .post("http://localhost:4000/meal/test/", {
      FoodDiaryId: foodDiaryId,
      date,
    })
    .then((res) => {
      let cals = [];

      if (res.data.length > 0) {
        const dateObj = new Date(res.data[0].time);
        cals = Array(
          new Date(dateObj.getFullYear(), dateObj.getMonth(), 0).getDate()
        ).fill(0);
        res.data.forEach((meal) => {
          cals[new Date(meal.time).getDate()] += meal.calories;
        });
      }
      return cals;
    });
}

export {
  getMeals,
  saveMeal,
  getMealsByDate,
  getMealsByMonth,
  getMealsByYear,
  getDailyCalorieIntake,
};
