import Axios from "axios";
import { API_URL } from "../../config/Variables";

let apiRoutes = {
  add: {
    path: "/banner/",
    method: "post"
  },

  get: id => {
    return {
      path: `/banner/${id}`,
      method: "get"
    };
  },

  edit: id => {
    return {
      path: `/banner/${id}`,
      method: "patch"
    };
  },

  list: {
    path: "/banner/",
    method: "get"
  }
};

let Call = {
  add: (payload) => {
    let formData = new FormData();
    formData.append("file", payload.profile[0].originFileObj);
    formData.append("sub1", payload.sub1);
    formData.append("status", "active");
    formData.append("sub2", payload.sub2);
    formData.append("link", payload.link);

    if (payload.color) formData.append("color", payload.color);
    if (payload.btnColor) formData.append("btnColor", payload.btnColor);
    if (payload.btnBackground) formData.append("btnBackground", payload.btnBackground);
    if (payload.btnText) formData.append("btnText", payload.btnText);



    return Axios.post(`${API_URL}/banner`, formData, {
      headers: {
          'Access-Control-Allow-Origin' : '*',
        token: window.localStorage.getItem("token") || ""
      }
    });
  },

  remove: (id) => {
    return Axios.delete(`${API_URL}/banner/${id}`, {
      headers: {
        token: window.localStorage.getItem("token") || ""
      }
    });
  },

  updateProfile: (id, payload) => {
    let formData = new FormData();
    formData.append("file", payload.profile[0].originFileObj);
    return Axios.post(`${API_URL}/banner/${id}/profile`, formData, {
      headers: {
        token: window.localStorage.getItem("token") || ""
      }
    });
  },

  update: (id, payload) => {
    return Axios.patch(`${API_URL}/banner/${id}`, payload, {
      headers: {
        token: window.localStorage.getItem("token") || ""
      }
    });
  }
}

export { apiRoutes, Call };

export default apiRoutes
