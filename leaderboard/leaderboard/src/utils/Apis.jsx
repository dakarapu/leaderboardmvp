import axios from "axios";

const baseURL = "http://localhost:5000/api";
export default {
    // Saves a book to the database
    login: function(user) {
        return axios.post(baseURL + "/auth/users/login", user);
    },

    register: function(user) {
        return axios.post(baseURL + "/auth/users/signup", user);
    },

    joinin: function(id) {
        return axios.put(baseURL + `/join_in/${id}`);
    },
    joinout: function(id) {
        return axios.put(baseURL + `/join_out/${id}`);
    },
    getJoinedUsers: function() {
        return axios.get(baseURL + "/join/users");
    },
    getMatches: function() {
        return axios.get(baseURL + "/matches");
    },
    updateScore: function(match) {
        return axios.put(baseURL + "/update/score", match);
    },
    finishMatch: function(id) {
        return axios.delete(baseURL + `/matches/finish/${id}`);
    },
    resetMatch: function(id) {
        return axios.put(baseURL + `/matches/reset/${id}`);
    },
    getAllUsers: function() {
        return axios.get(baseURL + "/users/");
    },
    getUserScore: function(id) {
        return axios.get(baseURL + `/user/score/${id}`);
    },
};
