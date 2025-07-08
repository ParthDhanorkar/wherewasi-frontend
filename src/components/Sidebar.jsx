// import { useEffect, useState } from "react";
// import api from "../services/api";
// import { toast } from "react-toastify";

// function Sidebar({ onFilter, onFindNearby }) {
//   const [nearMe, setNearMe] = useState(false);
//   const [loadingNearMe, setLoadingNearMe] = useState(false);
//   const [filters, setFilters] = useState({
//     mood: "",
//     startDate: "",
//     endDate: "",
//     distance: "5",
//   });
//   const [latestNotes, setLatestNotes] = useState([]);

//   useEffect(() => {
//     fetchLatestNotes();
//   }, []);

//   const fetchLatestNotes = async () => {
//     try {
//       const res = await api.get("/notes/my-notes");
//       if (res.data.success) {
//         setLatestNotes(res.data.notes.slice(0, 5));
//       } else {
//         toast.error("Failed to load latest notes");
//       }
//     } catch (error) {
//       console.error(error);
//       toast.error("Error loading latest notes");
//     }
//   };

//   const handleChange = (e) => {
//     const newFilters = { ...filters, [e.target.name]: e.target.value };
//     setFilters(newFilters);
//     onFilter({ ...newFilters, nearMe });
//   };

//   const toggleNearMe = () => {
//     const newNearMe = !nearMe;
//     setNearMe(newNearMe);
//     onFilter({ ...filters, nearMe: newNearMe });
//     // Note: we only toggle flag here; real backend call happens only on button click
//   };

//   const handleFindNearbyClick = async () => {
//     if (loadingNearMe) return;
//     setLoadingNearMe(true);  // instantly show spinner & disable
//     try {
//       await onFindNearby(filters.distance);
//     } catch (error) {
//       console.error(error);
//       toast.error("Error finding nearby notes");
//     }
//     setLoadingNearMe(false);
//   };

//   return (
//     <div className="w-80 bg-white border-l flex flex-col p-4 space-y-5 shadow-lg">
//       <h2 className="text-xl font-bold mb-2 text-gray-800">📍 Filters</h2>

//       <div className="space-y-2">
//         <label className="text-gray-600 text-sm">Mood</label>
//         <select
//           name="mood"
//           value={filters.mood}
//           onChange={handleChange}
//           className="p-2 border rounded w-full focus:ring-2 focus:ring-blue-400"
//         >
//           <option value="">All moods</option>
//           <option value="Happy">😊 Happy</option>
//           <option value="Sad">😢 Sad</option>
//           <option value="Excited">🎉 Excited</option>
//         </select>
//       </div>

//       <div className="space-y-2">
//         <label className="text-gray-600 text-sm">Start Date</label>
//         <input
//           type="date"
//           name="startDate"
//           value={filters.startDate}
//           onChange={handleChange}
//           className="p-2 border rounded w-full focus:ring-2 focus:ring-blue-400"
//         />
//       </div>

//       <div className="space-y-2">
//         <label className="text-gray-600 text-sm">End Date</label>
//         <input
//           type="date"
//           name="endDate"
//           value={filters.endDate}
//           onChange={handleChange}
//           className="p-2 border rounded w-full focus:ring-2 focus:ring-blue-400"
//         />
//       </div>

//       <div className="flex items-center justify-between mt-2">
//         <span className="text-gray-700 font-medium">Near me</span>
//         <button
//           onClick={toggleNearMe}
//           className={`w-10 h-5 rounded-full p-0.5 flex items-center transition-colors duration-300 ${
//             nearMe ? "bg-blue-600" : "bg-gray-300"
//           }`}
//         >
//           <div
//             className={`bg-white w-4 h-4 rounded-full shadow transform transition-transform duration-300 ${
//               nearMe ? "translate-x-5" : ""
//             }`}
//           ></div>
//         </button>
//       </div>

//       {nearMe && (
//         <>
//           <div className="space-y-2">
//             <label className="text-gray-600 text-sm">Distance (km)</label>
//             <input
//               type="number"
//               name="distance"
//               min="1"
//               value={filters.distance}
//               onChange={handleChange}
//               className="p-2 border rounded w-full focus:ring-2 focus:ring-blue-400"
//             />
//           </div>

//           <button
//             onClick={handleFindNearbyClick}
//             disabled={loadingNearMe}
//             className={`mt-2 w-full py-2 rounded font-medium flex items-center justify-center ${
//               loadingNearMe ? "bg-gray-400 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700 text-white"
//             } transition`}
//           >
//             {loadingNearMe ? (
//               <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
//             ) : (
//               "🔍 Find Nearby Notes"
//             )}
//           </button>
//         </>
//       )}

//       <h2 className="text-xl font-bold mt-4 text-gray-800">📝 Latest Notes</h2>
//       <div className="space-y-2 overflow-auto max-h-60">
//         {latestNotes.map((note) => (
//           <div
//             key={note._id}
//             className="border p-2 rounded hover:bg-gray-50 cursor-pointer transition"
//           >
//             <div className="font-medium text-gray-800 truncate">{note.title}</div>
//             <div className="text-gray-500 text-xs">
//               {new Date(note.createdAt).toLocaleDateString()}
//             </div>
//           </div>
//         ))}
//         {latestNotes.length === 0 && (
//           <div className="text-gray-500 text-sm">No notes yet</div>
//         )}
//       </div>
//     </div>
//   );
// }

