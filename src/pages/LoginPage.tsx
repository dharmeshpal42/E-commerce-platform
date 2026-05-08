import { useState } from "react";
import { useNavigate, useLocation, Navigate, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useAuthStore } from "../store/useAuthStore";
import { Button } from "../components/ui/Button";
import { Input } from "../components/ui/Input";
import { Lock, Mail, ArrowRight, Eye, EyeOff } from "lucide-react";
import { toast } from "sonner";

export const LoginPage = () => {
  const [email, setEmail] = useState("test@mail.com");
  const [password, setPassword] = useState("Password@123");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const login = useAuthStore((state) => state.login);
  const navigate = useNavigate();
  const location = useLocation();
  const from = (location.state as any)?.from || "/";

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 800));

    const success = await login(email, password);
    if (success) {
      toast.success("Access Granted. Welcome back!");
      navigate(from);
    } else {
      setError("AUTHENTICATION_FAILED: Invalid credentials.");
    }
    setIsLoading(false);
  };

  return (
    <div className="min-h-[calc(100vh-80px)] flex items-center justify-center p-4 bg-[#0a091a] relative overflow-hidden">
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-indigo-500/10 blur-[120px] rounded-full -z-10 animate-pulse" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/10 blur-[120px] rounded-full -z-10 animate-pulse delay-1000" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md"
      >
        <div className="bg-gray-900/95 backdrop-blur-xl rounded-3xl shadow-2xl p-10 border border-gray-700/50 relative overflow-hidden">
          <div className="text-center mb-10">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-indigo-600/20 text-indigo-400 mb-6 border border-indigo-500/30">
              <Lock className="w-8 h-8" />
            </div>
            <h1 className="text-4xl font-black text-white tracking-tighter uppercase">
              Protocol_Login
            </h1>
            <p className="text-gray-400 mt-2 font-bold uppercase tracking-widest text-xs opacity-70">
              Initialize your secure mission
            </p>
          </div>

          <form
            onSubmit={handleSubmit}
            className="space-y-6"
          >
            {error && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                className="bg-rose-500/10 border border-rose-500/20 text-rose-500 text-xs font-black tracking-widest p-4 rounded-2xl uppercase"
              >
                {error}
              </motion.div>
            )}

            <div className="space-y-2">
              <label className="text-xs font-black text-gray-400 uppercase tracking-[0.2em] ml-1 opacity-70">
                Identity_Email
              </label>
              <div className="relative group">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500 transition-colors group-hover:text-indigo-400" />
                <Input
                  type="email"
                  placeholder="USER@VOGUE.PROTOCOL"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="pl-12 h-14 bg-gray-800/50 border-gray-700/50 rounded-xl font-bold placeholder:text-gray-500/50 uppercase text-xs tracking-widest text-white focus:border-indigo-500/50 focus:ring-indigo-500/20 transition-all"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-black text-gray-400 uppercase tracking-[0.2em] ml-1 opacity-70">
                Access_Key
              </label>
              <div className="relative group">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500 transition-colors group-focus-within:text-indigo-400" />
                <Input
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="pl-12 pr-12 h-14 bg-gray-800/50 border-gray-700/50 rounded-xl font-bold placeholder:text-gray-500/50 text-white focus:border-indigo-500/50 focus:ring-indigo-500/20 transition-all"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-indigo-400 transition-colors cursor-pointer"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            <Button
              type="submit"
              className="cursor-pointer w-full h-16 rounded-2xl bg-indigo-600 hover:bg-indigo-700 text-white font-black text-lg shadow-2xl shadow-indigo-500/30 border-none transition-all hover:scale-105 active:scale-95 group"
              disabled={isLoading}
            >
              {isLoading ? (
                <span className="flex items-center gap-3">
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{
                      duration: 1,
                      repeat: Infinity,
                      ease: "linear",
                    }}
                    className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full"
                  />
                  Logging in...
                </span>
              ) : (
                <span className="flex items-center gap-2">
                  Login
                  <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
                </span>
              )}
            </Button>
          </form>

          <div className="mt-10 pt-8 border-t border-gray-700/50 text-center">
            <p className="text-gray-400 text-xs font-black uppercase tracking-widest">
              New recruit?{" "}
              <Link
                to="/register"
                className="text-indigo-400 hover:text-indigo-300 transition-colors"
              >
                Register Protocol
              </Link>
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
};
