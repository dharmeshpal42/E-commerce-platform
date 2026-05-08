import { motion } from "framer-motion";
import { Package, Clock, CheckCircle, Truck, XCircle, ArrowRight } from "lucide-react";
import { Order } from "../types";
import { useAuthStore } from "../store/useAuthStore";
import { useOrderStore } from "../store/useOrderStore";
import { Link, Navigate } from "react-router-dom";
import { Button } from "../components/ui/Button";

export const OrdersPage = () => {
  const { orders } = useOrderStore();
  const getStatusIcon = (status: Order["status"]) => {
    switch (status) {
      case "Processing":
        return <Clock className="w-5 h-5 text-yellow-500" />;
      case "Shipped":
        return <Truck className="w-5 h-5 text-blue-500" />;
      case "Delivered":
        return <CheckCircle className="w-5 h-5 text-green-500" />;
      case "Cancelled":
        return <XCircle className="w-5 h-5 text-red-500" />;
      default:
        return <Package className="w-5 h-5 text-gray-500" />;
    }
  };

  const getStatusBadge = (status: Order["status"]) => {
    const baseClasses =
      "px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider flex items-center gap-2";
    switch (status) {
      case "Processing":
        return (
          <div className={`${baseClasses} bg-yellow-500/20 text-yellow-400 border border-yellow-500/30`}>
            {getStatusIcon(status)}
            Processing
          </div>
        );
      case "Shipped":
        return (
          <div className={`${baseClasses} bg-blue-500/20 text-blue-400 border border-blue-500/30`}>
            {getStatusIcon(status)}
            Shipped
          </div>
        );
      case "Delivered":
        return (
          <div className={`${baseClasses} bg-green-500/20 text-green-400 border border-green-500/30`}>
            {getStatusIcon(status)}
            Delivered
          </div>
        );
      case "Cancelled":
        return (
          <div className={`${baseClasses} bg-red-500/20 text-red-400 border border-red-500/30`}>
            {getStatusIcon(status)}
            Cancelled
          </div>
        );
    }
  };

  return (
    <div className="min-h-[calc(100vh-5rem)] bg-[#0a091a] py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-10">
          <span className="text-indigo-600 font-black uppercase tracking-[0.3em] text-xs">
            My Account
          </span>
          <h1 className="text-4xl font-black text-white tracking-tighter mt-2 uppercase flex items-center gap-4">
            <Package className="w-10 h-10 text-indigo-500" />
            Order History
          </h1>
        </div>

        {orders.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col items-center justify-center p-12 bg-gray-900/50 backdrop-blur-xl rounded-3xl border border-gray-800"
          >
            <Package className="w-20 h-20 text-gray-700 mb-6" />
            <h2 className="text-2xl font-black text-white mb-2 tracking-tighter uppercase">
              No orders yet
            </h2>
            <p className="text-gray-400 mb-8 font-medium">
              You haven't placed any orders yet. Let's fix that!
            </p>
            <Link to="/shop">
              <Button className="h-14 px-8 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold transition-all hover:scale-105 active:scale-95 shadow-lg shadow-indigo-500/25">
                Start Shopping
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </Link>
          </motion.div>
        ) : (
          <div className="space-y-6">
            {orders.map((order, index) => (
              <motion.div
                key={order.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-gray-900/80 backdrop-blur-xl rounded-3xl border border-gray-700/50 overflow-hidden shadow-xl"
              >
                {/* Order Header */}
                <div className="p-6 sm:p-8 border-b border-gray-800 bg-gray-900/50 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="flex flex-wrap items-center gap-6 text-sm">
                    <div>
                      <p className="text-gray-500 font-bold uppercase tracking-wider text-[10px] mb-1">
                        Order Placed
                      </p>
                      <p className="text-white font-bold">{order.date}</p>
                    </div>
                    <div>
                      <p className="text-gray-500 font-bold uppercase tracking-wider text-[10px] mb-1">
                        Total Amount
                      </p>
                      <p className="text-white font-bold">
                        ${order.total.toFixed(2)}
                      </p>
                    </div>
                    <div>
                      <p className="text-gray-500 font-bold uppercase tracking-wider text-[10px] mb-1">
                        Order ID
                      </p>
                      <p className="text-white font-bold font-mono">
                        {order.id}
                      </p>
                    </div>
                  </div>
                  <div>{getStatusBadge(order.status)}</div>
                </div>

                {/* Order Items */}
                <div className="p-6 sm:p-8 space-y-6">
                  {order.items.map((item) => (
                    <div
                      key={item.id}
                      className="flex items-center gap-6"
                    >
                      <div className="relative group overflow-hidden rounded-2xl w-24 h-24 bg-gray-800 flex-shrink-0">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                        />
                      </div>
                      <div className="flex-grow">
                        <h3 className="text-lg font-bold text-white mb-1">
                          {item.name}
                        </h3>
                        <p className="text-indigo-400 font-black">
                          ${item.price.toFixed(2)}
                        </p>
                        <p className="text-gray-500 text-sm font-medium mt-1">
                          Qty: {item.quantity}
                        </p>
                      </div>
                      <div className="hidden sm:block">
                        <Link to={`/product/${item.id}`}>
                          <Button
                            variant="outline"
                            className="text-xs h-10 px-4 rounded-xl border-gray-700 text-gray-300 hover:bg-white/10 hover:text-white"
                          >
                            Buy Again
                          </Button>
                        </Link>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
