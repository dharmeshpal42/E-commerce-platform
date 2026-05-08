import { useCartStore } from "../store/useCartStore";
import { useAuthStore } from "../store/useAuthStore";
import { motion, AnimatePresence } from "framer-motion";
import {
  Trash2,
  Plus,
  Minus,
  ArrowRight,
  ArrowLeft,
  ShoppingBag,
  Zap,
} from "lucide-react";
import { Button } from "../components/ui/Button";
import { Link, useNavigate } from "react-router-dom";

export const CartPage = () => {
  const { items, removeItem, updateQuantity, totalPrice, totalItems } =
    useCartStore();
  const { isAuthenticated } = useAuthStore();
  const navigate = useNavigate();

  const handleCheckout = () => {
    if (!isAuthenticated) {
      navigate("/login", { state: { from: "/checkout" } });
    } else {
      navigate("/checkout");
    }
  };

  if (items.length === 0) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center p-4 bg-background transition-colors duration-300">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center"
        >
          <div className="bg-indigo-500/10 w-24 h-24 rounded-4xl flex items-center justify-center mx-auto mb-8 glass border-indigo-500/20 shadow-2xl animate-float">
            <ShoppingBag className="w-12 h-12 text-indigo-500" />
          </div>
          <h2 className="text-4xl font-black text-foreground mb-4 tracking-tighter uppercase">
            Cart Empty.
          </h2>
          <p className="text-muted-foreground mb-10 max-w-sm mx-auto text-lg font-medium leading-relaxed">
            Your inventory is currently zero. Initiate a new procurement
            protocol.
          </p>
          <Link to="/shop">
            <Button
              size="lg"
              className="h-16 px-10 rounded-2xl bg-indigo-600 hover:bg-indigo-700 text-white text-lg font-black shadow-2xl shadow-indigo-600/40 border-none transition-all hover:scale-105 active:scale-95"
            >
              Start Shopping
              <ArrowRight className="ml-2 w-6 h-6" />
            </Button>
          </Link>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-3 text-muted-foreground hover:text-indigo-600 transition-all mb-4 group font-black uppercase tracking-widest text-xs"
        >
          <div className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center group-hover:bg-indigo-600 group-hover:text-white group-hover:border-indigo-600 transition-all group-hover:-translate-x-1">
            <ArrowLeft className="w-4 h-4" />
          </div>
          Back
        </button>

        <div className="mb-8">
          <span className="text-indigo-600 dark:text-indigo-400 font-black uppercase tracking-[0.3em] text-xs">
            Procurement Protocol
          </span>
          <h1 className="text-5xl font-black text-foreground tracking-tighter mt-4 uppercase">
            Shopping Inventory.
          </h1>
          <p className="text-muted-foreground mt-4 font-bold uppercase tracking-widest text-sm">
            {totalItems()} items in terminal
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          <div className="lg:col-span-8 space-y-6">
            <AnimatePresence mode="popLayout">
              {items.map((item) => (
                <motion.div
                  key={item.id}
                  layout
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  className="flex items-center gap-6 glass p-6 rounded-4xl border-white/10 dark:border-white/5 shadow-xl group transition-all hover:shadow-2xl hover:bg-white/90 dark:hover:bg-slate-900/90"
                >
                  <div className="w-28 h-28 shrink-0 rounded-2xl overflow-hidden border border-white/20 shadow-lg">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-cover transition-transform group-hover:scale-110 duration-700"
                    />
                  </div>

                  <div className="flex-grow min-w-0">
                    <span className="text-[10px] font-black uppercase tracking-widest text-indigo-500 mb-1 block">
                      {item.category}
                    </span>
                    <h3 className="text-xl font-black text-foreground truncate group-hover:text-indigo-600 transition-colors tracking-tight">
                      {item.name}
                    </h3>
                    <p className="text-2xl font-black text-foreground mt-2 tracking-tighter">
                      ${item.price.toFixed(2)}
                    </p>
                  </div>

                  <div className="flex flex-col sm:flex-row items-center gap-4">
                    <div className="flex items-center gap-4 glass dark:bg-slate-800/50 px-4 py-2 rounded-xl border-white/20">
                      <button
                        onClick={() =>
                          updateQuantity(item.id, item.quantity - 1)
                        }
                        className="p-1 text-gray-400 hover:text-indigo-500 transition-colors cursor-pointer"
                      >
                        <Minus className="w-5 h-5" />
                      </button>
                      <span className="w-8 text-center font-black text-foreground text-lg">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() =>
                          updateQuantity(item.id, item.quantity + 1)
                        }
                        className="p-1 text-gray-400 hover:text-indigo-500 transition-colors cursor-pointer"
                      >
                        <Plus className="w-5 h-5" />
                      </button>
                    </div>

                    <button
                      onClick={() => removeItem(item.id)}
                      className="p-3 text-gray-400 hover:text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-950/30 rounded-xl transition-all cursor-pointer"
                    >
                      <Trash2 className="w-6 h-6" />
                    </button>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          <div className="lg:col-span-4 sticky top-28">
            <div className="glass p-8 rounded-3xl border-white/20 dark:border-white/5 shadow-2xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/10 blur-[60px] rounded-full -z-10" />

              <h2 className="text-2xl font-black text-foreground mb-8 tracking-tighter uppercase">
                Order Terminal.
              </h2>

              <div className="space-y-4 mb-8">
                <div className="flex justify-between text-muted-foreground font-bold text-sm uppercase tracking-widest">
                  <span>Subtotal</span>
                  <span className="text-foreground">
                    ${totalPrice().toFixed(2)}
                  </span>
                </div>
                <div className="flex justify-between text-muted-foreground font-bold text-sm uppercase tracking-widest">
                  <span>Shipping</span>
                  <span className="text-green-500">$0.00</span>
                </div>
                <div className="flex justify-between text-muted-foreground font-bold text-sm uppercase tracking-widest">
                  <span>Tax</span>
                  <span className="text-foreground">
                    ${(totalPrice() * 0.1).toFixed(2)}
                  </span>
                </div>
                <div className="pt-6 border-t border-white/20 dark:border-white/10 flex justify-between items-end">
                  <span className="text-lg font-black text-foreground tracking-tighter uppercase">
                    Total Terminal
                  </span>
                  <span className="text-4xl font-black text-indigo-600 dark:text-indigo-400 tracking-tighter">
                    ${(totalPrice() * 1.1).toFixed(2)}
                  </span>
                </div>
              </div>

              <Button
                onClick={handleCheckout}
                className="cursor-pointer w-full h-16 rounded-2xl bg-indigo-600 hover:bg-indigo-700 text-white text-lg font-black shadow-2xl shadow-indigo-600/40 border-none transition-all hover:scale-105 active:scale-95 group"
              >
                INITIATE CHECKOUT
                <ArrowRight className="w-6 h-6 ml-2 transition-transform group-hover:translate-x-2" />
              </Button>

              <Link
                to="/shop"
                className="block text-center mt-6 text-sm font-black text-muted-foreground hover:text-indigo-600 transition-colors uppercase tracking-[0.2em]"
              >
                Explore More Drops
              </Link>
            </div>

            <div className="mt-6 glass p-6 rounded-4xl border-dashed border-indigo-500/30 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Zap className="w-6 h-6 text-indigo-500" />
                <span className="text-xs font-black uppercase tracking-widest text-foreground">
                  Promo Code
                </span>
              </div>
              <button className="text-indigo-600 dark:text-indigo-400 text-xs font-black uppercase tracking-widest hover:underline">
                Apply
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
