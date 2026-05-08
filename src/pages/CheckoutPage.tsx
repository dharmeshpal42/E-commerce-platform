import { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useNavigate, useLocation } from "react-router-dom";
import { useCartStore } from "../store/useCartStore";
import { useAuthStore } from "../store/useAuthStore";
import { useOrderStore } from "../store/useOrderStore";
import { motion } from "framer-motion";
import {
  ArrowRight,
  ArrowLeft,
  Lock,
  CreditCard,
  Truck,
  MapPin,
  Check,
  ShoppingBag,
} from "lucide-react";
import { Button } from "../components/ui/Button";
import { toast } from "sonner";
import { Link } from "react-router-dom";

const validationSchema = Yup.object({
  firstName: Yup.string().required("First name is required"),
  lastName: Yup.string().required("Last name is required"),
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
  phone: Yup.string()
    .matches(/^[0-9+\s()-]+$/, "Invalid phone number")
    .required("Phone number is required"),
  address: Yup.string().required("Address is required"),
  city: Yup.string().required("City is required"),
  state: Yup.string().required("State is required"),
  zipCode: Yup.string().required("ZIP code is required"),
  country: Yup.string().required("Country is required"),
  cardNumber: Yup.string()
    .matches(/^[0-9\s]{16,19}$/, "Invalid card number")
    .required("Card number is required"),
  cardName: Yup.string().required("Name on card is required"),
  expiryDate: Yup.string()
    .matches(/^(0[1-9]|1[0-2])\/([0-9]{2})$/, "Use MM/YY format")
    .required("Required"),
  cvv: Yup.string()
    .matches(/^[0-9]{3,4}$/, "Invalid CVV")
    .required("Required"),
});

