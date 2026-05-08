import { useAuthStore } from "../store/useAuthStore";
import { useCartStore } from "../store/useCartStore";
import { products } from "../data/products";
import { motion, AnimatePresence } from "framer-motion";
import {
  Heart,
  ShoppingCart,
  Trash2,
  ArrowRight,
  ShoppingBag,
} from "lucide-react";
import { Button } from "../components/ui/Button";
import { Link } from "react-router-dom";
import { ProductCard } from "../components/ui/ProductCard";

export const WishlistPage = () => {
  const { wishlist, toggleWishlist } = useAuthStore();
  const addItem = useCartStore((state) => state.addItem);

  const wishlistProducts = products.filter((p) => wishlist.includes(p.id));

  if (wishlistProducts.length === 0) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center p-4 bg-background transition-colors duration-300">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center"
        >
          <div className="bg-rose-500/10 w-24 h-24 rounded-[2rem] flex items-center justify-center mx-auto mb-8 glass border-rose-500/20">
            <Heart className="w-12 h-12 text-rose-500 fill-rose-500/20" />
          </div>
          <h2 className="text-4xl font-black text-foreground mb-4 tracking-tighter">
            WISHLIST EMPTY.
          </h2>
          <p className="text-muted-foreground mb-10 max-w-sm mx-auto text-lg font-medium leading-relaxed">
            Your personal collection is waiting for its first futuristic
            protocol mission.
          </p>
          <Link to="/shop">
            <Button
              size="lg"
              className="h-16 px-10 rounded-2xl bg-indigo-600 hover:bg-indigo-700 text-white text-lg font-black shadow-2xl shadow-indigo-600/40 border-none transition-all hover:scale-105 active:scale-95"
            >
              EXPLORE SHOP
              <ArrowRight className="ml-2 w-6 h-6" />
            </Button>
          </Link>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          <div>
            <span className="text-indigo-600 dark:text-indigo-400 font-black uppercase tracking-[0.3em] text-xs">
              Private Collection
            </span>
            <h1 className="text-5xl font-black text-foreground tracking-tighter mt-4">
              WISHLIST.
            </h1>
            <p className="text-muted-foreground mt-4 font-bold uppercase tracking-widest text-sm">
              {wishlistProducts.length} protocols saved
            </p>
          </div>
          <Link to="/shop">
            <Button
              variant="outline"
              className="h-14 px-8 rounded-2xl border-2 border-indigo-500/30 text-indigo-600 dark:text-indigo-400 font-black hover:bg-indigo-500/10 transition-all backdrop-blur-sm"
            >
              CONTINUE MISSION
            </Button>
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-10">
          <AnimatePresence mode="popLayout">
            {wishlistProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
              />
            ))}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};
