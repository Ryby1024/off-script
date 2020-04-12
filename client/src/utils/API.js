import axios from "axios";
const BaseURL = "https://www.omdbapi.com/?t=";
const APIKEY = "&apikey=279e7e43"

export default {
  register: function (user) {
    return axios.post("/api/register", user);
  },
  login: function (user) {
    return axios.post("/api/login", user);
  },
  isAuthorized: function () {
    return axios.get("/api/authorized");
  },
  logout: function () {
    return axios.get("/api/logout");
  },
  availableUN: function (username) {
    return axios.get("/api/user/?username=" + username);
  },
  search: function(query) {
    return axios.get(BaseURL + query + APIKEY);
  },
  newRating: function(user) {
    return axios.post("/api/search", user)
  },
  getMovies: function() {
    return axios.get("/api/movie/")
  }
};