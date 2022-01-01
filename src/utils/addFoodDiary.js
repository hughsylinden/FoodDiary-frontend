import axios from "axios";

async function addFoodDiary(name,userId) {

  return axios
    .post('http://localhost:4000/fooddiary', {
      name: name,
      UserId: userId
    })
    .then(res => {
     return res.data
  })
}

export default addFoodDiary