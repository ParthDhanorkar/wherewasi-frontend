// import { useState } from "react";
// import api from "../services/api";
// import { toast } from "react-toastify";
// import { useNavigate, Link } from "react-router-dom";

// function Login() {
//   const navigate = useNavigate();

//   const [formData, setFormData] = useState({
//     userName: "",
//     email: "",
//     password: ""
//   });

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     if ((!formData.userName && !formData.email) || !formData.password) {
//       toast.error("Please provide username or email and password");
//       return;
//     }

//     try {
//       const res = await api.post("/auth/login", formData);

//       if (res.data.success) {
//         toast.success("Login successful");
//         localStorage.setItem("token", res.data.token);
//         navigate("/home");
//       } else {
//         toast.error(res.data.message);
//       }
//     } catch (error) {
//       toast.error(error.response?.data?.message || "Login failed");
//     }
//   };

//   return (
//     <div className="flex items-center justify-center min-h-screen bg-gray-100">
//       <form 
//         onSubmit={handleSubmit} 
//         className="bg-white p-8 rounded-lg shadow-md w-full max-w-md space-y-4"
//       >
//         <h2 className="text-3xl font-semibold text-center text-gray-800">Welcome Back</h2>
//         <p className="text-center text-gray-500">Login to your account</p>

//         <input
//           type="text"
//           name="userName"
//           value={formData.userName}
//           onChange={handleChange}
//           placeholder="Username (optional)"
//           className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
//         />

//         <div className="text-center text-gray-500 text-sm">OR</div>

//         <input
//           type="email"
//           name="email"
//           value={formData.email}
//           onChange={handleChange}
//           placeholder="Email (optional)"
//           className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
//         />

//         <input
//           type="password"
//           name="password"
//           value={formData.password}
//           onChange={handleChange}
//           placeholder="Password"
//           className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
//           required
//         />

//         <div className="text-right">
//           <Link to="/forgot-password" className="text-blue-600 text-sm hover:underline">
//             Forgot your password?
//           </Link>
//         </div>

//         <button
//           type="submit"
//           className="bg-blue-600 text-white w-full p-2 rounded hover:bg-blue-700 transition"
//         >
//           Login
//         </button>

//         <p className="text-center text-sm text-gray-600">
//           Don&apos;t have an account?{" "}
//           <Link to="/register" className="text-blue-600 hover:underline">
//             Register here
//           </Link>
//         </p>
//       </form>
//     </div>
//   );
// }

// export default Login;



import { useState } from "react";
import api from "../services/api";
import { toast } from "react-toastify";
import { useNavigate, Link } from "react-router-dom";

function Login() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    userName: "",
    email: "",
    password: ""
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if ((!formData.userName && !formData.email) || !formData.password) {
      toast.error("Please provide username or email and password");
      return;
    }

    try {
      setLoading(true);
      const res = await api.post("/auth/login", formData);

      if (res.data.success) {
        toast.success("Login successful");
        localStorage.setItem("token", res.data.token);
        navigate("/home");
      } else {
        toast.error(res.data.message || "Login failed");
      }
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-cyan-50 to-blue-50 px-4">
      <form 
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md space-y-5"
      >
        <h2 className="text-2xl md:text-3xl font-bold text-center text-slate-800">Welcome Back</h2>
        <p className="text-center text-gray-500 text-sm">Login to your account</p>

        <input
          type="text"
          name="userName"
          value={formData.userName}
          onChange={handleChange}
          placeholder="Username (optional)"
          className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-sky-500"
        />

        <div className="text-center text-gray-500 text-sm">OR</div>

        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Email (optional)"
          className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-sky-500"
        />

        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          placeholder="Password"
          className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-sky-500"
          required
        />

        <div className="text-right">
          <Link to="/forgot-password" className="text-sky-600 text-sm hover:underline">
            Forgot your password?
          </Link>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-sky-600 text-white font-semibold py-2 rounded-lg hover:bg-sky-700 transition disabled:opacity-50"
        >
          {loading ? "Logging in..." : "Login"}
        </button>

        <p className="text-center text-sm text-gray-600">
          Don&apos;t have an account?{" "}
          <Link to="/register" className="text-sky-600 hover:underline">
            Register here
          </Link>
        </p>
      </form>
    </div>
  );
}

export default Login;
