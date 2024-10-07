import axios from "axios";

const api = axios.create({
    baseURL: "https://jsonplaceholder.typicode.com",
});

export const fetchPosts = (page) => api.get(`/posts?_page=${page}&_limit=3`);

export const fetchIndiPost = (id) => api.get(`/posts/${id}`);

export const deletePost = (id) => api.delete(`/posts/${id}`);
