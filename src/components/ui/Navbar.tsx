import { Link } from "react-router-dom";
import {
  ShoppingCart,
  User,
  LogOut,
  Menu,
  X,
  Heart,
  ArrowRight,
  Package,
  ChevronDown,
} from "lucide-react";
import { useAuthStore } from "../../store/useAuthStore";
import { useCartStore } from "../../store/useCartStore";
import { Button } from "./Button";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export const Navbar = () => {
  const { user, logout, isAuthenticated, wishlist } = useAuthStore();
  const totalItems = useCartStore((state) => state.totalItems());
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 bg-[#0a091a] border-b border-white/10 transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20 items-center">
          <div className="flex items-center">
            <Link
              to="/"
              className="text-3xl font-black bg-gradient-to-r from-indigo-500 to-purple-600 bg-clip-text text-transparent tracking-tighter"
            >
              VOGUE
            </Link>
          </div>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center space-x-8">
            <Link
              to="/shop"
              className="text-gray-300 hover:text-white font-bold transition-colors"
            >
              Shop
            </Link>

            <div className="h-6 w-px bg-gray-700" />

            <Link
              to="/wishlist"
              className="relative group p-2 text-gray-400 hover:bg-white/10 rounded-xl transition-all"
            >
              <Heart className="w-5 h-5 group-hover:text-rose-400 transition-colors" />
              {wishlist.length > 0 && (
                <span className="absolute top-1 right-1 bg-rose-500 text-white text-[10px] font-black px-1.5 py-0.5 rounded-full ring-2 ring-[#0a091a]">
                  {wishlist.length}
                </span>
              )}
            </Link>

            <Link
              to="/cart"
              className="relative group p-2 text-gray-400 hover:bg-white/10 rounded-xl transition-all"
            >
              <ShoppingCart className="w-5 h-5 group-hover:text-indigo-400 transition-colors" />
              {totalItems > 0 && (
                <span className="absolute top-1 right-1 bg-indigo-500 text-white text-[10px] font-black px-1.5 py-0.5 rounded-full ring-2 ring-[#0a091a]">
                  {totalItems}
                </span>
              )}
            </Link>

            {isAuthenticated ? (
              <div className="relative flex items-center pl-4 border-l border-gray-700">
                <div
                  className="flex items-center gap-2 group cursor-pointer"
                  onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                >
                  <div className="relative">
                    <img
                      src={user?.avatar}
                      alt={user?.name}
                      className="w-10 h-10 rounded-xl border-2 border-transparent group-hover:border-indigo-500 transition-all object-cover"
                    />
                    <div className="absolute -bottom-1 -right-1 w-3.5 h-3.5 bg-green-500 border-2 border-[#0a091a] rounded-full" />
                  </div>
                  <div className="hidden lg:flex items-center gap-3">
                    <div className="text-left">
                      <p className="text-sm font-bold text-white leading-none group-hover:text-indigo-400 transition-colors">
                        {user?.name}
                      </p>
                      <p className="text-[10px] text-gray-400 mt-1 uppercase tracking-wider font-bold">
                        Member
                      </p>
                    </div>
                    <ChevronDown className={`w-4 h-4 text-gray-400 transition-transform duration-300 ${isUserMenuOpen ? 'rotate-180' : ''}`} />
                  </div>
                </div>

                <AnimatePresence>
                  {isUserMenuOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 15, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 10, scale: 0.95 }}
                      transition={{ type: "spring", stiffness: 300, damping: 25 }}
                      className="absolute top-[calc(100%+1rem)] right-0 w-64 bg-[#131127]/95 backdrop-blur-2xl border border-white/10 rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.5)] overflow-hidden z-50 origin-top-right"
                    >
                      <div className="p-4 bg-white/[0.02] border-b border-white/10">
                        <div className="flex flex-col">
                          <p className="text-sm font-black text-white truncate">
                            {user?.name}
                          </p>
                          <p className="text-xs text-gray-400 font-medium truncate mt-0.5">
                            {user?.email}
                          </p>
                        </div>
                      </div>
                      <div className="p-2 flex flex-col gap-1">
                        <Link
                          to="/orders"
                          onClick={() => setIsUserMenuOpen(false)}
                          className="flex items-center px-3 py-2.5 rounded-xl text-sm font-bold text-gray-300 hover:text-white hover:bg-white/10 transition-all group"
                        >
                          <div className="w-8 h-8 rounded-lg bg-indigo-500/20 text-indigo-400 flex items-center justify-center mr-3 group-hover:bg-indigo-500 group-hover:text-white transition-colors">
                            <Package className="w-4 h-4" />
                          </div>
                          My Orders
                        </Link>
                        <button
                          onClick={() => {
                            setIsLogoutModalOpen(true);
                            setIsUserMenuOpen(false);
                          }}
                          className="w-full flex items-center px-3 py-2.5 rounded-xl text-sm font-bold text-gray-300 hover:text-white hover:bg-rose-500/20 transition-all group cursor-pointer"
                        >
                          <div className="w-8 h-8 rounded-lg bg-rose-500/10 text-rose-400 flex items-center justify-center mr-3 group-hover:bg-rose-500 group-hover:text-white transition-colors">
                            <LogOut className="w-4 h-4" />
                          </div>
                          Sign Out
                        </button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ) : (
              <Link to="/login">
                <Button className="cursor-pointerh-11 px-6 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white font-bold shadow-lg shadow-indigo-500/25 border-none">
                  Sign In
                </Button>
              </Link>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center gap-2">
            <Link
              to="/cart"
              className="relative p-2 text-gray-400"
            >
              <ShoppingCart className="w-6 h-6" />
              {totalItems > 0 && (
                <span className="absolute top-1 right-1 bg-indigo-500 text-white text-[10px] font-black px-1.5 py-0.5 rounded-full ring-2 ring-[#0a091a]">
                  {totalItems}
                </span>
              )}
            </Link>
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2 text-white cursor-pointer"
            >
              {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Nav */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed inset-0 top-20 z-40 bg-[#0a091a] md:hidden"
          >
            <div className="p-6 space-y-8">
              <div className="space-y-4">
                <Link
                  to="/shop"
                  onClick={() => setIsMenuOpen(false)}
                  className="flex items-center justify-between text-2xl font-black text-white"
                >
                  Shop
                  <ArrowRight className="w-6 h-6 text-gray-500" />
                </Link>
                <Link
                  to="/wishlist"
                  onClick={() => setIsMenuOpen(false)}
                  className="flex items-center justify-between text-2xl font-black text-white"
                >
                  Wishlist
                  <ArrowRight className="w-6 h-6 text-gray-500" />
                </Link>
              </div>

              {isAuthenticated ? (
                <div className="pt-8 border-t border-gray-700">
                  <div className="flex items-center gap-4 mb-8">
                    <img
                      src={user?.avatar}
                      alt={user?.name}
                      className="w-16 h-16 rounded-2xl"
                    />
                    <div>
                      <p className="text-xl font-black text-white">
                        {user?.name}
                      </p>
                      <p className="text-gray-400">{user?.email}</p>
                    </div>
                  </div>
                  <div className="space-y-4 mb-8">
                    <Link
                      to="/orders"
                      onClick={() => setIsMenuOpen(false)}
                      className="flex items-center text-lg font-bold text-gray-300 hover:text-white transition-colors"
                    >
                      <Package className="w-5 h-5 mr-3" />
                      My Orders
                    </Link>
                  </div>
                  <Button
                    variant="destructive"
                    className="cursor-pointer w-full h-14 rounded-2xl text-lg font-bold"
                    onClick={() => {
                      setIsLogoutModalOpen(true);
                      setIsMenuOpen(false);
                    }}
                  >
                    <LogOut className="w-5 h-5 mr-2" />
                    Sign Out
                  </Button>
                </div>
              ) : (
                <div className="pt-8 border-t border-gray-700">
                  <Link
                    to="/login"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <Button className="cursor-pointer w-full h-14 rounded-2xl text-lg font-bold bg-indigo-600 hover:bg-indigo-700">
                      Sign In to Account
                    </Button>
                  </Link>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      <AnimatePresence>
        {isLogoutModalOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
              onClick={() => setIsLogoutModalOpen(false)}
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-sm bg-[#131127] border border-white/10 rounded-3xl shadow-2xl overflow-hidden"
            >
              <div className="p-8 text-center">
                <div className="w-16 h-16 bg-rose-500/10 text-rose-500 rounded-full flex items-center justify-center mx-auto mb-6 border border-rose-500/20">
                  <LogOut className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-black text-white mb-2 uppercase tracking-widest">Sign Out?</h3>
                <p className="text-gray-400 font-medium mb-8 text-sm">
                  You will need to log back in to access your orders and wishlist.
                </p>
                <div className="flex gap-4">
                  <Button
                    variant="outline"
                    className="flex-1 rounded-xl h-12 font-bold text-gray-300 border-gray-700 hover:bg-white/5 cursor-pointer"
                    onClick={() => setIsLogoutModalOpen(false)}
                  >
                    Cancel
                  </Button>
                  <Button
                    variant="destructive"
                    className="flex-1 rounded-xl h-12 font-bold bg-rose-600 hover:bg-rose-700 cursor-pointer shadow-lg shadow-rose-600/20"
                    onClick={() => {
                      logout();
                      setIsLogoutModalOpen(false);
                    }}
                  >
                    Sign Out
                  </Button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </nav>
  );
};
