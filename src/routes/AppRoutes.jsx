import { Routes, Route } from "react-router-dom";
import { ROUTES } from "../constants/routes";
import LandingPage from "../pages/landing/LandingPage";
import Login from "../pages/auth/Login";
import Register from "../pages/auth/Register";
import FarmSetup from "../pages/auth/FarmSetup";
import ForgotPassword from "../pages/auth/ForgotPassword";
import VerifyEmail from "../pages/auth/VerifyEmail";
import ResetPassword from "../pages/auth/ResetPassword";
import AdminRoute from "./AdminRoute";
import FarmerRoute from "./FarmerRoute";
import BuyerRoute from "./BuyerRoute";
import PublicLayout from "../components/layout/PublicLayout";
import BuyerLayout from "../components/layout/BuyerLayout";
import FarmerLayout from "../components/layout/FarmerLayout";
import DashboardLayout from "../components/layout/DashboardLayout";
import Dashboard from "../pages/admin/Dashboard";
import Listings from "../pages/admin/Listings";
import Disputes from "../pages/admin/Disputes";
import FarmerDetails from "../pages/admin/FarmerDetails";
import BuyerDetails from "../pages/admin/BuyerDetails";
import Users from "../pages/admin/Users";
import Farmers from "../pages/admin/Farmers";
import Orders from "../pages/admin/Orders";
import Transactions from "../pages/admin/Transactions";
import Reports from "../pages/admin/Reports";
import Settings from "../pages/admin/Settings";
import Announcements from "../pages/admin/Announcements";
import BuyerDashboard from "../pages/buyer/Dashboard";
import BuyerCart from "../pages/buyer/Cart";
import BuyerCheckout from "../pages/buyer/Checkout";
import BuyerOrders from "../pages/buyer/Orders";
import BuyerOrderDetails from "../pages/buyer/OrderDetails";
import BuyerWishlist from "../pages/buyer/Wishlist";
import BuyerReviews from "../pages/buyer/Reviews";
import BuyerProfile from "../pages/buyer/Profile";
import BuyerMarketplace from "../pages/marketplace/Livestock";
import LivestockDetails from "../pages/marketplace/LivestockDetails";
import FarmerDashboard from "../pages/farmer/Dashboard";
import FarmerCreateListing from "../pages/farmer/CreateListings";
import FarmerEditListing from "../pages/farmer/CreateListings";
import FarmerOrders from "../pages/farmer/Orders";
import FarmerOrderDetails from "../pages/farmer/OrderDetails";
import FarmerAnalytics from "../pages/farmer/Analytics";
import FarmerProfile from "../pages/farmer/Profile";
import FarmerFarmProfile from "../pages/farmer/FarmProfile";
import PublicFarmerProfile from "../pages/marketplace/FarmerProfile";
import NotFound from "../pages/NotFound";
import Unauthorized from "../pages/Unauthorized";
import Contact from "../pages/public/Contact";
import HelpCenter from "../pages/public/HelpCenter";
import FAQs from "../pages/public/FAQs";
import ReportProblem from "../pages/public/ReportProblem";
import Privacy from "../pages/public/Privacy";
import Terms from "../pages/public/Terms";

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<PublicLayout><LandingPage /></PublicLayout>} />
      <Route path={ROUTES.LOGIN} element={<PublicLayout><Login /></PublicLayout>} />
      <Route path={ROUTES.REGISTER} element={<PublicLayout><Register /></PublicLayout>} />
      <Route path={ROUTES.FORGOT_PASSWORD} element={<PublicLayout><ForgotPassword /></PublicLayout>} />
      <Route path={ROUTES.VERIFY_EMAIL} element={<PublicLayout><VerifyEmail /></PublicLayout>} />
      <Route path={ROUTES.RESET_PASSWORD} element={<PublicLayout><ResetPassword /></PublicLayout>} />
      <Route path={ROUTES.FARM_SETUP} element={<PublicLayout><FarmSetup /></PublicLayout>} />
      <Route path={ROUTES.CONTACT} element={<PublicLayout><Contact /></PublicLayout>} />
      <Route path={ROUTES.HELP} element={<PublicLayout><HelpCenter /></PublicLayout>} />
      <Route path={ROUTES.FAQS} element={<PublicLayout><FAQs /></PublicLayout>} />
      <Route path={ROUTES.REPORT} element={<PublicLayout><ReportProblem /></PublicLayout>} />
      <Route path={ROUTES.PRIVACY} element={<PublicLayout><Privacy /></PublicLayout>} />
      <Route path={ROUTES.TERMS} element={<PublicLayout><Terms /></PublicLayout>} />

      <Route path="/buyer" element={<BuyerRoute />}>
        <Route element={<BuyerLayout />}>
          <Route index element={<BuyerDashboard />} />
          <Route path="marketplace" element={<BuyerMarketplace />} />
          <Route path="cart" element={<BuyerCart />} />
          <Route path="checkout" element={<BuyerCheckout />} />
          <Route path="orders" element={<BuyerOrders />} />
          <Route path="orders/:id" element={<BuyerOrderDetails />} />
          <Route path="wishlist" element={<BuyerWishlist />} />
          <Route path="reviews" element={<BuyerReviews />} />
          <Route path="profile" element={<BuyerProfile />} />
        </Route>
      </Route>

      <Route path="/farmer" element={<FarmerRoute />}>
        <Route element={<FarmerLayout />}>
          <Route index element={<FarmerDashboard />} />
          <Route path="listings" element={<FarmerDashboard />} />
          <Route path="listings/new" element={<FarmerCreateListing />} />
          <Route path="listings/:id" element={<FarmerEditListing />} />
          <Route path="orders" element={<FarmerOrders />} />
          <Route path="orders/:id" element={<FarmerOrderDetails />} />
          <Route path="analytics" element={<FarmerAnalytics />} />
          <Route path="profile" element={<FarmerProfile />} />
          <Route path="farm-profile" element={<FarmerFarmProfile />} />
        </Route>
      </Route>

      <Route path="/farmer/:id" element={<PublicLayout><PublicFarmerProfile /></PublicLayout>} />

      <Route path="/admin" element={<AdminRoute />}>
        <Route element={<DashboardLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="users" element={<Users />} />
          <Route path="farmers" element={<Farmers />} />
          <Route path="farmers/:id" element={<FarmerDetails />} />
          <Route path="listings" element={<Listings />} />
          <Route path="orders" element={<Orders />} />
          <Route path="transactions" element={<Transactions />} />
          <Route path="disputes" element={<Disputes />} />
          <Route path="reports" element={<Reports />} />
          <Route path="settings" element={<Settings />} />
          <Route path="announcements" element={<Announcements />} />
          <Route path="buyers/:id" element={<BuyerDetails />} />
        </Route>
      </Route>

      <Route path="/livestock/:id" element={<PublicLayout><LivestockDetails /></PublicLayout>} />

      <Route path="/unauthorized" element={<PublicLayout><Unauthorized /></PublicLayout>} />
      <Route path="*" element={<PublicLayout><NotFound /></PublicLayout>} />
    </Routes>
  );
}
