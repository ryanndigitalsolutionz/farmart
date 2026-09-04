import { NavLink, useNavigate } from "react-router-dom";
import {
  LuLayoutDashboard,
  LuUsers,
  LuTractor,
  LuBeef,
  LuPackage,
  LuCreditCard,
  LuScale,
  LuChartNoAxesColumn,
  LuSettings,
  LuMegaphone,
  LuLogOut,
  LuMenu,
  LuX,
} from "react-icons/lu";
import { useState } from "react";

function Sidebar() {
  const [collapsed, setCollapsed] = useState(false);
  const navigate = useNavigate();

  const navigation = [
    { label: "Dashboard", path: "/admin/dashboard", icon: LuLayoutDashboard },
    { label: "Users", path: "/admin/users", icon: LuUsers },
    { label: "Farmers", path: "/admin/farmers", icon: LuTractor },
    { label: "Listings", path: "/admin/listings", icon: LuBeef },
    { label: "Orders", path: "/admin/orders", icon: LuPackage },
    { label: "Transactions", path: "/admin/transactions", icon: LuCreditCard },
    { label: "Disputes", path: "/admin/disputes", icon: LuScale },
    { label: "Reports", path: "/admin/reports", icon: LuChartNoAxesColumn },
    { label: "Settings", path: "/admin/settings", icon: LuSettings },
    { label: "Announcements", path: "/admin/announcements", icon: LuMegaphone },
  ];

  const handleLogout = () => {
    navigate("/login");
  };

  return (
    <>
      <style>{`
        .admin-sidebar {
          position: fixed;
          top: 0;
          left: 0;
          bottom: 0;
          z-index: 100;
          width: 250px;
          display: flex;
          flex-direction: column;
          padding: 22px 15px;
          border-right: 1px solid #26372c;
          background: #131b16;
          transition: width 180ms ease;
          box-sizing: border-box;
        }

        .admin-sidebar.collapsed {
          width: 82px;
        }

        .admin-sidebar-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 12px;
          min-height: 48px;
          margin-bottom: 25px;
        }

        .admin-brand {
          min-width: 0;
          display: flex;
          align-items: center;
          gap: 10px;
          color: #4fdc82;
          font-family: "IBM Plex Serif", serif;
          font-size: 22px;
          font-weight: 700;
          text-decoration: none;
        }

        .admin-brand img {
          width: 39px;
          height: 39px;
          object-fit: contain;
          flex-shrink: 0;
        }

        .admin-collapse-button {
          width: 35px;
          height: 35px;
          display: flex;
          align-items: center;
          justify-content: center;
          border: 1px solid #35483a;
          border-radius: 9px;
          background: #19241d;
          color: #a8b8ad;
          cursor: pointer;
        }

        .admin-collapse-button:hover {
          color: #72c9a3;
          border-color: #4a9f7b;
        }

        .admin-navigation {
          display: flex;
          flex-direction: column;
          gap: 7px;
          overflow-y: auto;
        }

        .admin-nav-link {
          min-height: 46px;
          display: flex;
          align-items: center;
          gap: 13px;
          padding: 0 14px;
          border: 1px solid transparent;
          border-radius: 12px;
          color: #91a198;
          text-decoration: none;
          white-space: nowrap;
          overflow: hidden;
          font-family: "Modern Antiqua", serif;
          font-size: 14px;
          transition:
            color 180ms ease,
            background 180ms ease,
            border-color 180ms ease;
        }

        .admin-nav-link:hover {
          color: #edf4ee;
          background: #1b2820;
        }

        .admin-nav-link.active {
          color: #4fdc82;
          background: #1c3023;
          border-color: #294b35;
        }

        .admin-nav-link svg {
          flex-shrink: 0;
        }

        .admin-sidebar-footer {
          margin-top: auto;
        }

        .admin-logout {
          width: 100%;
          min-height: 47px;
          display: flex;
          align-items: center;
          gap: 13px;
          padding: 0 14px;
          border: 1px solid transparent;
          border-radius: 12px;
          background: transparent;
          color: #9b8370;
          font-family: "Modern Antiqua", serif;
          font-size: 14px;
          cursor: pointer;
          text-align: left;
        }

        .admin-logout:hover {
          color: #d5a46d;
          background: #241c17;
        }

        @media (max-width: 760px) {
          .admin-sidebar {
            width: 82px;
          }

          .admin-sidebar .admin-brand span,
          .admin-sidebar .admin-nav-link span,
          .admin-sidebar .admin-logout span {
            display: none;
          }

          .admin-sidebar-header {
            justify-content: center;
          }

          .admin-collapse-button {
            display: none;
          }

          .admin-nav-link,
          .admin-logout {
            justify-content: center;
            padding: 0;
          }
        }
      `}</style>

      <aside className={`admin-sidebar ${collapsed ? "collapsed" : ""}`}>
        <div className="admin-sidebar-header">
          <NavLink to="/admin/dashboard" className="admin-brand">
            <img src="/logo/farmart_full_logo_testing.png" alt="Farmart" />
            {!collapsed && <span>Farmart</span>}
          </NavLink>

          <button
            type="button"
            className="admin-collapse-button"
            onClick={() => setCollapsed(!collapsed)}
            aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
          >
            {collapsed ? <LuMenu size={18} /> : <LuX size={18} />}
          </button>
        </div>

        <nav className="admin-navigation">
          {navigation.map((item) => {
            const Icon = item.icon;
            return (
              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive }) => `admin-nav-link ${isActive ? "active" : ""}`}
              >
                <Icon size={19} />
                {!collapsed && <span>{item.label}</span>}
              </NavLink>
            );
          })}
        </nav>

        <div className="admin-sidebar-footer">
          <button type="button" className="admin-logout" onClick={handleLogout}>
            <LuLogOut size={19} />
            {!collapsed && <span>Logout</span>}
          </button>
        </div>
      </aside>
    </>
  );
}

export default Sidebar;