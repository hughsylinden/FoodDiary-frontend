import axios from "axios";

async function addFoodDiary(name, dailyCalorieTarget, userId) {
  return axios
    .post("http://localhost:4000/fooddiary", {
      name,
      dailyCalorieTarget,
      UserId: userId,
    })
    .then((res) => {
      return res.data;
    });
}

async function getFoodDiaryByUser(userId) {
  return axios
    .get(`http://localhost:4000/fooddiary/${userId}/all`)
    .then((res) => {
      return res.data;
    });
}

async function getFoodDiary(id) {
  return axios.get(`http://localhost:4000/fooddiary/${id}`).then((res) => {
    return res.data;
  });
}

export { getFoodDiaryByUser, getFoodDiary, addFoodDiary };
