// import { useState } from "react";
// import api from "../services/api";
// import { toast } from "react-toastify";

// function EditNoteModal({ note, onClose, onUpdated }) {
//   const [formData, setFormData] = useState({
//     title: note.title || "",
//     text: note.text || "",
//     mood: note.mood || "",
//     latitude: note.location?.latitude || "",
//     longitude: note.location?.longitude || "",
//     image: null
//   });

//   const [imagePreview, setImagePreview] = useState(note.imageBase64 || null);

//   const handleChange = (e) => {
//     const { name, value, files } = e.target;
//     if (files) {
//       setFormData({ ...formData, [name]: files[0] });
//       setImagePreview(URL.createObjectURL(files[0]));
//     } else {
//       setFormData({ ...formData, [name]: value });
//     }
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const data = new FormData();
//       data.append("title", formData.title);
//       data.append("text", formData.text);
//       data.append("mood", formData.mood);
//       data.append("latitude", formData.latitude);
//       data.append("longitude", formData.longitude);
//       if (formData.image) {
//         data.append("image", formData.image);
//       }

//       const res = await api.put(`/notes/update/${note._id}`, data, {
//         headers: { "Content-Type": "multipart/form-data" }
//       });

//       if (res.data.success) {
//         toast.success("Note updated!");
//         onUpdated(res.data.note); // callback to update in parent
//         onClose();
//       } else {
//         toast.error(res.data.message);
//       }
//     } catch (error) {
//       console.error(error);
//       toast.error(error.response?.data?.message || "Failed to update note");
//     }
//   };

//   return (
//     <div className="fixed inset-0 bg-black/20 backdrop-blur-sm flex items-center justify-center z-[400]">
//       <div className="bg-white p-6 rounded shadow w-full max-w-lg">
//         <h2 className="text-xl font-semibold mb-4 text-center">Edit Note</h2>
//         <form onSubmit={handleSubmit} className="space-y-3">
//           <input
//             type="text"
//             name="title"
//             value={formData.title}
//             onChange={handleChange}
//             placeholder="Title"
//             className="w-full p-2 border rounded"
//           />
//           <textarea
//             name="text"
//             value={formData.text}
//             onChange={handleChange}
//             placeholder="Note text..."
//             className="w-full p-2 border rounded resize-none"
//             rows="3"
//           ></textarea>
//           <select
//             name="mood"
//             value={formData.mood}
//             onChange={handleChange}
//             className="w-full p-2 border rounded"
//           >
//             <option value="">Select Mood</option>
//             <option value="Happy">😊 Happy</option>
//             <option value="Sad">😔 Sad</option>
//             <option value="Excited">😎 Excited</option>
//           </select>

//           <label className="block">
//             <span className="inline-block mb-1 text-gray-600">Change Image (optional)</span>
//             <input
//               type="file"
//               name="image"
//               accept="image/*"
//               onChange={handleChange}
//               className="hidden"
//               id="editImage"
//             />
//             <label
//               htmlFor="editImage"
//               className="cursor-pointer inline-block border border-gray-400 px-4 py-2 rounded hover:bg-gray-100"
//             >
//               📷 Choose Image
//             </label>
//           </label>

//           {imagePreview && (
//             <img src={imagePreview} alt="Preview" className="w-24 h-24 object-cover rounded" />
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
//               Update Note
//             </button>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// }

// export default EditNoteModal;



import { useState } from "react";
import api from "../services/api";
import { toast } from "react-toastify";

function EditNoteModal({ note, onClose, onUpdated }) {
  const [formData, setFormData] = useState({
    title: note.title || "",
    text: note.text || "",
    mood: note.mood || "",
    latitude: note.location?.latitude || "",
    longitude: note.location?.longitude || "",
    image: null
  });

  const [imagePreview, setImagePreview] = useState(note.imageBase64 || null);
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

      const res = await api.put(`/notes/update/${note._id}`, data, {
        headers: { "Content-Type": "multipart/form-data" }
      });

      if (res.data.success) {
        toast.success("Note updated!");
        onUpdated(res.data.note);
        onClose();
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message || "Failed to update note");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/20 backdrop-blur-sm flex items-center justify-center z-[500] px-4">
      <div className="bg-gradient-to-br from-cyan-50 to-blue-50 w-full max-w-md rounded-2xl shadow-xl p-6 space-y-4">
        <h2 className="text-xl font-semibold text-slate-800 text-center">✏ Edit Note</h2>
        <form onSubmit={handleSubmit} className="space-y-3">
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="Title"
            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-sky-500"
          />
          <textarea
            name="text"
            value={formData.text}
            onChange={handleChange}
            placeholder="Note text..."
            rows="3"
            className="w-full border border-gray-300 rounded-lg px-3 py-2 resize-none focus:outline-none focus:ring-2 focus:ring-sky-500"
          ></textarea>
          <select
            name="mood"
            value={formData.mood}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-sky-500"
          >
            <option value="">Select Mood</option>
            <option value="Happy">😊 Happy</option>
            <option value="Sad">😔 Sad</option>
            <option value="Excited">😎 Excited</option>
          </select>

          <div>
            <label className="block text-gray-600 mb-1">Change Image (optional)</label>
            <input
              type="file"
              name="image"
              accept="image/*"
              id="editImage"
              onChange={handleChange}
              className="hidden"
            />
            <label
              htmlFor="editImage"
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
              {loading ? "Updating..." : "Update Note"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default EditNoteModal;
