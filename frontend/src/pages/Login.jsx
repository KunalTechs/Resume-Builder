import React from "react";
import { User, Mail, Lock, Loader2 } from "lucide-react";
import { useDispatch } from "react-redux";
import { login } from "../app/features/authSlice";
import toast from "react-hot-toast";
import api from "../config/api";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const query = new URLSearchParams(window.location.search);
  const urlState = query.get("state");
  const [state, setState] = React.useState(urlState || "login");
  const [loading, setLoading] = React.useState(false);

  const [formData, setFormData] = React.useState({
    name: "",
    email: "",
    password: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);

    try {

      
      // Login or register
      const response = await api.post(`/api/users/${state}`, formData);
     

      // Fetch user profile
      console.log("🔍 Fetching user profile...");
      const { data } = await api.get("/api/users/profile");
      

      // Dispatch to Redux
      dispatch(login(data));
     

      toast.success(`${state === "login" ? "Login" : "Registration"} successful`);
      navigate("/app");
    } catch (error) {
     
      
      setFormData((prev) => ({ ...prev, password: "" }));

      const errorMessage =
        error?.response?.data?.message ||
        error?.message ||
        "An error occurred. Please try again.";

      toast.error(errorMessage);
    } finally {
      console.log("🏁 Finally block");
      setLoading(false);
    }
  };


  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-black">
      <form
        onSubmit={handleSubmit}
        className="sm:w-[350px] w-full text-center border border-gray-700 rounded-2xl px-8 bg-[#0A0A0A] shadow-lg"
      >
        <h1 className="text-white text-3xl mt-10 font-semibold">
          {state === "login" ? "Login" : "Sign up"}
        </h1>
        <p className="text-gray-400 text-sm mt-2">
          Please {state === "login" ? "login" : "sign up"} to continue
        </p>

        {state !== "login" && (
          <div className="flex items-center mt-6 w-full bg-[#0A0A0A] border border-gray-700 h-12 rounded-full overflow-hidden pl-6 gap-2">
            <User size={20} color="#9CA3AF" />
            <input
              type="text"
              name="name"
              placeholder="Name"
              className="bg-transparent text-white placeholder-gray-500 border-none outline-none flex-1"
              value={formData.name}
              onChange={handleChange}
              disabled={loading}
              required={state !== "login"}
            />
          </div>
        )}

        <div className="flex items-center w-full mt-4 bg-[#0A0A0A] border border-gray-700 h-12 rounded-full overflow-hidden pl-6 gap-2">
          <Mail size={20} color="#9CA3AF" />
          <input
            type="email"
            name="email"
            placeholder="Email id"
            className="bg-transparent text-white placeholder-gray-500 border-none outline-none flex-1"
            value={formData.email}
            onChange={handleChange}
            disabled={loading}
            required
          />
        </div>

        <div className="flex items-center mt-4 w-full bg-[#0A0A0A] border border-gray-700 h-12 rounded-full overflow-hidden pl-6 gap-2">
          <Lock size={20} color="#9CA3AF" />
          <input
            type="password"
            name="password"
            placeholder="Password"
            className="bg-transparent text-white placeholder-gray-500 border-none outline-none flex-1"
            value={formData.password}
            onChange={handleChange}
            disabled={loading}
            required
          />
        </div>

        {state === "login" && (
          <div className="mt-4 text-left text-red-400">
            <button 
              type="button"
              className="text-sm hover:underline"
              onClick={() => toast.info("Forgot password feature coming soon!")}
            >
              Forgot password?
            </button>
          </div>
        )}

        <button
          type="submit"
          disabled={loading}
          className="mt-3 w-full h-11 rounded-full text-white bg-red-600 hover:bg-red-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
        >
          {loading ? (
            <>
              <Loader2 size={20} className="animate-spin" />
              {state === "login" ? "Logging in..." : "Signing up..."}
            </>
          ) : (
            <>{state === "login" ? "Login" : "Sign up"}</>
          )}
        </button>

        <p
          onClick={() => {
            if (!loading) {
              setState((prev) => (prev === "login" ? "register" : "login"));
              setFormData({ name: "", email: "", password: "" });
            }
          }}
          className={`text-gray-400 text-sm mt-3 mb-11 ${
            loading ? "cursor-not-allowed opacity-50" : "cursor-pointer"
          }`}
        >
          {state === "login"
            ? "Don't have an account?"
            : "Already have an account?"}{" "}
          <span className="text-red-400 hover:underline">Click here</span>
        </p>
      </form>
    </div>
  );
};

export default Login;