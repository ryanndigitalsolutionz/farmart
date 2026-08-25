import { useState, useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import AdminRoute from "./routes/AdminRoute";
import DashboardLayout from "./components/layout/DashboardLayout";
import SplashScreen from "./components/SplashScreen";
import Dashboard from "./pages/admin/Dashboard";
import Listings from "./pages/admin/Listings";
import Disputes from "./pages/admin/Disputes";
import FarmerDetails from "./pages/admin/FarmerDetails";
import BuyerDetails from "./pages/admin/BuyerDetails";
import Users from "./pages/admin/Users";
import Farmers from "./pages/admin/Farmers";
import Orders from "./pages/admin/Orders";
import Transactions from "./pages/admin/Transactions";
import Reports from "./pages/admin/Reports";
import Settings from "./pages/admin/Settings";
import Announcements from "./pages/admin/Announcements";

import "./App.css";


function App() {
  const [showSplash, setShowSplash] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setShowSplash(false), 500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <AnimatePresence>
        {showSplash && <SplashScreen key="splash" />}
      </AnimatePresence>

      <Routes>
        {/* TODO: once Ryan's auth/landing pages are merged, this becomes
        the real "/" route instead of redirecting straight to admin */}
        <Route path="/" element={<Navigate to="/admin/dashboard" replace />} />

        <Route path="/admin" element={<AdminRoute />}>
          <Route element={<DashboardLayout />}>
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="users" element={<Users />} />
            <Route path="farmers" element={<Farmers />} />
            <Route path="farmers/:farmerId" element={<FarmerDetails />} />
            <Route path="listings" element={<Listings />} />
            <Route path="orders" element={<Orders />} />
            <Route path="transactions" element={<Transactions />} />
            <Route path="disputes" element={<Disputes />} />
            <Route path="reports" element={<Reports />} />
            <Route path="settings" element={<Settings />} />
            <Route path="announcements" element={<Announcements />} />
            <Route path="buyers/:buyerId" element={<BuyerDetails />} />
          </Route>
        </Route>
      </Routes>
    </>
  );
}

export default App;