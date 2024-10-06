import React, { useEffect } from "react";
import { deletePost, fetchPosts } from "../../api/api";
import {
    keepPreviousData,
    useMutation,
    useQuery,
    useQueryClient,
} from "@tanstack/react-query";
import Loader from "../Layout/Loader";
import { useNavigate } from "react-router-dom";

const FetchRQ = () => {
    const [page, setPage] = React.useState(() => {
        // Retrieve the page from localStorage and convert it to a number
        const savedPage = localStorage.getItem("currentPage");
        return savedPage ? parseInt(savedPage, 10) : 1;
    });

    const navigate = useNavigate();
    const queryClient = useQueryClient();

    const getPostData = async () => {
        try {
            const response = await fetchPosts(page);
            return response.status === 200 ? response.data : [];
        } catch (error) {
            console.log(error);
            return [];
        }
    };

    const receivedData = useQuery({
        queryKey: ["posts", page],
        queryFn: getPostData,
        staleTime: 1000 * 60 * 5, // 5 minutes
        refetchInterval: 10000, // Poll every 10 seconds
        refetchIntervalInBackground: true,
        placeholderData: keepPreviousData, // Keep the previous data while fetching new data
        onError: (error) => console.error("Fetching posts failed:", error),
    });

    useEffect(() => {
        // Sync the current page with localStorage whenever it changes
        localStorage.setItem("currentPage", page);
    }, [page]);

    const handleIndexClick = (id) => () => {
        // Save the current page to localStorage before navigating
        navigate(`/rq/${id}`);
    };

    const handleNextPage = () => {
        setPage((prev) => prev + 1);
    };

    const handlePrevPage = () => {
        if (page > 1) {
            setPage((prev) => prev - 1);
        }
    };

    //! mutation function to delete a post
    const deleteMutate = useMutation({
        mutationFn: (id) => deletePost(id),
        onSuccess: (data, id) => {
            // console.log(data, id);
            queryClient.setQueryData(["posts", page], (currEle) => {
                return currEle?.filter((post) => post.id !== id);
            });
        },
    });

    //! Page Loader and Error Handling
    if (receivedData.isLoading) return <Loader />;
    if (receivedData.isError)
        return (
            <div className="text-center text-red-500">
                Error: {receivedData.error.message || "Failed to load posts"}
            </div>
        );

    return (
        <div className="max-w-4xl mx-auto px-4">
            <h1 className="text-4xl font-bold text-center my-3 text-gray-200">
                <span
                    onClick={() => setPage(1)}
                    className="cursor-pointer text-gray-400 hover:text-gray-200"
                >
                    All Posts
                </span>
            </h1>
            <ul className="grid gap-6">
                {receivedData.data?.map((post) => (
                    <>
                        <li
                            key={post.id}
                            className="bg-gray-800 p-6 rounded-lg shadow-lg hover:bg-gray-700 transition duration-300 ease-in-out"
                        >
                            <div>
                                <p>{post.id}</p>
                                <h2 className="text-2xl font-semibold text-white">
                                    {post.title.length > 60
                                        ? post.title.slice(0, 60) + "..."
                                        : post.title}
                                </h2>
                                <p className="text-gray-400 mt-2">
                                    {post.body.length > 200
                                        ? post.body.slice(0, 200) + "..."
                                        : post.body}
                                </p>
                            </div>
                            <div className="flex justify-between items-center mt-4">
                                <button
                                    onClick={() => deleteMutate.mutate(post.id)}
                                    className="bg-red-600 px-4 py-2 mt-4 rounded-lg hover:bg-red-700 transition-colors"
                                >
                                    Delete Post
                                </button>
                                <button
                                    className="bg-blue-600 px-4 py-2 mt-4 rounded-lg hover:bg-blue-700 transition-colors"
                                    onClick={handleIndexClick(post.id)}
                                >
                                    More Details
                                </button>
                            </div>
                        </li>
                    </>
                ))}
            </ul>

            <div className="flex justify-between items-center my-10">
                <button
                    disabled={page === 1}
                    className={`bg-gray-600 px-4 py-2 rounded-lg transition-colors ${
                        page === 1
                            ? "cursor-not-allowed opacity-50"
                            : "hover:bg-gray-700"
                    }`}
                    onClick={handlePrevPage}
                >
                    Prev
                </button>
                <p className="text-gray-400">Page {page}</p>
                <button
                    className="bg-gray-600 px-4 py-2 rounded-lg hover:bg-gray-700 transition-colors"
                    onClick={handleNextPage}
                >
                    Next
                </button>
            </div>
        </div>
    );
};

export default FetchRQ;
