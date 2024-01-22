import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "./App";
import Home from "./components/Home";
import GameDetailPage from "./components/GameDetailPage";

const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        children: [
            {
                index: true,
                element: <Home />,
            },
        ],
    },

    {
        path: "/game/:id",
        element: <GameDetailPage />,
    }

]);

const Router = () => {
    return <RouterProvider router={router} />
}

export default Router;