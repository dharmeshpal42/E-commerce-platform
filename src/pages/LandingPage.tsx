import { motion } from "framer-motion";
import {
  ArrowRight,
  ShoppingBag,
  Zap,
  Shield,
  Truck,
  Star,
} from "lucide-react";
import { Button } from "../components/ui/Button";
import { Link } from "react-router-dom";
import { products } from "../data/products";
import { ProductCard } from "../components/ui/ProductCard";

export const LandingPage = () => {
  const featuredProducts = products.slice(0, 4);

  const categories = [
    {
      name: "Electronics",
      count: "120+ Products",
      image:
        "https://images.unsplash.com/photo-1498049794561-7780e7231661?auto=format&fit=crop&q=80&w=400",
      color: "from-indigo-500/40 to-purple-600/40",
    },
    {
      name: "Fashion",
      count: "450+ Products",
      image:
        "https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&q=80&w=400",
      color: "from-pink-500/40 to-rose-600/40",
    },
    {
      name: "Home Decor",
      count: "80+ Products",
      image:
        "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&q=80&w=400",
      color: "from-amber-500/40 to-orange-600/40",
    },
    {
      name: "Photography",
      count: "40+ Products",
      image:
        "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&q=80&w=400",
      color: "from-cyan-500/40 to-blue-600/40",
    },
  ];

  return (
    <div className="flex flex-col gap-20 pb-20 bg-background transition-colors duration-300">
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/10 via-background to-purple-500/10 dark:from-indigo-500/20 dark:via-slate-950 dark:to-purple-500/20" />
        <div className="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10 dark:opacity-20 pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="inline-flex items-center gap-2 px-4 py-2 mb-8 glass rounded-full border-indigo-500/20 shadow-xl shadow-indigo-500/10"
              >
                <Zap className="w-4 h-4 text-indigo-500 animate-pulse" />
                <span className="text-xs font-black tracking-widest text-indigo-600 dark:text-indigo-400 uppercase">
                  Future of Shopping
                </span>
              </motion.div>
              <h1 className="text-6xl md:text-8xl font-black text-foreground leading-[0.9] tracking-tighter mb-8">
                FUTURE <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 via-purple-500 to-cyan-500 animate-gradient">
                  VOGUE.
                </span>
              </h1>
              <p className="text-xl text-muted-foreground mb-12 max-w-lg leading-relaxed font-medium">
                Step into a new dimension of e-commerce. Premium quality meets
                futuristic design in our curated collection.
              </p>
              <div className="flex flex-wrap gap-6">
                <Link to="/shop">
                  <Button
                    size="lg"
                    className="h-16 px-10 rounded-2xl bg-indigo-600 hover:bg-indigo-700 text-white text-lg font-black shadow-2xl shadow-indigo-600/40 hover:scale-105 transition-all border-none"
                  >
                    EXPLORE NOW
                    <ArrowRight className="ml-2 w-6 h-6" />
                  </Button>
                </Link>
                <Button
                  variant="outline"
                  size="lg"
                  className="h-16 px-10 rounded-2xl border-2 border-indigo-500/30 text-indigo-600 dark:text-indigo-400 hover:bg-indigo-500/10 text-lg font-black backdrop-blur-sm"
                  onClick={() =>
                    document
                      .getElementById("categories")
                      ?.scrollIntoView({ behavior: "smooth" })
                  }
                >
                  COLLECTIONS
                </Button>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1 }}
              className="relative hidden lg:block"
            >
              <div className="relative z-10 grid grid-cols-2 gap-8 animate-float">
                <div className="space-y-8">
                  <div className="aspect-[3/4] rounded-[3rem] overflow-hidden glass border-white/20 shadow-2xl rotate-[-6deg] group">
                    <img
                      src="https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&q=80&w=400"
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                      alt="Hero 1"
                    />
                  </div>
                  <div className="aspect-square rounded-[2.5rem] overflow-hidden glass border-white/20 shadow-2xl rotate-[12deg] translate-x-12 group">
                    <img
                      src="https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&q=80&w=400"
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                      alt="Hero 2"
                    />
                  </div>
                </div>
                <div className="space-y-8 pt-20">
                  <div className="aspect-square rounded-[2.5rem] overflow-hidden glass border-white/20 shadow-2xl rotate-[6deg] -translate-x-12 group">
                    <img
                      src="https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&q=80&w=400"
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                      alt="Hero 3"
                    />
                  </div>
                  <div className="aspect-[3/4] rounded-[3rem] overflow-hidden glass border-white/20 shadow-2xl rotate-[-8deg] group">
                    <img
                      src="https://images.unsplash.com/photo-1572635196237-14b3f281503f?auto=format&fit=crop&q=80&w=400"
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                      alt="Hero 4"
                    />
                  </div>
                </div>
              </div>

              <div className="absolute inset-0 bg-indigo-500/20 blur-[120px] rounded-full -z-10 animate-pulse" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Trust Badges */}
      <section className="max-w-7xl mx-auto px-4 w-full">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 py-16 glass rounded-[3rem] border-white/10 dark:border-white/5 shadow-xl">
          <div className="flex flex-col items-center text-center gap-4">
            <div className="w-16 h-16 rounded-2xl bg-indigo-500/10 flex items-center justify-center text-indigo-500 shadow-inner">
              <Truck className="w-8 h-8" />
            </div>
            <div>
              <h4 className="font-black text-foreground tracking-tight">
                FAST SHIP
              </h4>
              <p className="text-xs text-muted-foreground font-bold uppercase tracking-widest mt-1">
                Free over $150
              </p>
            </div>
          </div>
          <div className="flex flex-col items-center text-center gap-4">
            <div className="w-16 h-16 rounded-2xl bg-purple-500/10 flex items-center justify-center text-purple-500 shadow-inner">
              <Shield className="w-8 h-8" />
            </div>
            <div>
              <h4 className="font-black text-foreground tracking-tight">
                SECURE
              </h4>
              <p className="text-xs text-muted-foreground font-bold uppercase tracking-widest mt-1">
                100% Protected
              </p>
            </div>
          </div>
          <div className="flex flex-col items-center text-center gap-4">
            <div className="w-16 h-16 rounded-2xl bg-cyan-500/10 flex items-center justify-center text-cyan-500 shadow-inner">
              <Zap className="w-8 h-8" />
            </div>
            <div>
              <h4 className="font-black text-foreground tracking-tight">
                EXPRESS
              </h4>
              <p className="text-xs text-muted-foreground font-bold uppercase tracking-widest mt-1">
                24H Delivery
              </p>
            </div>
          </div>
          <div className="flex flex-col items-center text-center gap-4">
            <div className="w-16 h-16 rounded-2xl bg-amber-500/10 flex items-center justify-center text-amber-500 shadow-inner">
              <Star className="w-8 h-8" />
            </div>
            <div>
              <h4 className="font-black text-foreground tracking-tight">
                PREMIUM
              </h4>
              <p className="text-xs text-muted-foreground font-bold uppercase tracking-widest mt-1">
                Top rated
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="max-w-7xl mx-auto px-4 w-full">
        <div className="flex flex-col md:flex-row justify-between items-end gap-6 mb-16">
          <div className="max-w-xl">
            <span className="text-indigo-600 dark:text-indigo-400 font-black uppercase tracking-[0.3em] text-xs">
              Curated Selection
            </span>
            <h2 className="text-5xl font-black text-foreground mt-4 tracking-tighter leading-none">
              HOT PICKS.
            </h2>
            <p className="text-muted-foreground mt-6 font-medium">
              Discover our most trending pieces designed for the modern era.
            </p>
          </div>
          <Link to="/shop">
            <Button
              variant="link"
              className="text-indigo-600 dark:text-indigo-400 font-black text-lg group p-0 hover:no-underline"
            >
              VIEW ALL SHOP
              <div className="ml-4 w-12 h-12 rounded-full border-2 border-indigo-500/30 flex items-center justify-center transition-all group-hover:bg-indigo-600 group-hover:text-white group-hover:border-indigo-600 group-hover:translate-x-2">
                <ArrowRight className="w-6 h-6" />
              </div>
            </Button>
          </Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
          {featuredProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
            />
          ))}
        </div>
      </section>

      {/* Categories Grid */}
      <section
        id="categories"
        className="relative py-24 overflow-hidden"
      >
        <div className="absolute inset-0 bg-indigo-500/[0.02] dark:bg-indigo-500/[0.05]" />
        <div className="max-w-7xl mx-auto px-4 w-full relative z-10">
          <div className="text-center mb-20">
            <h2 className="text-5xl font-black text-foreground mb-6 tracking-tighter">
              THE DIRECTORY.
            </h2>
            <p className="text-muted-foreground max-w-lg mx-auto font-medium">
              Navigate through our meticulously organized collections.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
            {categories.map((cat, idx) => (
              <motion.div
                key={cat.name}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: idx * 0.1 }}
                viewport={{ once: true }}
                className="group relative h-[450px] rounded-[3rem] overflow-hidden cursor-pointer shadow-2xl transition-all hover:scale-[1.02]"
              >
                <Link
                  to={`/shop?category=${cat.name}`}
                  className="block w-full h-full"
                >
                  <img
                    src={cat.image}
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                    alt={cat.name}
                  />
                  <div
                    className={`absolute inset-0 bg-gradient-to-t ${cat.color} to-transparent group-hover:opacity-100 transition-opacity duration-500`}
                  />
                  <div className="absolute inset-0 bg-black/30 group-hover:bg-black/50 transition-colors duration-500" />
                  <div className="absolute bottom-10 left-10">
                    <span className="text-white/70 text-xs font-black uppercase tracking-widest">
                      {cat.count}
                    </span>
                    <h3 className="text-3xl font-black text-white mt-2 tracking-tight group-hover:translate-x-2 transition-transform">
                      {cat.name}
                    </h3>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="max-w-7xl mx-auto px-4 w-full">
        <div className="relative rounded-[4rem] overflow-hidden bg-gradient-to-br from-indigo-600 via-purple-600 to-indigo-700 py-24 px-8 text-center shadow-[0_20px_50px_rgba(79,70,229,0.3)]">
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-20" />
          <div className="relative z-10 max-w-2xl mx-auto">
            <div className="inline-flex items-center justify-center w-24 h-24 rounded-[2rem] glass border-white/30 mb-10 shadow-2xl animate-float">
              <ShoppingBag className="w-12 h-12 text-white" />
            </div>
            <h2 className="text-5xl md:text-6xl font-black text-white mb-8 tracking-tighter">
              BECOME AN INSIDER.
            </h2>
            <p className="text-indigo-100 text-xl mb-12 font-medium opacity-90">
              Unlock exclusive futuristic drops and 20% off your first mission.
            </p>
            <form className="flex flex-col sm:flex-row gap-6 max-w-lg mx-auto">
              <input
                type="email"
                placeholder="MISSION_EMAIL@PROTOCOL.COM"
                className="flex-grow h-16 rounded-2xl px-8 glass border-white/30 text-white placeholder:text-white/50 focus:outline-none focus:ring-4 focus:ring-white/20 font-black uppercase tracking-widest text-sm"
              />
              <Button
                size="lg"
                className="h-16 px-10 rounded-2xl bg-white text-indigo-600 hover:bg-indigo-50 font-black shadow-2xl transition-all hover:scale-105 active:scale-95 border-none"
              >
                SUBSCRIBE
              </Button>
            </form>
            <p className="text-indigo-200 text-xs mt-10 font-bold tracking-[0.2em] opacity-70 uppercase">
              Decrypted & Secure Protocol.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};
