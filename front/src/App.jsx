import { Route, Routes } from "react-router-dom";
import Login from "./components/Login";
import Home from "./components/Home";
import Categories from "./components/Categories";
import ContentCategory from "./components/ContentCategory";
import ContentDetails from "./components/ContentDetails";
import NotFound from "./components/NotFound";
import Welcome from "./components/Welcome";
import RequireAuth from "./context/RequireAuth";
import Profile from "./components/Profile";

function App() {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/" element={<Welcome />} />
      <Route path="login" element={<Login />} />

      {/* Protected Routes */}
      <Route element={<RequireAuth />}>
        <Route path="home" element={<Home />} />
        <Route path="categories" element={<Categories />} />
        <Route path="content" element={<ContentCategory />} />
        <Route path="content/:id" element={<ContentDetails />} />
        <Route path="profile" element={<Profile />} />
      </Route>

      {/* Not Found */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default App;
