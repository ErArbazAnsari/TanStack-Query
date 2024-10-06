import React, { useEffect, useState } from "react";
import { fetchPosts } from "../../api/api";

const FetchOld = () => {
    const [posts, setPosts] = useState([]);

    const getPostData = async () => {
        try {
            const response = await fetchPosts();
            setPosts(response.data); // Ensure you're accessing the 'data' property from the API response
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        getPostData();
    }, []);

    return (
        <div>
            <h1>Posts</h1>
            <ul>
                {posts.map((post) => (
                    <li key={post.id} style={{ marginBottom: "20px" }}>
                        <h2>{post.title}</h2>
                        <p>{post.body}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default FetchOld;
