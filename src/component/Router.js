import React from "react";
import {
    Routes,
    Route
} from "react-router-dom";
import Login from "../screen/Login";
import Signup from "../screen/Signup";
import TaskList from "../screen/TaskList";

export default function Router() {
    return (
    <Routes>
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />}/>
        <Route path="/" element={<TaskList />}/>
    </Routes>
    )
}