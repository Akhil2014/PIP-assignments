import React from "react";
import { Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Feed from "./pages/Feed";
import FriendRequestPage from "./pages/FriendRequestPage";

const AllRotes = () => {
  return (
    <>
      <Routes>
        <Route path="/feed/friendRequest" element={<FriendRequestPage />} />
        <Route path="/" element={<Feed />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </>
  );
};

export default AllRotes;