import { useParams, useNavigate } from "react-router-dom";
import { products } from "../data/products";
import { useCartStore } from "../store/useCartStore";
import { Button } from "../components/ui/Button";
import { motion } from "framer-motion";
import {
  Star,
  ShoppingCart,
  ArrowLeft,
  ShieldCheck,
  Truck,
  RotateCcw,
  Heart,
  ShoppingBag,
} from "lucide-react";
import { useAuthStore } from "../store/useAuthStore";
import { toast } from "sonner";

export const ProductDetailsPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const addItem = useCartStore((state) => state.addItem);
  const { toggleWishlist, isInWishlist } = useAuthStore();

  const product = products.find((p) => p.id === id);
  const isWishlisted = isInWishlist(product?.id || "");

  if (!product) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center bg-background">
        <h2 className="text-3xl font-black text-foreground tracking-tighter uppercase">
          Protocol_Not_Found.
        </h2>
        <Button
          onClick={() => navigate("/")}
          className="mt-8 h-14 px-8 rounded-2xl bg-indigo-600 hover:bg-indigo-700 text-white font-black"
        >
          RETURN TO HUB
        </Button>
      </div>
    );
  }

  const handleAddToCart = () => {
    addItem(product);
    toast.success(`${product.name} synchronized with inventory.`);
  };

  return (
    <div className="min-h-screen bg-background transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <button
          onClick={() => navigate(-1)}
          className="cursor-pointer flex items-center gap-3 text-muted-foreground hover:text-indigo-600 transition-all mb-4 group font-black uppercase tracking-widest text-xs"
        >
          <div className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center group-hover:bg-indigo-600 group-hover:text-white transition-all group-hover:-translate-x-1">
            <ArrowLeft className="w-4 h-4" />
          </div>
          Back
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* Product Image */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            className="relative"
          >
            <div className="rounded-[4rem] overflow-hidden glass border-white/20 dark:border-white/5 shadow-2xl group">
              <img
                src={product.image}
                alt={product.name}
                className="w-full aspect-square object-cover transition-transform duration-1000 group-hover:scale-110"
              />
            </div>
            <button
              onClick={() => {
                toggleWishlist(product.id);
                toast.success(
                  isWishlisted ? "Removed from wishlist" : "Added to wishlist",
                );
              }}
              className={`absolute top-8 right-8 w-16 h-16 rounded-[2rem] glass flex items-center justify-center transition-all cursor-pointer ${isWishlisted
                ? "bg-rose-500 text-white border-rose-500/20"
                : "text-gray-400 hover:text-rose-500 border-white/20"
                }`}
            >
              <Heart
                className={`w-8 h-8 ${isWishlisted ? "fill-current" : ""}`}
              />
            </button>
          </motion.div>

          {/* Product Info */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex flex-col"
          >
            <div className="mb-10">
              <span className="inline-block px-4 py-1.5 rounded-full bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 text-xs font-black uppercase tracking-[0.2em] mb-6 glass border-indigo-500/20">
                {product.category}
              </span>
              <h1 className="text-5xl md:text-6xl font-black text-foreground tracking-tighter leading-none mb-6">
                {product.name.toUpperCase()}.
              </h1>
              <div className="flex items-center gap-6">
                <div className="flex items-center gap-2 glass px-4 py-2 rounded-2xl border-white/20 shadow-lg">
                  <Star className="w-5 h-5 text-amber-500 fill-amber-500" />
                  <span className="text-lg font-black text-foreground">
                    {product.rating}
                  </span>
                </div>
                <div className="h-8 w-px bg-white/20" />
                <span className="text-sm font-black text-indigo-500 uppercase tracking-widest">
                  Available
                </span>
              </div>
            </div>

            <div className="text-5xl font-black text-foreground tracking-tighter mb-10">
              ${product.price.toFixed(2)}
            </div>

            <p className="text-xl text-muted-foreground mb-12 font-medium leading-relaxed">
              {product.description}
            </p>

            <div className="flex flex-col sm:flex-row gap-6 mb-16">
              <Button
                size="lg"
                className="cursor-pointer grow h-18 rounded-[2rem] bg-indigo-600 hover:bg-indigo-700 text-white text-xl font-black shadow-2xl shadow-indigo-600/40 border-none transition-all hover:scale-105 active:scale-95 group"
                onClick={handleAddToCart}
              >
                <ShoppingBag className="w-6 h-6 mr-3 transition-transform group-hover:-rotate-12" />
                Add to cart
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="cursor-pointer h-18 px-10 rounded-[2rem] border-2 border-white/20 dark:border-white/10 text-foreground font-black text-lg glass hover:bg-white/10"
                onClick={() => {
                  addItem(product);
                  navigate("/checkout");
                }}
              >
                QUICK ORDER
              </Button>
            </div>

            {/* Features */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-12 border-t border-white/20 dark:border-white/10">
              <div className="flex flex-col items-center text-center group">
                <div className="w-16 h-16 glass rounded-2xl flex items-center justify-center mb-4 border-white/20 group-hover:scale-110 group-hover:bg-indigo-600 group-hover:text-white transition-all">
                  <Truck className="w-8 h-8" />
                </div>
                <span className="text-xs font-black uppercase tracking-widest text-foreground">
                  Fast Delivery
                </span>
              </div>
              <div className="flex flex-col items-center text-center group">
                <div className="w-16 h-16 glass rounded-2xl flex items-center justify-center mb-4 border-white/20 group-hover:scale-110 group-hover:bg-purple-600 group-hover:text-white transition-all">
                  <RotateCcw className="w-8 h-8" />
                </div>
                <span className="text-xs font-black uppercase tracking-widest text-foreground">
                  Easy Returns
                </span>
              </div>
              <div className="flex flex-col items-center text-center group">
                <div className="w-16 h-16 glass rounded-2xl flex items-center justify-center mb-4 border-white/20 group-hover:scale-110 group-hover:bg-cyan-600 group-hover:text-white transition-all">
                  <ShieldCheck className="w-8 h-8" />
                </div>
                <span className="text-xs font-black uppercase tracking-widest text-foreground">
                  Secure Checkout
                </span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};
