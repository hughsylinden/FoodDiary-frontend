import axios from "axios";


async function saveMeal(meal,calories, userId) {
  return axios
    .post('http://localhost:4000/meal',
    {
      name: meal,
      calories: calories
    })
    .then(res => {
      return res.data
  }) 
}

export default saveMeal