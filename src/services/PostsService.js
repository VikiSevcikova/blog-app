import axios from "axios";

const getHeader = () => {
    const token = localStorage.getItem("blog-token");
    const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };
    return config;
}

export const getAll = () => {
  return axios.get("http://localhost:5000/posts/all", getHeader()).then((response) => {
    return response.data;
  });
};

export const addNew = (post) => {
  return axios
    .post("http://localhost:5000/posts/add", { post }, getHeader())
    .then((response) => {
      return response.data;
    });
};

export const update = (id, post) => {
  return axios
    .put(
      "http://localhost:5000/posts/update/" + id,
      {
        ...post
      },
      getHeader()
    )
    .then((response) => {
      return response.data;
    });
};

export const deletePostById = (id) => {
  return axios
    .delete("http://localhost:5000/posts/delete/" + id, getHeader())
    .then((response) => {
      return response.data;
    });
};
