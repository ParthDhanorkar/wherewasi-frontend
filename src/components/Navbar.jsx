// import { useState, useRef, useEffect } from "react";
// import { useNavigate, useLocation } from "react-router-dom";
// import api from "../services/api";
// import { toast } from "react-toastify";
// import ChangeUsernameModal from "../pages/ChangeUsername";
// import UpdatePasswordModal from "../pages/UpdatePassword";

// function Navbar() {
//   const [open, setOpen] = useState(false);
//   const [user, setUser] = useState(null);
//   const [showChangeUsername, setShowChangeUsername] = useState(false);
//   const [showUpdatePassword, setShowUpdatePassword] = useState(false);
//   const navigate = useNavigate();
//   const location = useLocation();
//   const dropdownRef = useRef(null);

//   useEffect(() => {
//     fetchUser();
//   }, []);

//   const fetchUser = async () => {
//     try {
//       const res = await api.get("/user/get-user");
//       if (res.data.success) {
//         setUser(res.data.user);
//       } else {
//         toast.error("Failed to load user");
//       }
//     } catch (error) {
//       console.error(error);
//       toast.error("Error loading user");
//     }
//   };

//   useEffect(() => {
//     const handleClickOutside = (e) => {
//       if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
//         setOpen(false);
//       }
//     };
//     document.addEventListener("mousedown", handleClickOutside);
//     return () => document.removeEventListener("mousedown", handleClickOutside);
//   }, []);

//   const handleLogout = () => {
//     localStorage.removeItem("token");
//     navigate("/login");
//   };

//   const handleMyNotes = () => navigate("/my-notes");
//   const handleHome = () => {
//     navigate("/home");
//     window.location.reload();
//   };

//   const handleDeleteAccount = () => {
//     toast.info(
//       ({ closeToast }) => (
//         <div className="space-y-2">
//           <p className="font-medium">Are you sure you want to delete your account?</p>
//           <p className="text-xs text-gray-500">This action cannot be undone.</p>
//           <div className="flex justify-end gap-2 mt-2">
//             <button
//               onClick={() => {
//                 deleteAccount();
//                 closeToast();
//               }}
//               className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700 text-xs"
//             >
//               Yes, Delete
//             </button>
//             <button
//               onClick={closeToast}
//               className="px-3 py-1 border border-gray-400 rounded text-xs"
//             >
//               Cancel
//             </button>
//           </div>
//         </div>
//       ),
//       { autoClose: false }
//     );
//   };

//   const deleteAccount = async () => {
//     try {
//       const res = await api.delete("/user/delete-user");
//       if (res.data.success) {
//         toast.success("Account deleted successfully");
//         localStorage.removeItem("token");
//         navigate("/");
//       } else {
//         toast.error("Failed to delete account");
//       }
//     } catch (error) {
//       console.error(error);
//       toast.error("Error deleting account");
//     }
//   };

//   return (
//     <>
//       <nav className="sticky top-0 z-50 bg-white shadow flex justify-between items-center px-6 py-3">
//         {/* Left: Home button */}
//         <div className="flex items-center gap-3">
//           <h1
//             onClick={handleHome}
//             className="text-xl font-bold text-gray-800 cursor-pointer hover:text-blue-600 transition"
//           >
//             🏠 Home
//           </h1>
//         </div>

//         {/* Right: user & dropdown */}
//         <div className="relative" ref={dropdownRef}>
//           <button
//             onClick={() => setOpen(!open)}
//             className="flex items-center gap-2 focus:outline-none"
//           >
//             <div className="w-9 h-9 bg-blue-500 rounded-full flex items-center justify-center text-white font-semibold uppercase">
//               {user?.userName?.[0] || "U"}
//             </div>
//             <span className="text-gray-800 font-medium">{user?.userName || "User"}</span>
//             <svg
//               className={`w-4 h-4 text-gray-600 transition-transform ${open ? "rotate-180" : ""}`}
//               fill="none"
//               stroke="currentColor"
//               viewBox="0 0 24 24"
//             >
//               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
//             </svg>
//           </button>

//           {open && (
//             <div className="absolute right-0 mt-2 w-48 bg-white border rounded shadow overflow-hidden text-sm">
//               <button
//                 onClick={handleMyNotes}
//                 className="block w-full text-left px-4 py-2 hover:bg-gray-100"
//               >
//                 📒 My Notes
//               </button>
//               <button
//                 onClick={() => setShowUpdatePassword(true)}
//                 className="block w-full text-left px-4 py-2 hover:bg-gray-100"
//               >
//                 🔑 Update Password
//               </button>
//               <button
//                 onClick={() => setShowChangeUsername(true)}
//                 className="block w-full text-left px-4 py-2 hover:bg-gray-100"
//               >
//                 ✏ Change Username
//               </button>
//               <button
//                 onClick={handleDeleteAccount}
//                 className="block w-full text-left px-4 py-2 text-red-600 hover:bg-gray-100"
//               >
//                 🗑 Delete Account
//               </button>
//               <button
//                 onClick={handleLogout}
//                 className="block w-full text-left px-4 py-2 hover:bg-gray-100"
//               >
//                 🚪 Logout
//               </button>
//             </div>
//           )}
//         </div>
//       </nav>

