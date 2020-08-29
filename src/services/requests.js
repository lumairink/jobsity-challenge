import axios from "./api";

const headers = {
  "Content-Type": "application/json",
};

export const get = (url, data = {}) =>
  axios.request({
    method: "GET",
    url,
    params: { ...data },
    headers: {
      ...axios.defaults.headers,
      ...headers,
    },
    validateStatus: (status) =>
      (status >= 200 && status < 300) ||
      [404].filter((s) => s === status).length,
  });
