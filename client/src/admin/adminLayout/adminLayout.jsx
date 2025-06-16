import { Link } from "react-router-dom";
import { MdExitToApp } from "react-icons/md";
import DashBoardBody from "../dashboardBody/dashboardBody";
import "./adminLayout.scss"; // ✅ import SCSS

const AdminLayout = () => {
  return (
    <>
      <div className="header">
        <Link to="/">
          <img src="/logo.png" alt="dummyLogoColored" />
        </Link>
        <div className="admin-info">
          <p>Hi! Admin</p>
          <Link to="/" className="logout-link">
            <MdExitToApp />
          </Link>
        </div>
      </div>

      <DashBoardBody/>
    </>
  );
};

export default AdminLayout;
