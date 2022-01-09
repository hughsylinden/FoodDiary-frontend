import axios from "axios";

async function signin(username, password) {
  return axios
    .post("http://localhost:4000/auth/signin", {
      username,
      password,
    })
    .then((res) => {
      return res.data;
    });
}

async function signup(username, password) {
  return axios
    .post("http://localhost:4000/auth/signup", {
      username,
      password,
    })
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      return err;
    });
}

export { signin, signup };
