import axios from "axios";

const api = axios.create({
    baseURL: "https://jsonplaceholder.typicode.com",
});

export const fetchPosts = (page) => api.get(`/posts?_page=${page}&_limit=3`);

export const fetchIndiPost = (id) => api.get(`/posts/${id}`);

export const deletePost = (id) => api.delete(`/posts/${id}`);

export const updatePost = (id) =>
    api.patch(`/posts/${id}`, { title: "New Title updated" });

export const fetchUsers = async ({ pageParams = 1 }) => {
    try {
        const res = await axios.get(
            `https://api.github.com/users?per_page=10&page=${pageParams}`
        );
        return res.data;
    } catch (error) {
        console.log(error);
    }
};
