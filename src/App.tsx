import "./App.css";
import {
    createBrowserRouter,
    createRoutesFromElements,
    Route,
    RouterProvider,
} from "react-router-dom";
import Dashboard from "./Dashboard";
import { ChakraProvider } from "@chakra-ui/react";
import { theme } from "./Theme";
import RelationsTable from "./Relationships";
import NewRelation from "./NewRelation";
import RelationDetails from "./RelationDetails";
import NoteList from "./NoteList";
import Login from "./Login";
import Signup from "./Signup";
import { ProtectedRoute } from "./ProtectedRoute";
import AuthProvider from "./AuthProvider";
import UpdateRelation from "./UpdateRelation";

const router = createBrowserRouter(
    createRoutesFromElements(
        <>
            <Route path="/" element={<ProtectedRoute />}>
                <Route element={<Dashboard />}>
                    <Route index element={<RelationsTable />}></Route>
                    <Route
                        path="/relations/update/:id"
                        element={<UpdateRelation />}
                    ></Route>
                    <Route
                        path="/relations/new"
                        element={<NewRelation />}
                    ></Route>
                    <Route
                        path="/relations/:id/note/:noteId"
                        element={<RelationDetails />}
                    ></Route>
                    <Route path="/relations/:id" element={<NoteList />}></Route>
                </Route>
            </Route>
            <Route path="/login" element={<Login />}></Route>
            <Route path="/signup" element={<Signup />}></Route>
        </>
    )
);

function App() {
    return (
        <ChakraProvider value={theme}>
            <AuthProvider>
                <RouterProvider router={router}></RouterProvider>
            </AuthProvider>
        </ChakraProvider>
    );
}

export default App;