export const CheckoutPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, isAuthenticated } = useAuthStore();
  const { items, totalPrice, clearCart } = useCartStore();
  const { addOrder } = useOrderStore();

  const formik = useFormik({
    initialValues: {
      firstName: user?.name?.split(" ")[0] || "",
      lastName: user?.name?.split(" ")[1] || "",
      email: user?.email || "",
      phone: "",
      address: "",
      city: "",
      state: "",
      zipCode: "",
      country: "India",
      cardNumber: "",
      cardName: "",
      expiryDate: "",
      cvv: "",
    },
    validationSchema,
    onSubmit: async (values) => {
      setIsProcessing(true);
      // Simulate payment processing
      await new Promise((resolve) => setTimeout(resolve, 2000));
      
      const newOrder = {
        id: `ORD-${Math.floor(1000 + Math.random() * 9000)}-${Math.random().toString(36).substring(2, 4).toUpperCase()}`,
        date: new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }),
        total: totalPrice(),
        status: "Processing" as const,
        items: items.map(item => ({
          id: item.id,
          name: item.name,
          price: item.price,
          quantity: item.quantity,
          image: item.image
        }))
      };
      
      addOrder(newOrder);
      clearCart();
      
      toast.success("Order placed successfully!", {
        description: "Thank you for your purchase.",
      });
      navigate("/order-success");
    },
  });

  const [isProcessing, setIsProcessing] = useState(false);

  if (items.length === 0) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center p-4 bg-[#0a091a]">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center"
        >
          <div className="bg-indigo-600/20 w-24 h-24 rounded-4xl flex items-center justify-center mx-auto mb-8 border border-indigo-500/30 shadow-2xl">
            <ShoppingBag className="w-12 h-12 text-indigo-400" />
          </div>
          <h2 className="text-4xl font-black text-white mb-4 tracking-tighter uppercase">
            Cart Empty.
          </h2>
          <p className="text-gray-400 mb-10 max-w-sm mx-auto text-lg font-medium">
            Add items to your cart before checkout.
          </p>
          <Link to="/shop">
            <Button className="h-16 px-10 rounded-2xl bg-indigo-600 hover:bg-indigo-700 text-white text-lg font-black shadow-2xl shadow-indigo-600/40 border-none transition-all hover:scale-105 active:scale-95">
              START SHOPPING
              <ArrowRight className="ml-2 w-6 h-6" />
            </Button>
          </Link>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0a091a]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-3 text-gray-500 hover:text-indigo-600 transition-all mb-4 group font-black uppercase tracking-widest text-xs cursor-pointer"
        >
          <div className="w-10 h-10 rounded-full border border-gray-600 flex items-center justify-center group-hover:bg-indigo-600 group-hover:text-white group-hover:border-indigo-600 transition-all group-hover:-translate-x-1">
            <ArrowLeft className="w-4 h-4" />
          </div>
          Back
        </button>

        <div className="mb-8">
          <span className="text-indigo-600 font-black uppercase tracking-[0.3em] text-xs">
            Secure Checkout
          </span>
          <h1 className="text-4xl font-black text-white tracking-tighter mt-2 uppercase">
            Complete Your Order.
          </h1>
        </div>

        <form
          onSubmit={formik.handleSubmit}
          className="grid grid-cols-1 lg:grid-cols-3 gap-12"
        >
          {/* Checkout Form */}
          <div className="lg:col-span-2 space-y-8">
            {/* Shipping Information */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-gray-900/95 backdrop-blur-xl p-8 rounded-3xl border border-gray-700/50 shadow-xl"
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="bg-indigo-600/20 p-3 rounded-xl">
                  <MapPin className="w-6 h-6 text-indigo-400" />
                </div>
                <h2 className="text-2xl font-black text-white tracking-tighter uppercase">
                  Shipping Information
                </h2>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-bold text-gray-400 mb-2 uppercase tracking-wider">
                    First Name
                  </label>
                  <input
                    type="text"
                    {...formik.getFieldProps("firstName")}
                    className={`w-full px-4 py-3 rounded-xl bg-gray-800/50 border ${
                      formik.touched.firstName && formik.errors.firstName
                        ? "border-rose-500/50"
                        : "border-gray-700/50"
                    } text-white focus:border-indigo-500/50 focus:ring-2 focus:ring-indigo-500/20 outline-none transition-all font-medium placeholder:text-gray-500`}
                  />
                  {formik.touched.firstName && formik.errors.firstName && (
                    <div className="text-rose-500 text-xs font-bold mt-1 uppercase tracking-widest">
                      {formik.errors.firstName}
                    </div>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-400 mb-2 uppercase tracking-wider">
                    Last Name
                  </label>
                  <input
                    type="text"
                    {...formik.getFieldProps("lastName")}
                    className={`w-full px-4 py-3 rounded-xl bg-gray-800/50 border ${
                      formik.touched.lastName && formik.errors.lastName
                        ? "border-rose-500/50"
                        : "border-gray-700/50"
                    } text-white focus:border-indigo-500/50 focus:ring-2 focus:ring-indigo-500/20 outline-none transition-all font-medium placeholder:text-gray-500`}
                  />
                  {formik.touched.lastName && formik.errors.lastName && (
                    <div className="text-rose-500 text-xs font-bold mt-1 uppercase tracking-widest">
                      {formik.errors.lastName}
                    </div>
                  )}
                </div>
                <div className="sm:col-span-2">
                  <label className="block text-sm font-bold text-gray-400 mb-2 uppercase tracking-wider">
                    Email
                  </label>
                  <input
                    type="email"
                    {...formik.getFieldProps("email")}
                    className={`w-full px-4 py-3 rounded-xl bg-gray-800/50 border ${
                      formik.touched.email && formik.errors.email
                        ? "border-rose-500/50"
                        : "border-gray-700/50"
                    } text-white focus:border-indigo-500/50 focus:ring-2 focus:ring-indigo-500/20 outline-none transition-all font-medium placeholder:text-gray-500`}
                  />
                  {formik.touched.email && formik.errors.email && (
                    <div className="text-rose-500 text-xs font-bold mt-1 uppercase tracking-widest">
                      {formik.errors.email}
                    </div>
                  )}
                </div>
                <div className="sm:col-span-2">
                  <label className="block text-sm font-bold text-gray-400 mb-2 uppercase tracking-wider">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    placeholder="+91 00000 00000"
                    {...formik.getFieldProps("phone")}
                    className={`w-full px-4 py-3 rounded-xl bg-gray-800/50 border ${
                      formik.touched.phone && formik.errors.phone
                        ? "border-rose-500/50"
                        : "border-gray-700/50"
                    } text-white focus:border-indigo-500/50 focus:ring-2 focus:ring-indigo-500/20 outline-none transition-all font-medium placeholder:text-gray-500`}
                  />
                  {formik.touched.phone && formik.errors.phone && (
                    <div className="text-rose-500 text-xs font-bold mt-1 uppercase tracking-widest">
                      {formik.errors.phone}
                    </div>
                  )}
                </div>
                <div className="sm:col-span-2">
                  <label className="block text-sm font-bold text-gray-400 mb-2 uppercase tracking-wider">
                    Street Address
                  </label>
                  <input
                    type="text"
                    placeholder="123 Main Street"
                    {...formik.getFieldProps("address")}
                    className={`w-full px-4 py-3 rounded-xl bg-gray-800/50 border ${
                      formik.touched.address && formik.errors.address
                        ? "border-rose-500/50"
                        : "border-gray-700/50"
                    } text-white focus:border-indigo-500/50 focus:ring-2 focus:ring-indigo-500/20 outline-none transition-all font-medium placeholder:text-gray-500`}
                  />
                  {formik.touched.address && formik.errors.address && (
                    <div className="text-rose-500 text-xs font-bold mt-1 uppercase tracking-widest">
                      {formik.errors.address}
                    </div>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-400 mb-2 uppercase tracking-wider">
                    City
                  </label>
                  <input
                    type="text"
                    {...formik.getFieldProps("city")}
                    className={`w-full px-4 py-3 rounded-xl bg-gray-800/50 border ${
                      formik.touched.city && formik.errors.city
                        ? "border-rose-500/50"
                        : "border-gray-700/50"
                    } text-white focus:border-indigo-500/50 focus:ring-2 focus:ring-indigo-500/20 outline-none transition-all font-medium placeholder:text-gray-500`}
                  />
                  {formik.touched.city && formik.errors.city && (
                    <div className="text-rose-500 text-xs font-bold mt-1 uppercase tracking-widest">
                      {formik.errors.city}
                    </div>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-400 mb-2 uppercase tracking-wider">
                    State
                  </label>
                  <input
                    type="text"
                    {...formik.getFieldProps("state")}
                    className={`w-full px-4 py-3 rounded-xl bg-gray-800/50 border ${
                      formik.touched.state && formik.errors.state
                        ? "border-rose-500/50"
                        : "border-gray-700/50"
                    } text-white focus:border-indigo-500/50 focus:ring-2 focus:ring-indigo-500/20 outline-none transition-all font-medium placeholder:text-gray-500`}
                  />
                  {formik.touched.state && formik.errors.state && (
                    <div className="text-rose-500 text-xs font-bold mt-1 uppercase tracking-widest">
                      {formik.errors.state}
                    </div>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-400 mb-2 uppercase tracking-wider">
                    ZIP Code
                  </label>
                  <input
                    type="text"
                    {...formik.getFieldProps("zipCode")}
                    className={`w-full px-4 py-3 rounded-xl bg-gray-800/50 border ${
                      formik.touched.zipCode && formik.errors.zipCode
                        ? "border-rose-500/50"
                        : "border-gray-700/50"
                    } text-white focus:border-indigo-500/50 focus:ring-2 focus:ring-indigo-500/20 outline-none transition-all font-medium placeholder:text-gray-500`}
                  />
                  {formik.touched.zipCode && formik.errors.zipCode && (
                    <div className="text-rose-500 text-xs font-bold mt-1 uppercase tracking-widest">
                      {formik.errors.zipCode}
                    </div>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-400 mb-2 uppercase tracking-wider">
                    Country
                  </label>
                  <input
                    type="text"
                    {...formik.getFieldProps("country")}
                    className={`w-full px-4 py-3 rounded-xl bg-gray-800/50 border ${
                      formik.touched.country && formik.errors.country
                        ? "border-rose-500/50"
                        : "border-gray-700/50"
                    } text-white focus:border-indigo-500/50 focus:ring-2 focus:ring-indigo-500/20 outline-none transition-all font-medium placeholder:text-gray-500`}
                  />
                  {formik.touched.country && formik.errors.country && (
                    <div className="text-rose-500 text-xs font-bold mt-1 uppercase tracking-widest">
                      {formik.errors.country}
                    </div>
                  )}
                </div>
              </div>
            </motion.div>

            {/* Payment Information */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-gray-900/95 backdrop-blur-xl p-8 rounded-3xl border border-gray-700/50 shadow-xl"
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="bg-indigo-600/20 p-3 rounded-xl">
                  <CreditCard className="w-6 h-6 text-indigo-400" />
                </div>
                <h2 className="text-2xl font-black text-white tracking-tighter uppercase">
                  Payment Information
                </h2>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-bold text-gray-400 mb-2 uppercase tracking-wider">
                    Card Number
                  </label>
                  <input
                    type="text"
                    placeholder="1234 5678 9012 3456"
                    maxLength={19}
                    {...formik.getFieldProps("cardNumber")}
                    className={`w-full px-4 py-3 rounded-xl bg-gray-800/50 border ${
                      formik.touched.cardNumber && formik.errors.cardNumber
                        ? "border-rose-500/50"
                        : "border-gray-700/50"
                    } text-white focus:border-indigo-500/50 focus:ring-2 focus:ring-indigo-500/20 outline-none transition-all font-medium placeholder:text-gray-500`}
                  />
                  {formik.touched.cardNumber && formik.errors.cardNumber && (
                    <div className="text-rose-500 text-xs font-bold mt-1 uppercase tracking-widest">
                      {formik.errors.cardNumber}
                    </div>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-400 mb-2 uppercase tracking-wider">
                    Cardholder Name
                  </label>
                  <input
                    type="text"
                    placeholder="JOHN DOE"
                    {...formik.getFieldProps("cardName")}
                    className={`w-full px-4 py-3 rounded-xl bg-gray-800/50 border ${
                      formik.touched.cardName && formik.errors.cardName
                        ? "border-rose-500/50"
                        : "border-gray-700/50"
                    } text-white focus:border-indigo-500/50 focus:ring-2 focus:ring-indigo-500/20 outline-none transition-all font-medium placeholder:text-gray-500`}
                  />
                  {formik.touched.cardName && formik.errors.cardName && (
                    <div className="text-rose-500 text-xs font-bold mt-1 uppercase tracking-widest">
                      {formik.errors.cardName}
                    </div>
                  )}
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-bold text-gray-400 mb-2 uppercase tracking-wider">
                      Expiry Date
                    </label>
                    <input
                      type="text"
                      placeholder="MM/YY"
                      maxLength={5}
                      {...formik.getFieldProps("expiryDate")}
                      className={`w-full px-4 py-3 rounded-xl bg-gray-800/50 border ${
                        formik.touched.expiryDate && formik.errors.expiryDate
                          ? "border-rose-500/50"
                          : "border-gray-700/50"
                      } text-white focus:border-indigo-500/50 focus:ring-2 focus:ring-indigo-500/20 outline-none transition-all font-medium placeholder:text-gray-500`}
                    />
                    {formik.touched.expiryDate && formik.errors.expiryDate && (
                      <div className="text-rose-500 text-xs font-bold mt-1 uppercase tracking-widest">
                        {formik.errors.expiryDate}
                      </div>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-gray-400 mb-2 uppercase tracking-wider">
                      CVV
                    </label>
                    <input
                      type="text"
                      placeholder="123"
                      maxLength={4}
                      {...formik.getFieldProps("cvv")}
                      className={`w-full px-4 py-3 rounded-xl bg-gray-800/50 border ${
                        formik.touched.cvv && formik.errors.cvv
                          ? "border-rose-500/50"
                          : "border-gray-700/50"
                      } text-white focus:border-indigo-500/50 focus:ring-2 focus:ring-indigo-500/20 outline-none transition-all font-medium placeholder:text-gray-500`}
                    />
                    {formik.touched.cvv && formik.errors.cvv && (
                      <div className="text-rose-500 text-xs font-bold mt-1 uppercase tracking-widest">
                        {formik.errors.cvv}
                      </div>
                    )}
                  </div>
                </div>
              </div>

              <div className="mt-6 flex items-center gap-2 text-gray-400 text-sm">
                <Lock className="w-4 h-4" />
                <span>Your payment information is secure and encrypted</span>
              </div>
            </motion.div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="sticky top-28"
            >
              <div className="bg-gray-900/95 backdrop-blur-xl p-8 rounded-3xl border border-gray-700/50 shadow-xl relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/10 blur-[60px] rounded-full -z-10" />

                <h2 className="text-2xl font-black text-white mb-6 tracking-tighter uppercase">
                  Order Summary
                </h2>

                <div className="space-y-4 mb-6 max-h-64 overflow-y-auto">
                  {items.map((item) => (
                    <div
                      key={item.id}
                      className="flex items-center gap-4"
                    >
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-16 h-16 rounded-xl object-cover border border-gray-700"
                      />
                      <div className="flex-grow min-w-0">
                        <h3 className="font-bold text-white truncate text-sm">
                          {item.name}
                        </h3>
                        <p className="text-xs text-gray-400">
                          Qty: {item.quantity}
                        </p>
                      </div>
                      <p className="font-black text-white text-sm">
                        ${(item.price * item.quantity).toFixed(2)}
                      </p>
                    </div>
                  ))}
                </div>

                <div className="border-t border-gray-700 pt-6 space-y-3">
                  <div className="flex justify-between text-gray-400 font-bold text-sm uppercase tracking-wider">
                    <span>Subtotal</span>
                    <span className="text-white">
                      ${totalPrice().toFixed(2)}
                    </span>
                  </div>
                  <div className="flex justify-between text-gray-400 font-bold text-sm uppercase tracking-wider">
                    <span>Shipping</span>
                    <span className="text-green-400">$0.00</span>
                  </div>
                  <div className="flex justify-between text-gray-400 font-bold text-sm uppercase tracking-wider">
                    <span>Tax</span>
                    <span className="text-white">
                      ${(totalPrice() * 0.1).toFixed(2)}
                    </span>
                  </div>
                  <div className="pt-4 border-t border-gray-700 flex justify-between items-end">
                    <span className="text-lg font-black text-white tracking-tighter uppercase">
                      Total
                    </span>
                    <span className="text-3xl font-black text-indigo-400 tracking-tighter">
                      ${(totalPrice() * 1.1).toFixed(2)}
                    </span>
                  </div>
                </div>

                <Button
                  type="submit"
                  disabled={formik.isSubmitting}
                  className="cursor-pointer w-full h-16 rounded-2xl bg-indigo-600 hover:bg-indigo-700 text-white text-lg font-black shadow-2xl shadow-indigo-600/40 border-none transition-all hover:scale-105 active:scale-95 mt-6"
                >
                  {formik.isSubmitting ? (
                    <span className="flex items-center justify-center">
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{
                          duration: 1,
                          repeat: Infinity,
                          ease: "linear",
                        }}
                        className="w-6 h-6 border-2 border-white border-t-transparent rounded-full mr-2"
                      />
                      Processing...
                    </span>
                  ) : (
                    <>
                      PLACE ORDER
                      <ArrowRight className="w-6 h-6 ml-2" />
                    </>
                  )}
                </Button>

                <div className="mt-6 flex items-center gap-2 text-gray-400 text-xs">
                  <Check className="w-4 h-4 text-green-400" />
                  <span>Free shipping on all orders</span>
                </div>
                <div className="flex items-center gap-2 text-gray-500 text-xs">
                  <Truck className="w-4 h-4 text-indigo-500" />
                  <span>Estimated delivery: 5-7 business days</span>
                </div>
              </div>
            </motion.div>
          </div>
        </form>
      </div>
    </div>
  );
};
