import axios from "axios";


async function getFoodDiaryByUser(id) {
  return axios
    .get(`http://localhost:4000/fooddiary/${id}/all`)
    .then(res => {
     return res.data
  })
}

export default getFoodDiaryByUser
