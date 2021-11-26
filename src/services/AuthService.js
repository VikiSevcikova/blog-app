import axios from "axios";

export const login = (email, password) => {
    return axios
      .post("http://localhost:5000/auth/login", { email, password })
      .then((response) => {
        if (response.data.accessToken) {
          localStorage.setItem("blog-token", response.data.accessToken);
        }
        console.log(response)
        return response;
      });
  }

export const signup = (username, email, password) => {
    return axios.post("http://localhost:5000/auth/signup", {
      username,
      email,
      password,
    });
}

export const getCurrentUser = () => {
    console.log("getCurrent")
    const token = localStorage.getItem("blog-token");
    const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        }
      };
    return axios.get("http://localhost:5000/user/me", config);
}