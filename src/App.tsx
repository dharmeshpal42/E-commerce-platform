import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { Navbar } from "./components/ui/Navbar";
import { ProtectedRoute } from "./components/auth/ProtectedRoute";
import { PublicRoute } from "./components/auth/PublicRoute";
import { Toaster } from "sonner";
import { ScrollToTop } from "./hooks/ScrollToTop";
import { useEffect, Suspense, lazy } from "react";
import { motion } from "framer-motion";

const LandingPage = lazy(() => import("./pages/LandingPage").then((m) => ({ default: m.LandingPage })));
const ProductListingPage = lazy(() => import("./pages/ProductListingPage").then((m) => ({ default: m.ProductListingPage })));
const ProductDetailsPage = lazy(() => import("./pages/ProductDetailsPage").then((m) => ({ default: m.ProductDetailsPage })));
const LoginPage = lazy(() => import("./pages/LoginPage").then((m) => ({ default: m.LoginPage })));
const CartPage = lazy(() => import("./pages/CartPage").then((m) => ({ default: m.CartPage })));
const WishlistPage = lazy(() => import("./pages/WishlistPage").then((m) => ({ default: m.WishlistPage })));
const CheckoutPage = lazy(() => import("./pages/CheckoutPage").then((m) => ({ default: m.CheckoutPage })));
const OrderSuccessPage = lazy(() => import("./pages/OrderSuccessPage").then((m) => ({ default: m.OrderSuccessPage })));
const OrdersPage = lazy(() => import("./pages/OrdersPage").then((m) => ({ default: m.OrdersPage })));

const PageLoader = () => (
  <div className="min-h-[calc(100vh-5rem)] flex items-center justify-center bg-gray-50 dark:bg-slate-950">
    <motion.div
      animate={{ rotate: 360 }}
      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
      className="w-12 h-12 border-4 border-indigo-600/20 border-t-indigo-600 rounded-full"
    />
  </div>
);

function App() {
  // Set dark mode as default
  useEffect(() => {
    document.documentElement.classList.add("dark");
  }, []);

  return (
    <Router>
      <ScrollToTop />
      <Toaster
        position="bottom-right"
        richColors
      />
      <div className="min-h-screen bg-gray-50 dark:bg-slate-950 text-gray-900 dark:text-slate-100 font-sans selection:bg-blue-100 dark:selection:bg-blue-900 selection:text-blue-900 dark:selection:text-blue-100">
        <Navbar />
        <main>
          <Suspense fallback={<PageLoader />}>
            <Routes>
            <Route
              path="/"
              element={<LandingPage />}
            />
            <Route
              path="/shop"
              element={<ProductListingPage />}
            />
            <Route
              path="/product/:id"
              element={<ProductDetailsPage />}
            />
            <Route
              path="/login"
              element={
                <PublicRoute>
                  <LoginPage />
                </PublicRoute>
              }
            />
            <Route
              path="/cart"
              element={<CartPage />}
            />
            <Route
              path="/wishlist"
              element={<WishlistPage />}
            />
            <Route
              path="/checkout"
              element={
                <ProtectedRoute>
                  <CheckoutPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/order-success"
              element={
                <ProtectedRoute>
                  <OrderSuccessPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/orders"
              element={
                <ProtectedRoute>
                  <OrdersPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="*"
              element={<Navigate to="/" />}
            />
            </Routes>
          </Suspense>
        </main>
      </div>
    </Router>
  );
}

export default App;
