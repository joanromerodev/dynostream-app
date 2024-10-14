import { redirect } from "react-router-dom";
const logout = (setAuth) => {
  localStorage.removeItem("data");
  setAuth(null);
  redirect("/");
};

export default logout;
