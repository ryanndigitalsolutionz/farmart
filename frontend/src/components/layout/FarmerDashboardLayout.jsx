import { NavLink, Outlet, useNavigate } from 'react-router-dom'
import {
  LuLayoutDashboard,
  LuClipboardList,
  LuShoppingBag,
  LuChartNoAxesColumn,
  LuUserRound,
  LuHouse,
  LuLogOut,
  LuMenu,
  LuX,
} from 'react-icons/lu'
import { useState } from 'react'

function FarmerDashboardLayout() {
  const [collapsed, setCollapsed] = useState(false)
  const navigate = useNavigate()

  const navigation = [
    {
      label: 'Dashboard',
      path: '/farmer/dashboard',
      icon: LuLayoutDashboard,
    },
    {
      label: 'My Listings',
      path: '/farmer/listings',
      icon: LuClipboardList,
    },
    {
      label: 'Orders',
      path: '/farmer/orders',
      icon: LuShoppingBag,
    },
    {
      label: 'Analytics',
      path: '/farmer/analytics',
      icon: LuChartNoAxesColumn,
    },
    {
      label: 'Farm Profile',
      path: '/farmer/farm-profile',
      icon: LuHouse,
    },
    {
      label: 'Profile',
      path: '/farmer/profile',
      icon: LuUserRound,
    },
  ]

  const handleLogout = () => {
    navigate('/login')
  }

  return (
    <>
      <style>{`
        .farmer-layout {
          min-height: 100vh;
          display: flex;

          background: #0d130f;
          color: #edf4ee;

          font-family: "Modern Antiqua", serif;
        }

        .farmer-sidebar {
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

        .farmer-sidebar.collapsed {
          width: 82px;
        }

        .farmer-sidebar-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 12px;

          min-height: 48px;
          margin-bottom: 25px;
        }

        .farmer-brand {
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

        .farmer-brand img {
          width: 39px;
          height: 39px;
          object-fit: contain;
          flex-shrink: 0;
        }

        .farmer-collapse-button {
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

        .farmer-collapse-button:hover {
          color: #72c9a3;
          border-color: #4a9f7b;
        }

        .farmer-navigation {
          display: flex;
          flex-direction: column;
          gap: 7px;
        }

        .farmer-nav-link {
          min-height: 48px;

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

          transition:
            color 180ms ease,
            background 180ms ease,
            border-color 180ms ease;
        }

        .farmer-nav-link:hover {
          color: #edf4ee;
          background: #1b2820;
        }

        .farmer-nav-link.active {
          color: #4fdc82;
          background: #1c3023;
          border-color: #294b35;
        }

        .farmer-nav-link svg {
          flex-shrink: 0;
        }

        .farmer-sidebar-footer {
          margin-top: auto;
        }

        .farmer-logout {
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

        .farmer-logout:hover {
          color: #d5a46d;
          background: #241c17;
        }

        .farmer-main {
          width: 100%;
          min-width: 0;

          margin-left: 250px;

          transition: margin-left 180ms ease;
        }

        .farmer-main.collapsed {
          margin-left: 82px;
        }

        @media (max-width: 760px) {
          .farmer-sidebar {
            width: 82px;
          }

          .farmer-sidebar .farmer-brand span,
          .farmer-sidebar .farmer-nav-link span,
          .farmer-sidebar .farmer-logout span {
            display: none;
          }

          .farmer-sidebar-header {
            justify-content: center;
          }

          .farmer-collapse-button {
            display: none;
          }

          .farmer-nav-link,
          .farmer-logout {
            justify-content: center;
            padding: 0;
          }

          .farmer-main,
          .farmer-main.collapsed {
            margin-left: 82px;
          }
        }
      `}</style>

      <div className="farmer-layout">

        <aside
          className={`farmer-sidebar ${
            collapsed ? 'collapsed' : ''
          }`}
        >
          <div className="farmer-sidebar-header">

            <NavLink
              to="/farmer/dashboard"
              className="farmer-brand"
            >
              <img
                src="/logo/farmart_full_logo_testing.png"
                alt="Farmart"
              />

              {!collapsed && <span>Farmart</span>}
            </NavLink>

            <button
              type="button"
              className="farmer-collapse-button"
              onClick={() => setCollapsed(!collapsed)}
              aria-label={
                collapsed
                  ? 'Expand sidebar'
                  : 'Collapse sidebar'
              }
            >
              {collapsed ? (
                <LuMenu size={18} />
              ) : (
                <LuX size={18} />
              )}
            </button>

          </div>

          <nav className="farmer-navigation">
            {navigation.map((item) => {
              const Icon = item.icon

              return (
                <NavLink
                  key={item.path}
                  to={item.path}
                  className={({ isActive }) =>
                    `farmer-nav-link ${
                      isActive ? 'active' : ''
                    }`
                  }
                >
                  <Icon size={19} />
                  {!collapsed && <span>{item.label}</span>}
                </NavLink>
              )
            })}
          </nav>

          <div className="farmer-sidebar-footer">
            <button
              type="button"
              className="farmer-logout"
              onClick={handleLogout}
            >
              <LuLogOut size={19} />
              {!collapsed && <span>Logout</span>}
            </button>
          </div>

        </aside>

        <main
          className={`farmer-main ${
            collapsed ? 'collapsed' : ''
          }`}
        >
          <Outlet />
        </main>

      </div>
    </>
  )
}

export default FarmerDashboardLayout
