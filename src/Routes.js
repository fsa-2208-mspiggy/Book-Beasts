import React from "react";
import { Routes, Route } from "react-router-dom";
// components
import { LoginPage, SignupPage } from "./components/authentication";
import StudentView from "./components/student/StudentView";
import Home from "./components/home/Home";
import AllBooks from "./components/books/AllBooks";
import SingleBook from "./components/books/SingleBook";
import Team from "./components/footer/Team";
import BookView from "./components/books/BookView";
import BookEditor from "./components/student/BookEditor";
import { InstructorNav } from "./components/instructor";

const Router = () => {
    return(
        <Routes>
            <Route index path="/" element={<AllBooks />} />
            <Route index path="/books" element={<AllBooks />} />
            <Route index path="/books/:id" element={<BookView />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignupPage />} />
            <Route path="/bookedit" element={<BookEditor />} />
            <Route path="/team" element={<Team />} />
            <Route path="/student" element={<StudentView />} />
            <Route path="instructorPortal/:id/*" element={<InstructorNav/>}/>
        </Routes>
    )
}

export default Router;


