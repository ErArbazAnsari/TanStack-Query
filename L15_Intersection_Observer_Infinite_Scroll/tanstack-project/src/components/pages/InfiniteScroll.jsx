import React, { useEffect } from "react";
import { useInfiniteQuery } from "@tanstack/react-query";
import { fetchUsers } from "../../api/api";
import { useInView } from "react-intersection-observer";

const InfiniteScroll = () => {
    const { data, hasNextPage, fetchNextPage, isFetchingNextPage } =
        useInfiniteQuery({
            queryKey: ["users"],
            queryFn: fetchUsers,
            getNextPageParam: (lastPage, allPages) => {
                console.log(lastPage, allPages);
                return lastPage.length == 10 ? allPages.length + 1 : undefined;
            },
        });

    // console.log(data);

    // const handleScroll = () => {
    //     const bottom =
    //         window.innerHeight + window.scrollY >=
    //         document.documentElement.scrollHeight - 1;
    //     if (bottom && hasNextPage) {
    //         fetchNextPage();
    //     }
    // };

    const { ref, inView } = useInView({
        threshold: 1,
    });

    useEffect(() => {
        if (inView && hasNextPage) {
            fetchNextPage();
        }
    }, [inView, fetchNextPage, hasNextPage]);

    return (
        <div>
            <h1>Infinite GitHub Users</h1>

            {data?.pages?.map((page, index) => (
                <ul key={index}>
                    {page.map((user) => (
                        <li
                            key={user.id}
                            style={{
                                padding: "10px",
                                border: "1px solid #ccc",
                            }}
                        >
                            <p>{user.login}</p>
                            <img
                                src={user.avatar_url}
                                alt="user profile pic"
                                height="100"
                                width="100"
                            />
                        </li>
                    ))}
                </ul>
            ))}
            <div ref={ref}>{isFetchingNextPage && "Loading..."}</div>
        </div>
    );
};

export default InfiniteScroll;
