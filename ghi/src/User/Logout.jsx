import React from "react";
import { useDeleteTokenMutation } from "../store/authApi";

const Logout = () => {
  const [deleteToken, result] = useDeleteTokenMutation();

  const handleLogout = () => {
    deleteToken();
  };

  return (
    <div>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};
export default Logout;
