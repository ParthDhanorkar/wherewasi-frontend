// import { useState } from "react";
// import api from "../services/api";
// import { toast } from "react-toastify";
// import { useNavigate } from "react-router-dom";

// function Register() {
//   const navigate = useNavigate();

//   // form fields
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

//     try {
//       const { userName, email, answer, password } = formData;

//       // simple validation
//       if (!userName.trim() || !email.trim() || !answer.trim() || !password) {
//         toast.error("All fields are required");
//         return;
//       }

//       const res = await api.post("/auth/register", formData);

//       if (res.data.success) {
//         toast.success("Registration successful");
//         localStorage.setItem("token", res.data.token);
//         navigate("/home");
//       } else {
//         toast.error(res.data.message);
//       }
//     } catch (error) {
//       toast.error(error.response?.data?.message || "Registration failed");
//     }
//   };

//   return (
//     <div className="flex items-center justify-center min-h-screen bg-gray-100">
//       <form onSubmit={handleSubmit} className="bg-white p-8 rounded shadow-md w-full max-w-md">
//         <h2 className="text-2xl font-bold mb-6 text-center">Register</h2>

//         <input
//           type="text"
//           name="userName"
//           value={formData.userName}
//           onChange={handleChange}
//           placeholder="Username"
//           className="w-full p-2 border rounded mb-4"
//           required
//         />

//         <input
//           type="email"
//           name="email"
//           value={formData.email}
//           onChange={handleChange}
//           placeholder="Email"
//           className="w-full p-2 border rounded mb-4"
//           required
//         />

//         <input
//           type="text"
//           name="answer"
//           value={formData.answer}
//           onChange={handleChange}
//           placeholder="Security Answer (e.g., Your fav color)"
//           className="w-full p-2 border rounded mb-4"
//           required
//         />

//         <input
//           type="password"
//           name="password"
//           value={formData.password}
//           onChange={handleChange}
//           placeholder="Password"
//           className="w-full p-2 border rounded mb-6"
//           required
//         />

//         <button
//           type="submit"
//           className="bg-blue-600 text-white w-full p-2 rounded hover:bg-blue-700"
//         >
//           Register
//         </button>

//         <p className="text-center mt-4">
//           Already have an account?{" "}
//           <a href="/login" className="text-blue-600 hover:underline">Login</a>
//         </p>
//       </form>
//     </div>
//   );
// }

// export default Register;



import { useState } from "react";
import api from "../services/api";
import { toast } from "react-toastify";
import { useNavigate, Link } from "react-router-dom";

function Register() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    userName: "",
    email: "",
    answer: "",
    password: ""
  });
  const [loading, setLoading] = useState(false);

  // handle input change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // handle submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    const { userName, email, answer, password } = formData;

    if (!userName.trim() || !email.trim() || !answer.trim() || !password) {
      toast.error("All fields are required");
      return;
    }

    try {
      setLoading(true);
      const res = await api.post("/auth/register", formData);

      if (res.data.success) {
        toast.success("Registration successful");
        localStorage.setItem("token", res.data.token);
        navigate("/home");
      } else {
        toast.error(res.data.message || "Registration failed");
      }
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-cyan-50 to-blue-50 px-4">
      <form
        onSubmit={handleSubmit}
        className="bg-white rounded-2xl shadow-xl w-full max-w-md p-8 space-y-5"
      >
        <h2 className="text-2xl md:text-3xl font-bold text-center text-slate-800">Create Account</h2>

        <input
          type="text"
          name="userName"
          value={formData.userName}
          onChange={handleChange}
          placeholder="Username"
          className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-sky-500"
        />

        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Email"
          className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-sky-500"
        />

        <input
          type="text"
          name="answer"
          value={formData.answer}
          onChange={handleChange}
          placeholder="Security Answer (e.g., Your favorite color)"
          className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-sky-500"
        />

        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          placeholder="Password"
          className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-sky-500"
        />

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-sky-600 text-white font-semibold py-2 rounded-lg hover:bg-sky-700 transition disabled:opacity-50"
        >
          {loading ? "Registering..." : "Register"}
        </button>

        <p className="text-center text-sm text-gray-600">
          Already have an account?{" "}
          <Link to="/login" className="text-sky-600 hover:underline">
            Login
          </Link>
        </p>
      </form>
    </div>
  );
}

export default Register;
