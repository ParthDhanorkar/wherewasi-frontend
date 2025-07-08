// // src/components/AddNoteModal.js
// import { useState } from "react";
// import api from "../services/api"; // our axios instance
// import { toast } from "react-toastify";

// function AddNoteModal({ onClose }) {
//   const [formData, setFormData] = useState({
//     title: "",
//     text: "",
//     mood: "",
//     image: null,
//     latitude: "",
//     longitude: ""
//   });

//   const [imagePreview, setImagePreview] = useState(null);

//   const handleChange = (e) => {
//     const { name, value, files } = e.target;

//     if (files) {
//       setFormData({ ...formData, [name]: files[0] });
//       setImagePreview(URL.createObjectURL(files[0]));
//     } else {
//       setFormData({ ...formData, [name]: value });
//     }
//   };

//   const handleUseCurrentLocation = () => {
//     if (!navigator.geolocation) {
//       toast.error("Geolocation not supported");
//       return;
//     }

//     navigator.geolocation.getCurrentPosition(
//       (position) => {
//         setFormData((prev) => ({
//           ...prev,
//           latitude: position.coords.latitude.toFixed(6),
//           longitude: position.coords.longitude.toFixed(6)
//         }));
//         toast.success("Location fetched");
//       },
//       (error) => {
//         console.error(error);
//         toast.error("Unable to fetch location");
//       }
//     );
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     try {
//       // Use FormData to send image as multipart/form-data
//       const data = new FormData();
//       data.append("title", formData.title);
//       data.append("text", formData.text);
//       data.append("mood", formData.mood);
//       data.append("latitude", formData.latitude);
//       data.append("longitude", formData.longitude);
//       if (formData.image) {
//         data.append("image", formData.image);
//       }

//       const res = await api.post("/notes/add", data, {
//         headers: { "Content-Type": "multipart/form-data" }
//       });

//       if (res.data.success) {
//         toast.success("Note added successfully!");
//         onClose();
//       } else {
//         toast.error(res.data.message);
//       }
//     } catch (error) {
//       console.error(error);
//       toast.error(error.response?.data?.message || "Failed to add note");
//     }
//   };

//   return (
//     <div className="fixed inset-0 bg-black/10 backdrop-blur-sm flex items-center justify-center z-400">
//       <div className="bg-white p-6 rounded shadow w-full max-w-lg">
//         <h2 className="text-xl font-semibold mb-4 text-center">Add New Note</h2>
//         <form onSubmit={handleSubmit} className="space-y-3">

//           <input
//             type="text"
//             name="title"
//             value={formData.title}
//             onChange={handleChange}
//             placeholder="Title"
//             className="w-full p-2 border rounded"
//             required
//           />

//           <textarea
//             name="text"
//             value={formData.text}
//             onChange={handleChange}
//             placeholder="Write your note..."
//             className="w-full p-2 border rounded resize-none"
//             rows="3"
//           ></textarea>

//           <select
//             name="mood"
//             value={formData.mood}
//             onChange={handleChange}
//             className="w-full p-2 border rounded"
//             required
//           >
//             <option value="">Select Mood</option>
//             <option value="Happy">😊 Happy</option>
//             <option value="Sad">😔 Sad</option>
//             <option value="Excited">😎 Excited</option>
//           </select>

//           {/* Choose Image button */}
//           <label className="block">
//             <span className="inline-block mb-1 text-gray-600">Image (optional)</span>
//             <input
//               type="file"
//               name="image"
//               accept="image/*"
//               onChange={handleChange}
//               className="hidden"
//               id="chooseImage"
//             />
//             <label
//               htmlFor="chooseImage"
//               className="cursor-pointer inline-block border border-gray-400 px-4 py-2 rounded hover:bg-gray-100"
//             >
//               📷 Choose Image
//             </label>
//           </label>

//           {/* Show preview */}
//           {imagePreview && (
//             <img src={imagePreview} alt="Preview" className="w-20 h-20 rounded object-cover" />
//           )}

//           <div className="flex gap-2">
//             <input
//               type="number"
//               name="latitude"
//               value={formData.latitude}
//               onChange={handleChange}
//               placeholder="Latitude"
//               className="w-1/2 p-2 border rounded"
//             />
//             <input
//               type="number"
//               name="longitude"
//               value={formData.longitude}
//               onChange={handleChange}
//               placeholder="Longitude"
//               className="w-1/2 p-2 border rounded"
//             />
//           </div>

//           <button
//             type="button"
//             onClick={handleUseCurrentLocation}
//             className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 w-full"
//           >
//             📍 Use Current Location
//           </button>

//           <div className="flex justify-end gap-2 pt-2">
//             <button
//               type="button"
//               onClick={onClose}
//               className="bg-gray-300 px-4 py-2 rounded hover:bg-gray-400"
//             >
//               Cancel
//             </button>
//             <button
//               type="submit"
//               className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
//             >
//               Add Note
//             </button>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// }

// export default AddNoteModal;



import { useState } from "react";
import api from "../services/api";
import { toast } from "react-toastify";

function AddNoteModal({ onClose }) {
  const [formData, setFormData] = useState({
    title: "",
    text: "",
    mood: "",
    image: null,
    latitude: "",
    longitude: ""
  });

  const [imagePreview, setImagePreview] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (files) {
      setFormData({ ...formData, [name]: files[0] });
      setImagePreview(URL.createObjectURL(files[0]));
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleUseCurrentLocation = () => {
    if (!navigator.geolocation) {
      toast.error("Geolocation not supported");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        setFormData((prev) => ({
          ...prev,
          latitude: position.coords.latitude.toFixed(6),
          longitude: position.coords.longitude.toFixed(6)
        }));
        toast.success("Location fetched");
      },
      (error) => {
        console.error(error);
        toast.error("Unable to fetch location");
      }
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const data = new FormData();
      data.append("title", formData.title);
      data.append("text", formData.text);
      data.append("mood", formData.mood);
      data.append("latitude", formData.latitude);
      data.append("longitude", formData.longitude);
      if (formData.image) {
        data.append("image", formData.image);
      }

      const res = await api.post("/notes/add", data, {
        headers: { "Content-Type": "multipart/form-data" }
      });

      if (res.data.success) {
        toast.success("Note added successfully!");
        onClose();
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message || "Failed to add note");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/20 backdrop-blur-sm flex items-center justify-center z-[500] px-4">
      <div className="bg-gradient-to-br from-cyan-50 to-blue-50 w-full max-w-md rounded-2xl shadow-xl p-6 space-y-4">
        <h2 className="text-xl font-semibold text-slate-800 text-center">📝 Add New Note</h2>
        <form onSubmit={handleSubmit} className="space-y-3">
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="Title"
            required
            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-sky-500"
          />

          <textarea
            name="text"
            value={formData.text}
            onChange={handleChange}
            placeholder="Write your note..."
            rows="3"
            className="w-full border border-gray-300 rounded-lg px-3 py-2 resize-none focus:outline-none focus:ring-2 focus:ring-sky-500"
          ></textarea>

          <select
            name="mood"
            value={formData.mood}
            onChange={handleChange}
            required
            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-sky-500"
          >
            <option value="">Select Mood</option>
            <option value="Happy">😊 Happy</option>
            <option value="Sad">😔 Sad</option>
            <option value="Excited">😎 Excited</option>
          </select>

          <div>
            <label className="block text-gray-600 mb-1">Image (optional)</label>
            <input
              type="file"
              name="image"
              accept="image/*"
              id="chooseImage"
              onChange={handleChange}
              className="hidden"
            />
            <label
              htmlFor="chooseImage"
              className="inline-block cursor-pointer border border-gray-400 px-4 py-2 rounded-lg hover:bg-gray-100 transition"
            >
              📷 Choose Image
            </label>
            {imagePreview && (
              <div className="mt-2">
                <img src={imagePreview} alt="Preview" className="w-24 h-24 object-cover rounded-md border" />
              </div>
            )}
          </div>

          <div className="flex gap-2">
            <input
              type="number"
              name="latitude"
              value={formData.latitude}
              onChange={handleChange}
              placeholder="Latitude"
              className="w-1/2 border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-sky-500"
            />
            <input
              type="number"
              name="longitude"
              value={formData.longitude}
              onChange={handleChange}
              placeholder="Longitude"
              className="w-1/2 border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-sky-500"
            />
          </div>

          <button
            type="button"
            onClick={handleUseCurrentLocation}
            className="bg-green-600 text-white w-full px-4 py-2 rounded-lg hover:bg-green-700 transition"
          >
            📍 Use Current Location
          </button>

          <div className="flex justify-end gap-2 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border border-gray-400 rounded-lg text-gray-700 hover:bg-gray-100 transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="px-4 py-2 bg-sky-600 text-white rounded-lg hover:bg-sky-700 transition disabled:opacity-50"
            >
              {loading ? "Adding..." : "Add Note"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddNoteModal;
