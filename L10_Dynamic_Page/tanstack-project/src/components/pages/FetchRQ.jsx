import React, { useEffect } from "react";
import { fetchPosts } from "../../api/api";
import { useQuery } from "@tanstack/react-query";
import Loader from "../Layout/Loader";
import { useNavigate } from "react-router-dom";

const FetchRQ = () => {
  const navigate = useNavigate();
  
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
    // staleTime: 1000 * 60 * 1, // 1 minute
    refetchInterval: 1000, // for polling data every second
    refetchIntervalInBackground: true, // for polling data in background even if app is not active or tab is not active in browser.
  });

  receivedData && console.log(receivedData);

  if (receivedData.isLoading) return <Loader />;
  if (receivedData.isError)
    return <div>Error: {receivedData.error.message}</div>;

  const handleIndexClick = (id) => () => {
    console.log("button clicked", id);
    navigate(`/rq/${id}`);
  };
  return (
    <div>
      <h1>Posts</h1>
      <ul className="grid justify-center">
        {receivedData.data?.map((post) => (
          <li
            onClick={handleIndexClick(post.id)}
            key={post.id}
            style={{ marginBottom: "20px" }}
            className="bg-gray-600 p-4 rounded-lg cursor-pointer hover:bg-gray-700 max-w-6xl"
          >
            <h2>{post.title}</h2>
            <p>{post.body}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FetchRQ;
