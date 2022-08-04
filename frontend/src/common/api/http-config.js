export const API_URL = "http://127.0.0.1:8080/";

export const user = JSON.parse(localStorage.getItem("user"));

export const accessToken = user ? user.accessToken : null;

export const getConfig = { headers: { "X-Auth-Token": accessToken } };

export const postConfig = {
    headers: {
      'Content-Type': 'application/json',
      'X-Auth-Token': accessToken,
    },
  };