import { API_URL } from "../config/Variables";

export default async (route, payload, headers) => {
  console.log("payload", payload);
  let h = {
    "Content-Type": "application/json",
    token: window.localStorage.getItem("token") || ""
  };
  if (headers) h = { ...h, ...headers };
  try {
    let response;
    if (route.method === "GET" || route.method === "get") {
      var url = new URL(`${API_URL}${route.path}`);
      Object.keys(payload).forEach(key => url.searchParams.append(key, payload[key]));
      response = await fetch(url, {
        method: route.method,
        headers: h
      });
    } else {
      response = await fetch(`${API_URL}${route.path}`, {
        method: route.method,
        headers: h,
        body: JSON.stringify(payload)
      });
    }
    return handleResponse(response);
  } catch (e) {
    if (e.status === 403 || e.status === 401) window.location.href = "/login";
    throw new Error(e);
  }
};

let handleResponse = async res => {
  let data = await res.json();
  if (res.status >= 400) {
    if (res.status === 403 || res.status === 401) window.location.href = "/login";
    return Promise.reject(data);
  }
  return data;
};
