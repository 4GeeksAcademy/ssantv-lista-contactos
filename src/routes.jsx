// Import necessary components and functions from react-router-dom.

import {
    createBrowserRouter,
    createRoutesFromElements,
    Route,
} from "react-router-dom";
import { Layout } from "./pages/Layout.jsx";
import { Home } from "./pages/Home.jsx";
import { Update } from "./pages/Update.jsx";
import { Details } from "./pages/Details.jsx";
import { User } from "./pages/User.jsx";


export const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<Layout />} errorElement={<h1>Not found!</h1>} >

        {/* Nested Routes: Defines sub-routes within the BaseHome component. */}
        <Route path= "/" element={<Home />} />
        <Route path="/user" element = {<User/>} />
        <Route path="/update" element={<Update />} />
        <Route path="/person/:id" element={<Details />} />
      </Route>
    )
);