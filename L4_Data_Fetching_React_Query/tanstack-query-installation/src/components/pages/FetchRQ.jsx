import React, { useEffect } from "react";
import { fetchPosts } from "../../api/api";
import { useQuery } from "@tanstack/react-query";

const FetchRQ = () => {
    const getPostData = async () => {
        try {
            const response = await fetchPosts();
            return response.status === 200 ? response.data : [];
        } catch (error) {
            console.log(error);
            return [];
        }
    };

    const receivedData = useQuery({
        queryKey: ["posts"],
        queryFn: getPostData,
    });

    receivedData && console.log(receivedData);
    return (
        <div>
            <h1>Posts</h1>
            <ul>
                {receivedData.data?.map((post) => (
                    <li key={post.id} style={{ marginBottom: "20px" }}>
                        <h2>{post.title}</h2>
                        <p>{post.body}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default FetchRQ;
