import React from "react";
import UserList from "./UserList";
import UserDetailPage from "./UserDetail";
import { Outlet } from "react-router-dom";

const UsersPage = () => {
  return (
    <div className="row">
      <div className="col">
        <UserList />
      </div>
      <div className="col">
        <Outlet />
      </div>
    </div>
  );
};

export default UsersPage;
