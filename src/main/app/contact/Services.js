import Axios from "axios";
import { API_URL } from "../../config/Variables";

let apiRoutes = {
  add: {
    path: "/contact/",
    method: "post"
  },

  edit: id => {
    return {
      path: `/contact/${id}`,
      method: "patch"
    };
  },

  list: {
    path: "/contact/",
    method: "get"
  }
};

let Call = {
  add: payload => {
    return Axios.post(API_URL + apiRoutes.add.path, payload, {
      headers: {
        token: window.localStorage.getItem("token") || ""
      }
    });
  },

  update: (id, payload) => {
    return Axios.patch(`${API_URL}/contact/${id}`, payload, {
      headers: {
        token: window.localStorage.getItem("token") || ""
      }
    });
  },

  remove: id => {
    return Axios.delete(`${API_URL}/contact/${id}`, {
      headers: {
        token: window.localStorage.getItem("token") || ""
      }
    });
  }
};

export { apiRoutes, Call };

export default apiRoutes;
