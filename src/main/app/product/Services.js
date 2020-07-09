import Axios from "axios";
import { API_URL } from "../../config/Variables";
let apiRoutes = {
  add: {
    path: "/product/",
    method: "post"
  },

  get: id => {
    return {
      path: `/product/${id}`,
      method: "get"
    };
  },

  edit: id => {
    return {
      path: `/product/${id}`,
      method: "patch"
    };
  },

  list: {
    path: "/product/",
    method: "get"
  }
};

let Call = {
  add: (payload) => {
    delete payload.profile;
    let formData = new FormData();
    let keys = Object.keys(payload);
    for (let e of keys) {
      if (payload[e]) {
        if (e == "files") {
          payload.files.map(f => {
            console.log(f);
            formData.append("file", f.originFileObj);
          });

          delete payload.files;
        } else {
          formData.append(e, JSON.stringify(payload[e]));
        }
      }
    }

    return Axios.post(API_URL + apiRoutes.add.path, formData, {
      headers: {
        token: window.localStorage.getItem("token") || ""
      }
    });

  },

  update: (id, payload) => {
    return Axios.patch(`${API_URL}/product/${id}`, payload, {
      headers: {
        token: window.localStorage.getItem("token") || ""
      }
    });
  },

  updateProfile: (id, payload) => {
    let formData = new FormData();
    formData.append("file", payload.profile[0].originFileObj);

    return Axios.post(`${API_URL}/product/${id}/profile`, formData, {
      headers: {
        token: window.localStorage.getItem("token") || ""
      }
    });
  },

  updateFiles: (id, payload) => {
    let formData = new FormData();

    for (let e of payload.files) {
      formData.append("file", e.originFileObj);
    }

    return Axios.post(`${API_URL}/product/${id}/files`, formData, {
      headers: {
        token: window.localStorage.getItem("token") || ""
      }
    });
  },

  delete: (id) => {
    return Axios.delete(`${API_URL}/product/${id}`, {
      headers: {
        token: window.localStorage.getItem("token") || ""
      }
    });
  }
}
export { apiRoutes, Call };
export default apiRoutes;
