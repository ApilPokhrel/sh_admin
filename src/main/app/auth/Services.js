import Axios from "axios";
import { API_URL } from "../../config/Variables";

let apiRoutes = {
  checkAuth: {
    path: "/checkAuth",
    method: "post"
  },
  addRole: {
    path: "/auth/role",
    method: "post"
  },
  listRole: {
    path: "/auth/role",
    method: "get"
  },
  deleteRole: id => {
    return {
      path: `/auth/role/${id}`,
      method: "delete"
    };
  },
  removePermissions: name => {
    return {
      path: `/auth/role/${name}/permissions`,
      method: "post"
    };
  },
  edit: id => {
    return {
      path: `/auth/role/${id}`,
      method: "patch"
    }
  }
};

let Call = {
  update: (id, payload) => {
    return Axios.patch(`${API_URL}/auth/role/${id}`, payload, {
      headers: {
        token: window.localStorage.getItem("token") || ""
      }
    });
  }
}
export { apiRoutes, Call }
export default apiRoutes;
