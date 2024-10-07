import { useQuery } from "@tanstack/react-query";
import React from "react";
import { fetchIndiPost } from "../../api/api";
import Loader from "../Layout/Loader";
import { useParams } from "react-router-dom";

const DetailsPage = () => {
    const url = useParams();

    const myId = parseInt(url.id);

    const receivedData = useQuery({
        queryKey: ["post"],
        queryFn: () => fetchIndiPost(myId),
    });

    // receivedData && console.log(receivedData);

    if (receivedData.isLoading) return <Loader />;
    if (receivedData.isError)
        return <div>Error: {receivedData.error.message}</div>;

    return (
        <div className="my-20 mx-auto max-w-lg">
            <h1 className="text-2xl font-bold my-5">Post Details</h1>
            <div className="flex justify-between items-center">
                <span>ID: {receivedData.data.data?.id}</span>
                <button
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-4 rounded"
                    onClick={() => window.history.back()}
                >
                    Back
                </button>
            </div>
            <h1 className="bg-gray-600 p-5 text-3xl font-bold my-3 text-white rounded-md">
                {receivedData.data.data?.title}
            </h1>
            <p className="text-gray-500 my-5 bg-gray-600 text-white p-5 rounded-md">
                {receivedData.data.data?.body}
            </p>
        </div>
    );
};

export default DetailsPage;
