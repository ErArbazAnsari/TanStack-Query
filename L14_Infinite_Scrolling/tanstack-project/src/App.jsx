import { createBrowserRouter, RouterProvider } from "react-router-dom";
import MainLayout from "./components/Layout/MainLayout";
import Home from "./components/pages/Home";
import FetchOld from "./components/pages/FetchOld";
import FetchRQ from "./components/pages/FetchRQ";
import "./App.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import DetailsPage from "./components/pages/DetailsPage";
import InfiniteScroll from "./components/pages/InfiniteScroll";
const router = createBrowserRouter([
    {
        path: "/",
        element: <MainLayout />,
        children: [
            {
                path: "/",
                element: <Home />,
            },
            {
                path: "/trad",
                element: <FetchOld />,
            },
            {
                path: "rq/posts",
                element: <FetchRQ />,
            },
            {
                path: "rq/:id",
                element: <DetailsPage />,
            },
            {
                path: "/infinite",
                element: <InfiniteScroll />,
            },
        ],
    },
]);

function App() {
    const queryClient = new QueryClient();
    return (
        <div className="container mx-auto">
            <QueryClientProvider client={queryClient}>
                <RouterProvider router={router} />
            </QueryClientProvider>
        </div>
    );
}

export default App;
