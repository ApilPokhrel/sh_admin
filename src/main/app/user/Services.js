
import Axios from "axios";
import { API_URL } from "../../config/Variables";

let apiRoutes = {
  login: {
    path: "/user/login",
    method: "post"
  },

  register: {
    path: "/user/register",
    method: "post"
  },

  list: {
    path: "/user",
    method: "get"
  },


  edit: id => {
    return { path: `/user/${id}`, method: "patch" };
  }
};

let Call = {
  update: (id, payload) => {
    return Axios.patch(`${API_URL}/user/${id}`, payload, {
      headers: {
        token: window.localStorage.getItem("token") || ""
      }
    });
  }
}

export { apiRoutes, Call };

export default apiRoutes;
