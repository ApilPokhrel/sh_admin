import Axios from "axios";
import { API_URL } from "../../config/Variables";

let apiRoutes = {
  add: {
    path: "/category/subtype/",
    method: "post"
  },

  get: id => {
    return {
      path: `/category/subtype/${id}`,
      method: "get"
    };
  },

  edit: id => {
    return {
      path: `/category/subtype/${id}`,
      method: "patch"
    };
  },

  list: {
    path: "/category/subtype/",
    method: "get"
  }
};

let Call = {
  add: (payload) => {
    let formData = new FormData();
    formData.append("file", payload.profile[0].originFileObj);
    formData.append("name", payload.name);
    formData.append("status", "active");
    formData.append("desc", payload.desc);

    return Axios.post(`${API_URL}/category/subtype`, formData, {
      headers: {
        token: window.localStorage.getItem("token") || ""
      }
    });
  },

  remove: (id) => {
    return Axios.delete(`${API_URL}/category/subtype/${id}`, {
      headers: {
        token: window.localStorage.getItem("token") || ""
      }
    });
  },

  updateProfile: (id, payload) => {
    let formData = new FormData();
    formData.append("file", payload.profile[0].originFileObj);
    return Axios.post(`${API_URL}/category/subtype/${id}/profile`, formData, {
      headers: {
        token: window.localStorage.getItem("token") || ""
      }
    });
  },

  update: (id, payload) => {
    return Axios.patch(`${API_URL}/category/subtype/${id}`, payload, {
      headers: {
        token: window.localStorage.getItem("token") || ""
      }
    });
  }
}

export { apiRoutes, Call };

export default apiRoutes