// export default Sidebar;



import { useEffect, useState } from "react";
import api from "../services/api";
import { toast } from "react-toastify";

function Sidebar({ onFilter, onFindNearby }) {
  const [nearMe, setNearMe] = useState(false);
  const [loadingNearMe, setLoadingNearMe] = useState(false);
  const [filters, setFilters] = useState({
    mood: "",
    startDate: "",
    endDate: "",
    distance: "5",
  });
  const [latestNotes, setLatestNotes] = useState([]);

  useEffect(() => {
    fetchLatestNotes();
  }, []);

  const fetchLatestNotes = async () => {
    try {
      const res = await api.get("/notes/my-notes");
      if (res.data.success) {
        setLatestNotes(res.data.notes.slice(0, 5));
      } else {
        toast.error("Failed to load latest notes");
      }
    } catch (error) {
      console.error(error);
      toast.error("Error loading latest notes");
    }
  };

  const handleChange = (e) => {
    const newFilters = { ...filters, [e.target.name]: e.target.value };
    setFilters(newFilters);
    onFilter({ ...newFilters, nearMe });
  };

  const toggleNearMe = () => {
    const newNearMe = !nearMe;
    setNearMe(newNearMe);
    onFilter({ ...filters, nearMe: newNearMe });
  };

  const handleFindNearbyClick = async () => {
    if (loadingNearMe) return;
    setLoadingNearMe(true);
    try {
      await onFindNearby(filters.distance);
    } catch (error) {
      console.error(error);
      toast.error("Error finding nearby notes");
    }
    setLoadingNearMe(false);
  };

  return (
    <div className="w-full md:w-80 h-full bg-gradient-to-b from-cyan-50 to-blue-50 border-l flex flex-col p-4 space-y-5 shadow-inner">
      <h2 className="text-xl font-semibold text-slate-800">📍 Filters</h2>

      <div className="space-y-1">
        <label className="text-gray-600 text-sm">Mood</label>
        <select
          name="mood"
          value={filters.mood}
          onChange={handleChange}
          className="p-2 border border-gray-300 rounded-lg w-full focus:ring-2 focus:ring-sky-400"
        >
          <option value="">All moods</option>
          <option value="Happy">😊 Happy</option>
          <option value="Sad">😢 Sad</option>
          <option value="Excited">🎉 Excited</option>
        </select>
      </div>

      <div className="space-y-1">
        <label className="text-gray-600 text-sm">Start Date</label>
        <input
          type="date"
          name="startDate"
          value={filters.startDate}
          onChange={handleChange}
          className="p-2 border border-gray-300 rounded-lg w-full focus:ring-2 focus:ring-sky-400"
        />
      </div>

      <div className="space-y-1">
        <label className="text-gray-600 text-sm">End Date</label>
        <input
          type="date"
          name="endDate"
          value={filters.endDate}
          onChange={handleChange}
          className="p-2 border border-gray-300 rounded-lg w-full focus:ring-2 focus:ring-sky-400"
        />
      </div>

      <div className="flex items-center justify-between mt-2">
        <span className="text-gray-700 font-medium">Near me</span>
        <button
          onClick={toggleNearMe}
          className={`w-10 h-5 rounded-full p-0.5 flex items-center transition-colors duration-300 ${
            nearMe ? "bg-sky-500" : "bg-gray-300"
          }`}
        >
          <div
            className={`bg-white w-4 h-4 rounded-full shadow transform transition-transform duration-300 ${
              nearMe ? "translate-x-5" : ""
            }`}
          ></div>
        </button>
      </div>

      {nearMe && (
        <>
          <div className="space-y-1">
            <label className="text-gray-600 text-sm">Distance (km)</label>
            <input
              type="number"
              name="distance"
              min="1"
              value={filters.distance}
              onChange={handleChange}
              className="p-2 border border-gray-300 rounded-lg w-full focus:ring-2 focus:ring-sky-400"
            />
          </div>

          <button
            onClick={handleFindNearbyClick}
            disabled={loadingNearMe}
            className={`mt-2 w-full py-2 rounded-lg font-medium flex items-center justify-center transition ${
              loadingNearMe
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-sky-500 hover:bg-sky-600 text-white"
            }`}
          >
            {loadingNearMe ? (
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
            ) : (
              "🔍 Find Nearby Notes"
            )}
          </button>
        </>
      )}

      <h2 className="text-xl font-semibold text-slate-800 mt-4">📝 Latest Notes</h2>
      <div className="space-y-2 overflow-auto max-h-60">
        {latestNotes.map((note) => (
          <div
            key={note._id}
            className="border border-gray-200 p-2 rounded-lg hover:bg-sky-50 cursor-pointer transition"
          >
            <div className="font-medium text-gray-800 truncate">{note.title}</div>
            <div className="text-gray-500 text-xs">
              {new Date(note.createdAt).toLocaleDateString()}
            </div>
          </div>
        ))}
        {latestNotes.length === 0 && (
          <div className="text-gray-500 text-sm">No notes yet</div>
        )}
      </div>
    </div>
  );
}

export default Sidebar;
