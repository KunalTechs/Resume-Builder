import React from "react";
import { User, Mail, Lock } from "lucide-react";

const Login = () => {


  const query = new URLSearchParams(window.location.search)
  const urlState = query.get('state')
    const [state, setState] = React.useState( urlState ||"login");

  const [formData, setFormData] = React.useState({
    name: "",
    email: "",
    password: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
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
        <p className="text-gray-400 text-sm mt-2">Please {state} to continue</p>

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
              required
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
            required
          />
        </div>

        <div className="mt-4 text-left text-red-400">
          <button className="text-sm hover:underline" type="reset">
            Forgot password?
          </button>
        </div>

        <button
          type="submit"
          className="mt-3 w-full h-11 rounded-full text-white bg-red-600 hover:bg-red-700 transition-all"
        >
          {state === "login" ? "Login" : "Sign up"}
        </button>

        <p
          onClick={() =>
            setState((prev) => (prev === "login" ? "register" : "login"))
          }
          className="text-gray-400 text-sm mt-3 mb-11 cursor-pointer"
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
