import axios from "axios";


async function getData() {
  return axios
    .get('http://localhost:4000/fooddiary')
    .then(res => {
     return res.data
  })
}

export default getData
