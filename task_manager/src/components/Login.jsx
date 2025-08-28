// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { toast } from "react-hot-toast";
// import axios from "axios";
// import { FaEye, FaEyeSlash } from "react-icons/fa";
// import { apiUrl } from "../App";

// const Login = () => {
//   const navigate = useNavigate();
//   const [showPassword, setShowPassword] = useState(false);
//   const [formData, setFormData] = useState({
//     emailOrUsername: "",
//     password: "",
//   });

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({ ...formData, [name]: value });
//   };

//   const togglePasswordVisibility = () => {
//     setShowPassword(!showPassword);
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     if (!formData.emailOrUsername || !formData.password) {
//       toast.error("All fields are required");
//       return;
//     }

//     try {
//       const response = await axios.post(`${apiUrl}/auth/login`, {
//         email: formData.emailOrUsername, // ensure backend expects 'email'
//         password: formData.password,
//       });

//       const { token, user } = response.data;

//       localStorage.setItem("token", token);
//       localStorage.setItem("user", JSON.stringify(user));

//       toast.success(`Welcome ${user.name}!`);

//       // Role-wise redirect
//       if (user.role === "manager") navigate("/managerdashboard");
//       else navigate("/employeedashboard");

//     } catch (error) {
//       console.error(error);
//       toast.error(error.response?.data?.message || "Login failed");
//     }
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gray-100">
//       <form
//         onSubmit={handleSubmit}
//         className="bg-white rounded-2xl shadow-lg p-10 w-full max-w-md"
//       >
//         <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">Login</h2>

//         <div className="mb-4">
//           <label className="block text-gray-700 font-semibold mb-2">Email</label>
//           <input
//             type="text"
//             name="emailOrUsername"
//             value={formData.emailOrUsername}
//             onChange={handleChange}
//             placeholder="Enter your email"
//             autoComplete="username"
//             className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
//           />
//         </div>

//         <div className="mb-6 relative">
//           <label className="block text-gray-700 font-semibold mb-2">Password</label>
//           <input
//             type={showPassword ? "text" : "password"}
//             name="password"
//             value={formData.password}
//             onChange={handleChange}
//             placeholder="Enter your password"
//             autoComplete="current-password"
//             className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
//           />
//           <span
//             onClick={togglePasswordVisibility}
//             className="absolute right-3 top-11 cursor-pointer text-gray-500"
//           >
//             {showPassword ? <FaEyeSlash /> : <FaEye />}
//           </span>
//         </div>

//         <button
//           type="submit"
//           className="w-full py-3 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-600 transition duration-300"
//         >
//           Login
//         </button>

//         <p className="text-center mt-5 text-gray-600">
//           Don't have an account?{" "}
//           <a href="/signup" className="text-blue-500 font-semibold hover:underline">
//             Sign Up
//           </a>
//         </p>
//       </form>
//     </div>
//   );
// };

// export default Login;


import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import axios from "axios";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { apiUrl } from "../App";

const Login = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    emailOrUsername: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.emailOrUsername || !formData.password) {
      toast.error("All fields are required");
      return;
    }

    try {
      const response = await axios.post(`${apiUrl}/auth/login`, {
        email: formData.emailOrUsername,
        password: formData.password,
      });

      const { token, user } = response.data;

      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));

      toast.success(`Welcome ${user.name}!`);

      // Role-wise redirect
      if (user.role === "manager") navigate("/managerdashboard");
      else navigate("/employeedashboard");

    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white rounded-2xl shadow-lg p-10 w-full max-w-md relative"
      >
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">Login</h2>

        {/* Home Button */}
        <button
          type="button"
          onClick={() => navigate("/")}
          className="absolute top-4 left-4 text-blue-500 font-semibold hover:underline"
        >
          Home
        </button>

        <div className="mb-4">
          <label className="block text-gray-700 font-semibold mb-2">Email</label>
          <input
            type="text"
            name="emailOrUsername"
            value={formData.emailOrUsername}
            onChange={handleChange}
            placeholder="Enter your email"
            autoComplete="username"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

        <div className="mb-6 relative">
          <label className="block text-gray-700 font-semibold mb-2">Password</label>
          <input
            type={showPassword ? "text" : "password"}
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Enter your password"
            autoComplete="current-password"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <span
            onClick={togglePasswordVisibility}
            className="absolute right-3 top-11 cursor-pointer text-gray-500"
          >
            {showPassword ? <FaEyeSlash /> : <FaEye />}
          </span>
        </div>

        <button
          type="submit"
          className="w-full py-3 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-600 transition duration-300"
        >
          Login
        </button>

        <p className="text-center mt-5 text-gray-600">
          Don't have an account?{" "}
          <a href="/signup" className="text-blue-500 font-semibold hover:underline">
            Sign Up
          </a>
        </p>
      </form>
    </div>
  );
};

export default Login;
