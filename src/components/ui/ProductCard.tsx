import { motion } from "framer-motion";
import { ShoppingBag, Star, Heart } from "lucide-react";
import { Product } from "../../types";
import { Button } from "./Button";
import { useCartStore } from "../../store/useCartStore";
import { useAuthStore } from "../../store/useAuthStore";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

interface ProductCardProps {
  product: Product;
}

export const ProductCard = ({ product }: ProductCardProps) => {
  const addItem = useCartStore((state) => state.addItem);
  const { toggleWishlist, isInWishlist } = useAuthStore();
  const navigate = useNavigate();
  const isWishlisted = isInWishlist(product.id);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    addItem(product);
    toast.success(`${product.name} added to cart!`);
  };

  const handleToggleWishlist = (e: React.MouseEvent) => {
    e.stopPropagation();
    toggleWishlist(product.id);
    if (!isWishlisted) {
      toast.success(`${product.name} added to wishlist!`);
    } else {
      toast.info(`${product.name} removed from wishlist`);
    }
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.9 }}
      whileHover={{ y: -8 }}
      onClick={() => navigate(`/product/${product.id}`)}
      className="group bg-white dark:bg-slate-900 rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 dark:border-slate-800 overflow-hidden flex flex-col cursor-pointer"
    >
      <div className="relative aspect-video overflow-hidden m-2 rounded-lg">
        <img
          src={product.image}
          alt={product.name}
          className="object-cover w-full h-full transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute top-3 right-3 flex flex-col gap-2">
          <button
            onClick={handleToggleWishlist}
            className={`w-8 h-8 rounded-lg flex items-center justify-center backdrop-blur-md transition-all cursor-pointer ${
              isWishlisted
                ? "bg-rose-500 text-white"
                : "bg-white/80 dark:bg-slate-900/80 text-gray-400 hover:text-rose-500"
            }`}
          >
            <Heart
              className={`w-4 h-4 ${isWishlisted ? "fill-current" : ""}`}
            />
          </button>
        </div>

        <div className="absolute bottom-3 left-3 bg-white/90 dark:bg-slate-900/90 backdrop-blur-md px-2.5 py-1 rounded-lg text-[10px] font-black text-gray-900 dark:text-white flex items-center gap-1 shadow-lg">
          <Star className="w-3 h-3 text-amber-500 fill-amber-500" />
          {product.rating}
        </div>
      </div>

      <div className="px-4 pb-4 pt-1 flex flex-col flex-grow">
        <div className="mb-1.5">
          <span className="text-[9px] font-black uppercase tracking-widest text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/30 px-2 py-0.5 rounded-full">
            {product.category}
          </span>
        </div>
        <h3 className="text-sm font-bold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors line-clamp-1 mb-1">
          {product.name}
        </h3>
        <p className="text-xs text-gray-500 dark:text-slate-400 line-clamp-2 grow leading-relaxed">
          {product.description}
        </p>

        <div className="mt-3 flex items-center justify-between">
          <span className="text-lg font-black text-gray-900 dark:text-white">
            ${product.price.toFixed(2)}
          </span>
          <Button
            size="icon"
            onClick={handleAddToCart}
            className="w-9 h-9 rounded-xl bg-blue-600 hover:bg-blue-700 text-white shadow-md shadow-blue-600/20 active:scale-90 transition-transform"
          >
            <ShoppingBag className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </motion.div>
  );
};
