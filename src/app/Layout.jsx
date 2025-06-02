import { Outlet, Navigate } from "react-router-dom";
import NavBar from "../components/navbar/NavBar";

const Layout = ({ isLoggedIn }) => {
  if (!isLoggedIn) {
    // replace=true means replace the current URL in browser history
    // instead of adding a new entry. This prevents the user from
    // clicking "back" to return to this protected route
    return <Navigate to="/" replace />;
  }

  return (
    <div className="layout">
      <NavBar />
      {/* Outlet is a special React Router component that renders the child route's element */}
      {/* When you navigate between routes (/home, /contacts, /groups), the matching component */}
      {/* will be rendered here while keeping the Layout's elements (NavBar) static */}
      <Outlet />
    </div>
  );
};

export default Layout;
