import axios from "axios";


async function getFoodDiaryByUser(userId) {
  return axios
    .get(`http://localhost:4000/fooddiary/${userId}/all`)
    .then(res => {
     return res.data
  })
}

async function getFoodDiary(id) {
  return axios
    .get(`http://localhost:4000/fooddiary/${id}`)
    .then(res => {
     return res.data
  })
}

export {getFoodDiaryByUser,getFoodDiary}
