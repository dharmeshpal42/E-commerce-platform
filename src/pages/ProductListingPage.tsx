import { products } from "../data/products";
import { ProductCard } from "../components/ui/ProductCard";
import { motion, AnimatePresence } from "framer-motion";
import { useSearchParams } from "react-router-dom";
import {
  Search,
  SlidersHorizontal,
  Grid2X2,
  List,
  ChevronDown,
} from "lucide-react";
import { useState, useMemo, useEffect } from "react";
import { Input } from "../components/ui/Input";
import { Button } from "../components/ui/Button";

export const ProductListingPage = () => {
  const [searchParams] = useSearchParams();
  const categoryParam = searchParams.get("category");

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(
    categoryParam || "All",
  );

  useEffect(() => {
    if (categoryParam) {
      setSelectedCategory(categoryParam);
    }
  }, [categoryParam]);

  const [sortBy, setSortBy] = useState("Featured");
  const [isSortMenuOpen, setIsSortMenuOpen] = useState(false);
  const [viewType, setViewType] = useState("grid");

  const categories = ["All", ...new Set(products.map((p) => p.category))];

  const filteredProducts = useMemo(() => {
    let result = products.filter((product) => {
      const matchesSearch =
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.description.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory =
        selectedCategory === "All" || product.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });

    if (sortBy === "Price: Low to High") {
      result.sort((a, b) => a.price - b.price);
    } else if (sortBy === "Price: High to Low") {
      result.sort((a, b) => b.price - a.price);
    } else if (sortBy === "Rating") {
      result.sort((a, b) => b.rating - a.rating);
    }

    return result;
  }, [searchQuery, selectedCategory, sortBy]);

  return (
    <div className="min-h-screen bg-background transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8">
          <div>
            <span className="text-indigo-600 dark:text-indigo-400 font-black uppercase tracking-[0.3em] text-xs">
              Futuristic Inventory
            </span>
            <h1 className="text-5xl font-black text-foreground tracking-tighter mt-4 uppercase">
              The Shop
            </h1>
            <p className="text-muted-foreground mt-4 font-bold uppercase tracking-widest text-sm">
              Discovering {filteredProducts.length} procurements
            </p>
          </div>

          <div className="flex items-center gap-6">
            <div className="flex glass dark:bg-slate-900/50 border-white/20 dark:border-white/5 rounded-2xl p-1.5 shadow-xl">
              <button
                onClick={() => setViewType("grid")}
                className={`p-3 rounded-xl transition-all cursor-pointer ${viewType === "grid" ? "bg-indigo-600 text-white shadow-lg" : "text-muted-foreground hover:text-foreground"}`}
              >
                <Grid2X2 size={22} />
              </button>
              <button
                onClick={() => setViewType("list")}
                className={`p-3 rounded-xl transition-all cursor-pointer ${viewType === "list" ? "bg-indigo-600 text-white shadow-lg" : "text-muted-foreground hover:text-foreground"}`}
              >
                <List size={22} />
              </button>
            </div>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar Filters */}
          <aside className="lg:w-72 shrink-0">
            <div className="sticky top-28 space-y-6">
              <div className="glass p-5 rounded-2xl border-white/20 dark:border-white/5 shadow-lg">
                <h3 className="text-xs font-black text-foreground uppercase tracking-[0.3em] mb-3 opacity-70">
                  SEARCH
                </h3>
                <div className="relative group">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground group-focus-within:text-indigo-500 transition-colors w-4 h-4" />
                  <Input
                    placeholder="Search products..."
                    className="pl-12 h-14 bg-white/50 dark:bg-slate-800/30 border-white/10 dark:border-white/5 rounded-2xl shadow-inner focus:ring-4 focus:ring-indigo-500/10 font-bold uppercase text-xs tracking-widest transition-all"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
              </div>

              <div className="glass p-5 rounded-2xl border-white/20 dark:border-white/5 shadow-lg">
                <h3 className="text-xs font-black text-foreground uppercase tracking-[0.3em] mb-3 opacity-70">
                  Categories
                </h3>
                <div className="space-y-3">
                  {categories.map((category) => (
                    <button
                      key={category}
                      onClick={() => setSelectedCategory(category)}
                      className={`w-full flex items-center justify-between px-5 py-4 rounded-2xl text-xs font-black uppercase tracking-widest transition-all cursor-pointer ${selectedCategory === category
                        ? "bg-indigo-600 text-white shadow-lg shadow-indigo-600/30 scale-[1.02]"
                        : "bg-white/50 dark:bg-slate-800/30 text-muted-foreground border border-white/10 dark:border-white/5 hover:border-indigo-500/50 hover:text-foreground"
                        }`}
                    >
                      {category}
                      {selectedCategory === category && (
                        <div className="w-2 h-2 bg-white rounded-full animate-pulse" />
                      )}
                    </button>
                  ))}
                </div>
              </div>

              <div className="glass p-5 rounded-2xl border-white/20 dark:border-white/5 shadow-lg">
                <h3 className="text-xs font-black text-foreground uppercase tracking-[0.3em] mb-3 opacity-70">
                  Price
                </h3>
                <div className="relative">
                  <div
                    onClick={() => setIsSortMenuOpen(!isSortMenuOpen)}
                    className="w-full h-14 pl-6 pr-12 bg-white/50 dark:bg-slate-800/30 border border-white/10 dark:border-white/5 rounded-2xl flex items-center shadow-inner cursor-pointer hover:border-indigo-500/50 transition-colors"
                  >
                    <span className="text-xs font-black text-foreground uppercase tracking-widest">{sortBy}</span>
                    <ChevronDown className={`absolute right-5 top-1/2 -translate-y-1/2 text-muted-foreground w-5 h-5 transition-transform duration-300 ${isSortMenuOpen ? 'rotate-180' : ''}`} />
                  </div>

                  <AnimatePresence>
                    {isSortMenuOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: 10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 10, scale: 0.95 }}
                        transition={{ duration: 0.2 }}
                        className="absolute bottom-[calc(100%+0.5rem)] left-0 w-full glass rounded-2xl shadow-xl border border-white/20 dark:border-white/5 overflow-hidden z-50 p-2 space-y-1 origin-bottom"
                      >
                        {["Featured", "Price: Low to High", "Price: High to Low", "Rating"].map((option) => (
                          <div
                            key={option}
                            onClick={() => {
                              setSortBy(option);
                              setIsSortMenuOpen(false);
                            }}
                            className={`px-4 py-3 rounded-xl text-xs font-black uppercase tracking-widest cursor-pointer transition-all flex items-center justify-between ${sortBy === option
                              ? "bg-indigo-600 text-white shadow-lg shadow-indigo-600/30 scale-[1.02]"
                              : "text-muted-foreground hover:bg-white/50 hover:dark:bg-slate-800/50 hover:text-foreground"
                              }`}
                          >
                            {option}
                            {sortBy === option && (
                              <div className="w-1.5 h-1.5 bg-white rounded-full animate-pulse" />
                            )}
                          </div>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            </div>
          </aside>

          {/* Product Grid */}
          <div className="grow">
            {filteredProducts.length > 0 ? (
              <motion.div
                layout
                className={`grid gap-5 ${viewType === "grid" ? "grid-cols-1 sm:grid-cols-2 xl:grid-cols-3" : "grid-cols-1"}`}
              >
                <AnimatePresence mode="popLayout">
                  {filteredProducts.map((product) => (
                    <ProductCard
                      key={product.id}
                      product={product}
                    />
                  ))}
                </AnimatePresence>
              </motion.div>
            ) : (
              <div className="glass rounded-[2rem] p-12 text-center border-dashed border-indigo-500/20 dark:border-indigo-500/10 shadow-2xl">
                <div className="w-20 h-20 bg-indigo-500/10 rounded-full flex items-center justify-center mx-auto mb-6 glass border-indigo-500/20 animate-float">
                  <Search className="w-12 h-12 text-indigo-500 opacity-50" />
                </div>
                <h2 className="text-2xl font-black text-foreground mb-2 tracking-tighter uppercase">
                  No Product Found.
                </h2>
                <p className="text-muted-foreground mb-6 max-w-sm mx-auto text-sm font-medium">
                  Your search query did not synchronize with any available
                  futuristic product.
                </p>
                <Button
                  onClick={() => {
                    setSearchQuery("");
                    setSelectedCategory("All");
                    setSortBy("Featured");
                  }}
                  variant="outline"
                  className="cursor-pointer h-10 px-6 rounded-xl border-2 border-indigo-500/30 text-indigo-600 dark:text-indigo-400 font-black text-sm hover:bg-indigo-500/10 transition-all active:scale-95"
                >
                  RESET
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
