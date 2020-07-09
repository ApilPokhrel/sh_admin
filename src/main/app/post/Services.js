import Axios from "axios";
import { API_URL } from "../../config/Variables";

let apiRoutes = {
  add: {
    path: "/post/",
    method: "post"
  },

  get: id => {
    return {
      path: `/post/${id}`,
      method: "get"
    };
  },

  edit: id => {
    return {
      path: `/post/${id}`,
      method: "patch"
    };
  },

  list: {
    path: "/post/",
    method: "get"
  }
};

let Call = {
  add: payload => {
    let formData = new FormData();
    formData.append("file", payload.profile[0].originFileObj);
    formData.append("title", payload.title);
    formData.append("status", "active");
    formData.append("desc", payload.desc);

    if (payload.color) formData.append("color", payload.color);
    if (payload.btnColor) formData.append("btnColor", payload.btnColor);
    if (payload.btnBackground) formData.append("btnBackground", payload.btnBackground);
    if (payload.btnText) formData.append("btnText", payload.btnText);

    return Axios.post(`${API_URL}/post`, formData, {
      headers: {
        token: window.localStorage.getItem("token") || ""
      }
    });
  },

  remove: id => {
    return Axios.delete(`${API_URL}/post/${id}`, {
      headers: {
        token: window.localStorage.getItem("token") || ""
      }
    });
  },

  updateProfile: (id, payload) => {
    let formData = new FormData();
    formData.append("file", payload.profile[0].originFileObj);
    return Axios.post(`${API_URL}/post/${id}/file`, formData, {
      headers: {
        token: window.localStorage.getItem("token") || ""
      }
    });
  },

  update: (id, payload) => {
    return Axios.patch(`${API_URL}/post/${id}`, payload, {
      headers: {
        token: window.localStorage.getItem("token") || ""
      }
    });
  }
};

export { apiRoutes, Call };

export default apiRoutes;
