import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";

function DashboardLayout() {
  return (
    <>
      <style>{`
        .admin-layout {
          min-height: 100vh;
          display: flex;
          background: #0d130f;
          color: #edf4ee;
        }

        .admin-main {
          width: 100%;
          min-width: 0;
          margin-left: 250px;
          padding: 28px 32px;
          box-sizing: border-box;
        }

        @media (max-width: 760px) {
          .admin-main {
            margin-left: 82px;
            padding: 20px 16px;
          }

          .admin-main table {
            display: block;
            overflow-x: auto;
            white-space: nowrap;
          }
        }
      `}</style>

      <div className="admin-layout">
        <Sidebar />
        <main className="admin-main">
          <Outlet />
        </main>
      </div>
    </>
  );
}

export default DashboardLayout;