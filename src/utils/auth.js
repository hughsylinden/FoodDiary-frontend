import axios from "axios";

async function signin(username, password, setUser) {
  return axios
    .post("http://localhost:4000/auth/signin", {
      username,
      password,
    })
    .then((res) => {
      const loggedInUser = {
        id: res.data.id,
        username: res.data.username,
        password: res.data.password,
      };
      setUser(loggedInUser);
      localStorage.setItem("loggedInUser", JSON.stringify(loggedInUser));
    })
    .catch((err) => {
      console.log(err.message);
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
