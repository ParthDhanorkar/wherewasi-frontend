// import { useState } from "react";
// import api from "../services/api";
// import { toast } from "react-toastify";
// import { useNavigate } from "react-router-dom";

// function ForgotPassword() {
//   const navigate = useNavigate();

//   const [formData, setFormData] = useState({
//     userName: "",
//     email: "",
//     answer: "",
//     password: ""
//   });

//   // handle input change
//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   // handle submit
//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     const { userName, email, answer, password } = formData;

//     if ((!userName.trim() && !email.trim()) || !answer.trim() || !password) {
//       toast.error("Please fill all fields properly");
//       return;
//     }

//     try {
//       const res = await api.put("/auth/forgot-password", formData);

//       if (res.data.success) {
//         toast.success("Password changed successfully");
//         navigate("/login");
//       } else {
//         toast.error(res.data.message);
//       }
//     } catch (error) {
//         toast.error(error?.response?.data?.message || "Something went wrong");
//     }
//   };

//   return (
//     <div className="flex items-center justify-center min-h-screen bg-gray-100">
//       <form onSubmit={handleSubmit} className="bg-white p-8 rounded shadow-md w-full max-w-md">
//         <h2 className="text-2xl font-bold mb-6 text-center">Forgot Password</h2>

//         <input
//           type="text"
//           name="userName"
//           value={formData.userName}
//           onChange={handleChange}
//           placeholder="Username (optional)"
//           className="w-full p-2 border rounded mb-4"
//         />

//         <div className="text-center text-gray-500 mb-2">OR</div>

//         <input
//           type="email"
//           name="email"
//           value={formData.email}
//           onChange={handleChange}
//           placeholder="Email (optional)"
//           className="w-full p-2 border rounded mb-4"
//         />

//         <input
//           type="text"
//           name="answer"
//           value={formData.answer}
//           onChange={handleChange}
//           placeholder="Security Answer"
//           className="w-full p-2 border rounded mb-4"
//           required
//         />

//         <input
//           type="password"
//           name="password"
//           value={formData.password}
//           onChange={handleChange}
//           placeholder="New Password"
//           className="w-full p-2 border rounded mb-6"
//           required
//         />

//         <button
//           type="submit"
//           className="bg-blue-600 text-white w-full p-2 rounded hover:bg-blue-700"
//         >
//           Change Password
//         </button>

//         <p className="text-center mt-4">
//           Remembered password?{" "}
//           <a href="/login" className="text-blue-600 hover:underline">Login</a>
//         </p>
//       </form>
//     </div>
//   );
// }

// export default ForgotPassword;



import { useState } from "react";
import api from "../services/api";
import { toast } from "react-toastify";
import { useNavigate, Link } from "react-router-dom";

function ForgotPassword() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    userName: "",
    email: "",
    answer: "",
    password: ""
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { userName, email, answer, password } = formData;

    if ((!userName.trim() && !email.trim()) || !answer.trim() || !password) {
      toast.error("Please fill all fields properly");
      return;
    }

    try {
      setLoading(true);
      const res = await api.put("/auth/forgot-password", formData);

      if (res.data.success) {
        toast.success("Password changed successfully");
        navigate("/login");
      } else {
        toast.error(res.data.message || "Failed to change password");
      }
    } catch (error) {
      toast.error(error?.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-cyan-50 to-blue-50 px-4">
      <form 
        onSubmit={handleSubmit} 
        className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md space-y-4"
      >
        <h2 className="text-2xl md:text-3xl font-bold text-center text-slate-800">Forgot Password</h2>
        <p className="text-center text-gray-500 text-sm">Reset your password securely</p>

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
          type="text"
          name="answer"
          value={formData.answer}
          onChange={handleChange}
          placeholder="Security Answer"
          required
          className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-sky-500"
        />

        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          placeholder="New Password"
          required
          className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-sky-500"
        />

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-sky-600 text-white font-semibold py-2 rounded-lg hover:bg-sky-700 transition disabled:opacity-50"
        >
          {loading ? "Changing..." : "Change Password"}
        </button>

        <p className="text-center text-sm text-gray-600">
          Remembered your password?{" "}
          <Link to="/login" className="text-sky-600 hover:underline">
            Login here
          </Link>
        </p>
      </form>
    </div>
  );
}

export default ForgotPassword;
