// import React, { useState } from "react";
// import api from "../services/api";
// import { toast } from "react-toastify";

// function UpdatePasswordModal({ onClose }) {
//   const [oldPassword, setOldPassword] = useState("");
//   const [newPassword, setNewPassword] = useState("");
//   const [loading, setLoading] = useState(false);

//   const handleSubmit = async () => {
//     if (!oldPassword || !newPassword) {
//       toast.error("Both fields are required");
//       return;
//     }
//     setLoading(true);
//     try {
//       const res = await api.put("/user/update-password", { oldPassword, newPassword });
//       if (res.data.success) {
//         toast.success("Password updated successfully");
//         onClose();
//       } else {
//         toast.error(res.data.message || "Failed to update password");
//       }
//     } catch (error) {
//       console.error(error);
//       toast.error("Error updating password");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="fixed inset-0 bg-black/20 backdrop-blur-sm flex items-center justify-center z-50 px-4">
//       <div className="bg-gradient-to-br from-cyan-50 to-blue-50 w-full max-w-md rounded-2xl shadow-xl p-6 space-y-4">
//         <h2 className="text-xl font-semibold text-slate-800 text-center">🔑 Update Password</h2>

//         <div className="space-y-3">
//           <input
//             type="password"
//             value={oldPassword}
//             onChange={(e) => setOldPassword(e.target.value)}
//             placeholder="Old password"
//             className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-sky-500"
//           />
//           <input
//             type="password"
//             value={newPassword}
//             onChange={(e) => setNewPassword(e.target.value)}
//             placeholder="New password"
//             className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-sky-500"
//           />
//         </div>

//         <div className="flex justify-end gap-2 pt-2">
//           <button
//             onClick={onClose}
//             className="px-4 py-2 border border-gray-400 rounded-lg text-gray-700 hover:bg-gray-100 transition"
//           >
//             Cancel
//           </button>
//           <button
//             onClick={handleSubmit}
//             disabled={loading}
//             className="px-4 py-2 bg-sky-600 text-white rounded-lg hover:bg-sky-700 transition disabled:opacity-50"
//           >
//             {loading ? "Updating..." : "Update"}
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default UpdatePasswordModal;



import React, { useState } from "react";
import api from "../services/api";
import { toast } from "react-toastify";

function UpdatePasswordModal({ onClose }) {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (!oldPassword || !newPassword) {
      toast.error("Both fields are required");
      return;
    }
    setLoading(true);
    try {
      const res = await api.put("/user/update-password", { oldPassword, newPassword });
      if (res.data.success) {
        toast.success("Password updated successfully");
        onClose();
      } else {
        toast.error(res.data.message || "Failed to update password");
      }
    } catch (error) {
      console.error(error);
      toast.error("Error updating password");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/20 backdrop-blur-sm flex items-center justify-center z-500 px-4">
      <div className="bg-gradient-to-br from-cyan-50 to-blue-50 w-full max-w-md rounded-2xl shadow-xl p-6 space-y-4">
        <h2 className="text-xl font-semibold text-slate-800 text-center">🔑 Update Password</h2>

        <div className="space-y-3">
          <input
            type="password"
            value={oldPassword}
            onChange={(e) => setOldPassword(e.target.value)}
            placeholder="Old password"
            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-sky-500"
          />
          <input
            type="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            placeholder="New password"
            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-sky-500"
          />
        </div>

        <div className="flex justify-end gap-2 pt-2">
          <button
            onClick={onClose}
            className="px-4 py-2 border border-gray-400 rounded-lg text-gray-700 hover:bg-gray-100 transition"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            disabled={loading}
            className="px-4 py-2 bg-sky-600 text-white rounded-lg hover:bg-sky-700 transition disabled:opacity-50"
          >
            {loading ? "Updating..." : "Update"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default UpdatePasswordModal;
