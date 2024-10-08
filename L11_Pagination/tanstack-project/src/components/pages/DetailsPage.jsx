import { useQuery } from "@tanstack/react-query";
import React from "react";
import { fetchIndiPost } from "../../api/api";
import Loader from "../Layout/Loader";
import { useParams, useNavigate } from "react-router-dom";

const DetailsPage = () => {
    const { id } = useParams();
    const myId = parseInt(id);
    const navigate = useNavigate();

    const { data, isLoading, isError, error } = useQuery({
        queryKey: ["post", myId], // Pass myId as part of the query key to ensure unique caching for each post
        queryFn: () => fetchIndiPost(myId),
        staleTime: 1000 * 60 * 5, // Cache the data for 5 minutes
        refetchOnWindowFocus: false, // Avoid refetching on window focus for a better experience
    });

    if (isLoading) return <Loader />;
    if (isError)
        return (
            <div className="text-center text-red-500 font-bold">
                Error: {error.message || "Failed to load post details"}
            </div>
        );

    return (
        <div className="max-w-4xl mx-auto px-4 py-8">
            <div className="flex justify-between items-center mb-5">
                <h1 className="text-3xl font-bold text-gray-200">
                    Post Details
                </h1>
                <button
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition duration-300 ease-in-out"
                    onClick={() => {
                        navigate(-1);
                    }} // Use navigate for a more controlled back navigation
                >
                    Back
                </button>
            </div>
            <div className="bg-gray-700 p-6 rounded-lg shadow-lg mb-6">
                <div className="flex justify-between items-center mb-3">
                    <span className="text-gray-300">ID: {data?.data?.id}</span>
                </div>
                <h2 className="text-4xl font-bold text-white mb-4">
                    {data?.data?.title}
                </h2>
                <p className="text-gray-400 leading-relaxed">
                    {data?.data?.body}
                </p>
            </div>
        </div>
    );
};

export default DetailsPage;
