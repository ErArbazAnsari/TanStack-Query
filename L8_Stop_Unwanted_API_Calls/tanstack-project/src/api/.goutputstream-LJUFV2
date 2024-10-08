import axios from "axios";

const api = axios.create({
    baseURL: "https://jsonplaceholder.typicode.com",
});

export const fetchPosts = () => api.get("/posts?_start=0&_limit=10");
