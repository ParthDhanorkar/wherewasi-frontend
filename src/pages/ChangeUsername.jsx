

// import React, { useState } from "react";
// import api from "../services/api";
// import { toast } from "react-toastify";

// function ChangeUsernameModal({ onClose, onUsernameChanged }) {
//   const [newUserName, setNewUserName] = useState("");
//   const [loading, setLoading] = useState(false);

//   const handleSubmit = async () => {
//     if (!newUserName.trim()) {
//       toast.error("Please enter a username");
//       return;
//     }
//     setLoading(true);
//     try {
//       const res = await api.put("/user/change-username", { newUserName });
//       if (res.data.success) {
//         toast.success("Username updated successfully");
//         onUsernameChanged(res.data.user.userName);
//         onClose();
//       } else {
//         toast.error(res.data.message || "Failed to change username");
//       }
//     } catch (error) {
//       console.error(error);
//       toast.error("Error changing username");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="fixed inset-0 bg-black/10 backdrop-blur-sm flex items-center justify-center z-500">
//       <div className="bg-white rounded-lg p-6 w-full max-w-md space-y-4 shadow-xl">
//         <h2 className="text-lg font-semibold">✏ Change Username</h2>
//         <input
//           type="text"
//           value={newUserName}
//           onChange={(e) => setNewUserName(e.target.value)}
//           placeholder="New username"
//           className="w-full border rounded px-3 py-2"
//         />
//         <div className="flex justify-end gap-2">
//           <button onClick={onClose} className="px-4 py-2 border rounded">Cancel</button>
//           <button
//             onClick={handleSubmit}
//             disabled={loading}
//             className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
//           >
//             {loading ? "Updating..." : "Update"}
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default ChangeUsernameModal;





import React, { useState } from "react";
import api from "../services/api";
import { toast } from "react-toastify";

function ChangeUsernameModal({ onClose, onUsernameChanged }) {
  const [newUserName, setNewUserName] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (!newUserName.trim()) {
      toast.error("Please enter a username");
      return;
    }
    setLoading(true);
    try {
      const res = await api.put("/user/change-username", { newUserName });
      if (res.data.success) {
        toast.success("Username updated successfully");
        onUsernameChanged(res.data.user.userName);
        onClose();
      } else {
        toast.error(res.data.message || "Failed to change username");
      }
    } catch (error) {
      console.error(error);
      toast.error("Error changing username");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/20 backdrop-blur-sm flex items-center justify-center z-500 px-4">
      <div className="bg-gradient-to-br from-cyan-50 to-blue-50 w-full max-w-md rounded-2xl shadow-xl p-6 space-y-4">
        <h2 className="text-xl font-semibold text-slate-800 text-center">✏ Change Username</h2>

        <input
          type="text"
          value={newUserName}
          onChange={(e) => setNewUserName(e.target.value)}
          placeholder="New username"
          className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-sky-500"
        />

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

export default ChangeUsernameModal;
