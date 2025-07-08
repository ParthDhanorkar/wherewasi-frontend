// import { useEffect, useState } from "react";
// import api from "../services/api";
// import { toast } from "react-toastify";

// function MyNotesList() {
//   const [notes, setNotes] = useState([]);

//   useEffect(() => {
//     fetchMyNotes();
//   }, []);

//   const fetchMyNotes = async () => {
//     try {
//       const res = await api.get("/notes/my-notes");
//       if (res.data.success) {
//         setNotes(res.data.notes);
//       } else {
//         toast.error(res.data.message || "Failed to load notes");
//       }
//     } catch (error) {
//       console.error(error);
//       toast.error(error.response?.data?.message || "Error loading notes");
//     }
//   };

//   return (
//     <div className="p-4 bg-gray-50 min-h-screen">
//       {notes.length === 0 ? (
//         <p className="text-center text-gray-500">No notes found</p>
//       ) : (
//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
//           {notes.map((note) => (
//             <div
//               key={note._id}
//               className="bg-white rounded shadow p-4 hover:shadow-md transition"
//             >
//               <h3 className="font-semibold text-lg mb-1">{note.title}</h3>
//               <p className="text-gray-600 mb-2">
//                 {note.text?.substring(0, 60)}...
//               </p>
//               <p className="text-sm mb-1">
//                 Mood: <span className="font-medium">{note.mood}</span>
//               </p>
//               <p className="text-xs text-gray-400 mb-2">
//                 Date: {new Date(note.createdAt).toLocaleDateString()}
//               </p>
//               {note.imageBase64 && (
//                 <img
//                   src={note.imageBase64}
//                   alt={note.title}
//                   className="w-full h-50 object-cover rounded"
//                 />
//               )}
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// }

// export default MyNotesList;


import { useEffect, useState } from "react";
import api from "../services/api";
import { toast } from "react-toastify";

function MyNotesList() {
  const [notes, setNotes] = useState([]);

  useEffect(() => {
    fetchMyNotes();
  }, []);

  const fetchMyNotes = async () => {
    try {
      const res = await api.get("/notes/my-notes");
      if (res.data.success) {
        setNotes(res.data.notes);
      } else {
        toast.error(res.data.message || "Failed to load notes");
      }
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message || "Error loading notes");
    }
  };

  return (
    <div className="p-4 bg-gradient-to-b w-full from-cyan-50 to-blue-50 min-h-screen">
      {notes.length === 0 ? (
        <p className="text-center text-gray-500">No notes found</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {notes.map((note) => (
            <div
              key={note._id}
              className="bg-white border border-gray-200 rounded-xl shadow hover:shadow-lg transition p-4 flex flex-col"
            >
              <h3 className="font-semibold text-lg mb-1 text-slate-800">{note.title}</h3>
              <p className="text-gray-600 mb-2">{note.text?.substring(0, 60)}...</p>
              <div className="text-sm mb-1 text-gray-700">
                Mood: <span className="font-medium">{note.mood}</span>
              </div>
              <div className="text-xs text-gray-400 mb-2">
                Date: {new Date(note.createdAt).toLocaleDateString()}
              </div>
              {note.imageBase64 && (
                <img
                  src={note.imageBase64}
                  alt={note.title}
                  className="w-full h-48 object-cover rounded-lg mt-auto"
                />
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default MyNotesList;