//       {/* Modals */}
//       {showChangeUsername && (
//         <ChangeUsernameModal
//           onClose={() => setShowChangeUsername(false)}
//           onUsernameChanged={(newName) => setUser({ ...user, userName: newName })}
//         />
//       )}
//       {showUpdatePassword && (
//         <UpdatePasswordModal onClose={() => setShowUpdatePassword(false)} />
//       )}
//     </>
//   );
// }

// export default Navbar;


import { useState, useRef, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import api from "../services/api";
import { toast } from "react-toastify";
import ChangeUsernameModal from "../pages/ChangeUsername";
import UpdatePasswordModal from "../pages/UpdatePassword";

function Navbar() {
  const [open, setOpen] = useState(false);
  const [user, setUser] = useState(null);
  const [showChangeUsername, setShowChangeUsername] = useState(false);
  const [showUpdatePassword, setShowUpdatePassword] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const dropdownRef = useRef(null);

  useEffect(() => {
    fetchUser();
  }, []);

  const fetchUser = async () => {
    try {
      const res = await api.get("/user/get-user");
      if (res.data.success) {
        setUser(res.data.user);
      } else {
        toast.error("Failed to load user");
      }
    } catch (error) {
      console.error(error);
      toast.error("Error loading user");
    }
  };

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  const handleMyNotes = () => navigate("/my-notes");
  const handleHome = () => {
    navigate("/home");
    window.location.reload();
  };

  const handleDeleteAccount = () => {
    toast.info(
      ({ closeToast }) => (
        <div className="space-y-2">
          <p className="font-medium">Are you sure you want to delete your account?</p>
          <p className="text-xs text-gray-500">This action cannot be undone.</p>
          <div className="flex justify-end gap-2 mt-2">
            <button
              onClick={() => {
                deleteAccount();
                closeToast();
              }}
              className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700 text-xs"
            >
              Yes, Delete
            </button>
            <button
              onClick={closeToast}
              className="px-3 py-1 border border-gray-400 rounded text-xs"
            >
              Cancel
            </button>
          </div>
        </div>
      ),
      { autoClose: false }
    );
  };

  const deleteAccount = async () => {
    try {
      const res = await api.delete("/user/delete-user");
      if (res.data.success) {
        toast.success("Account deleted successfully");
        localStorage.removeItem("token");
        navigate("/");
      } else {
        toast.error("Failed to delete account");
      }
    } catch (error) {
      console.error(error);
      toast.error("Error deleting account");
    }
  };

  return (
    <>
<nav className="fixed top-0 left-0 w-full z-2000 bg-gradient-to-r from-cyan-100 to-blue-100 shadow-md flex justify-between items-center px-4 md:px-6 py-3">

        {/* Left: Home */}
        <div className="flex items-center gap-3">
          <h1
            onClick={handleHome}
            className="text-xl md:text-2xl font-bold text-slate-800 cursor-pointer hover:text-sky-600 transition"
          >
            WhereWasI
          </h1>
        </div>
  
        {/* Right: user & dropdown */}
        <div className="relative z-50" ref={dropdownRef}>
          <button
            onClick={() => setOpen(!open)}
            className="flex items-center gap-2 focus:outline-none"
          >
            <div className="w-9 h-9 md:w-10 md:h-10 bg-sky-500 rounded-full flex items-center justify-center text-white font-semibold uppercase">
              {user?.userName?.[0] || "U"}
            </div>
            <span className="hidden sm:block text-slate-800 font-medium">{user?.userName || "User"}</span>
            <svg
              className={`w-4 h-4 text-gray-600 transition-transform ${open ? "rotate-180" : ""}`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>
  
          {open && (
            <div className="absolute right-0 mt-2 w-48 bg-white border rounded-xl shadow-lg overflow-hidden text-sm z-600">
            <button
                onClick={handleMyNotes}
                className="block w-full text-left px-4 py-2 hover:bg-sky-50"
              >
                📒 My Notes
              </button>
              <button
                onClick={() => setShowUpdatePassword(true)}
                className="block w-full text-left px-4 py-2 hover:bg-sky-50"
              >
                🔑 Update Password
              </button>
              <button
                onClick={() => setShowChangeUsername(true)}
                className="block w-full text-left px-4 py-2 hover:bg-sky-50"
              >
                ✏ Change Username
              </button>
              <button
                onClick={handleDeleteAccount}
                className="block w-full text-left px-4 py-2 text-red-600 hover:bg-red-50"
              >
                🗑 Delete Account
              </button>
              <button
                onClick={handleLogout}
                className="block w-full text-left px-4 py-2 hover:bg-sky-50"
              >
                🚪 Logout
              </button>
            </div>
          )}
        </div>
      </nav>
  
      {/* Modals */}
      {showChangeUsername && (
        <ChangeUsernameModal
          onClose={() => setShowChangeUsername(false)}
          onUsernameChanged={(newName) => setUser({ ...user, userName: newName })}
        />
      )}
      {showUpdatePassword && (
        <UpdatePasswordModal onClose={() => setShowUpdatePassword(false)} />
      )}
    </>
  );
}

export default Navbar;
