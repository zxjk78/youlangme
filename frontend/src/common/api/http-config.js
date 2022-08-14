export const API_URL = "http://localhost:8080/";

export const user = JSON.parse(localStorage.getItem("user"));

export let accessToken = user ? user.accessToken : null;

export let refreshToken = user ? user.refreshToken : null;

export const getConfig = { headers: { "X-Auth-Token": accessToken } };

export const postConfig = {
  headers: {
    "Content-Type": "application/json",
    "X-Auth-Token": accessToken,
  },
};
