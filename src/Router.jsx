import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "./App";
import Home from "./components/Home";

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

]);

const Router = () => {
    return <RouterProvider router={router} />
}

export default Router;