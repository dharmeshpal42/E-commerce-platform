import { motion } from "framer-motion";
import { CheckCircle, ShoppingBag, Home, ArrowRight } from "lucide-react";
import { Button } from "../components/ui/Button";
import { Link } from "react-router-dom";

export const OrderSuccessPage = () => {
  const orderId = `ORD-${Math.random().toString(36).substring(2, 9).toUpperCase()}`;

  return (
    <div className="min-h-screen bg-[#0a091a] flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="max-w-lg w-full"
      >
        <div className="bg-gray-900/95 backdrop-blur-xl p-12 rounded-3xl border border-gray-700/50 shadow-2xl text-center relative overflow-hidden">
          <div className="absolute top-0 right-0 w-40 h-40 bg-green-500/10 blur-[80px] rounded-full -z-10" />
          <div className="absolute bottom-0 left-0 w-40 h-40 bg-indigo-500/10 blur-[80px] rounded-full -z-10" />

          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
            className="w-24 h-24 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-8 shadow-2xl shadow-green-500/40"
          >
            <CheckCircle className="w-12 h-12 text-white" />
          </motion.div>

          <h1 className="text-4xl font-black text-white mb-4 tracking-tighter uppercase">
            Order Confirmed!
          </h1>

          <p className="text-gray-400 mb-8 text-lg font-medium">
            Thank you for your purchase. Your order has been successfully
            placed.
          </p>

          <div className="bg-white/10 rounded-2xl p-6 mb-8">
            <p className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-2">
              Order Number
            </p>
            <p className="text-2xl font-black text-white tracking-tight">
              {orderId}
            </p>
          </div>

          <div className="space-y-3 mb-8 text-left">
            <div className="flex items-center gap-3 text-gray-400">
              <div className="bg-indigo-600/20 p-2 rounded-lg">
                <ShoppingBag className="w-5 h-5 text-indigo-400" />
              </div>
              <span className="font-medium">
                Order confirmation sent to your email
              </span>
            </div>
            <div className="flex items-center gap-3 text-gray-400">
              <div className="bg-green-600/20 p-2 rounded-lg">
                <CheckCircle className="w-5 h-5 text-green-400" />
              </div>
              <span className="font-medium">
                Estimated delivery: 5-7 business days
              </span>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4">
            <Link
              to="/shop"
              className="flex-1"
            >
              <Button className="w-full h-14 rounded-2xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold shadow-lg shadow-indigo-600/30 border-none transition-all hover:scale-105 active:scale-95">
                Continue Shopping
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </Link>
            <Link
              to="/"
              className="flex-1"
            >
              <Button
                variant="outline"
                className="w-full h-14 rounded-2xl border-2 border-gray-700 hover:border-indigo-500 hover:bg-gray-800 text-gray-300 hover:text-white font-bold transition-all"
              >
                <Home className="w-5 h-5 mr-2" />
                Back to Home
              </Button>
            </Link>
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-8 text-center"
        >
          <p className="text-gray-500 text-sm">
            Need help? Contact our support team at{" "}
            <a
              href="mailto:support@vogue.com"
              className="text-indigo-600 font-bold hover:underline"
            >
              support@vogue.com
            </a>
          </p>
        </motion.div>
      </motion.div>
    </div>
  );
};
