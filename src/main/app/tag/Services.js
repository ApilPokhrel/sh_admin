import Axios from "axios";
import { API_URL } from "../../config/Variables";

let apiRoutes = {
  add: {
    path: "/tag/",
    method: "post"
  },

  get: id => {
    return {
      path: `/tag/${id}`,
      method: "get"
    };
  },

  edit: id => {
    return {
      path: `/tag/${id}`,
      method: "post"
    };
  },

  list: {
    path: "/tag/",
    method: "get"
  }
};

let Call = {
  add: (payload) => {
    return Axios.post(API_URL + apiRoutes.add.path, payload, {
      headers: {
        token: window.localStorage.getItem("token") || ""
      }
    });
  },

  update: (id, payload) => {
    return Axios.patch(`${API_URL}/tag/${id}`, payload, {
      headers: {
        token: window.localStorage.getItem("token") || ""
      }
    });
  },

  remove: (id) => {
    return Axios.delete(`${API_URL}/tag/${id}`, {
      headers: {
        token: window.localStorage.getItem("token") || ""
      }
    });
  }
}

export { apiRoutes, Call };

export default apiRoutes;
