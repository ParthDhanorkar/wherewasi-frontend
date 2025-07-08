// import { useEffect, useState, useRef } from "react";
// import { MapContainer, TileLayer, Marker, Popup, Circle, useMap } from "react-leaflet";
// import api from "../services/api";
// import { toast } from "react-toastify";
// import L from "leaflet";
// import "leaflet/dist/leaflet.css";
// import EditNoteModal from "./EditNoteModal";
// import Sidebar from "./Sidebar";
// import markerIcon2x from "leaflet/dist/images/marker-icon-2x.png";
// import markerIcon from "leaflet/dist/images/marker-icon.png";
// import markerShadow from "leaflet/dist/images/marker-shadow.png";

// // Fix default marker icons
// delete L.Icon.Default.prototype._getIconUrl;
// L.Icon.Default.mergeOptions({
//   iconRetinaUrl: markerIcon2x,
//   iconUrl: markerIcon,
//   shadowUrl: markerShadow,
// });

// // Custom iconsxa
// const redIcon = new L.Icon({
//   iconUrl: "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-red.png",
//   shadowUrl: markerShadow,
//   iconSize: [25, 41],
//   iconAnchor: [12, 41],
//   popupAnchor: [1, -34],
//   shadowSize: [41, 41],
// });

// const greenIcon = new L.Icon({
//   iconUrl: "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-green.png",
//   shadowUrl: markerShadow,
//   iconSize: [25, 41],
//   iconAnchor: [12, 41],
//   popupAnchor: [1, -34],
//   shadowSize: [41, 41],
// });

// // Component to fly to user location smoothly
// function FlyToLocation({ position }) {
//   const map = useMap();
//   useEffect(() => {
//     if (position) {
//       map.flyTo(position, 13, { duration: 1.5 });
//     }
//   }, [position, map]);
//   return null;
// }

// function MapView() {
//   const [notes, setNotes] = useState([]);
//   const [nearMeNotes, setNearMeNotes] = useState([]);
//   const [nearMeCircle, setNearMeCircle] = useState(null);
//   const [editingNote, setEditingNote] = useState(null);
//   const [userLocation, setUserLocation] = useState(null);
//   const watchIdRef = useRef(null); // for geolocation watch

//   useEffect(() => {
//     fetchNotes();
//     startWatchingLocation();
//     return () => stopWatchingLocation();
//   }, []);

//   // Fetch user's notes from backend
//   const fetchNotes = async () => {
//     try {
//       const res = await api.get("/notes/my-notes");
//       if (res.data.success) {
//         setNotes(res.data.notes);
//       } else {
//         toast.error("Failed to load notes");
//       }
//     } catch (error) {
//       console.error(error);
//       toast.error("Error loading notes");
//     }
//   };

//   // Delete note logic
//   const handleDeleteNote = async (noteId) => {
//     try {
//       const res = await api.delete(`/notes/delete/${noteId}`);
//       if (res.data.success) {
//         setNotes((prev) => prev.filter((n) => n._id !== noteId));
//         toast.success("Note deleted successfully");
//       } else {
//         toast.error("Failed to delete note");
//       }
//     } catch (error) {
//       console.error(error);
//       toast.error("Error deleting note");
//     }
//   };

//   // Filter notes by mood/date
//   const handleFilter = async (filters) => {
//     try {
//       let query = "";
//       if (filters.mood) query += `&mood=${filters.mood}`;
//       if (filters.startDate) query += `&startDate=${filters.startDate}`;
//       if (filters.endDate) query += `&endDate=${filters.endDate}`;

//       if (query) {
//         const res = await api.get(`/notes/filter?${query.slice(1)}`);
//         if (res.data.success) {
//           setNotes(res.data.notes);
//         } else {
//           toast.error("Failed to apply filters");
//         }
//       } else {
//         await fetchNotes();
//       }

//       if (!filters.nearMe) {
//         setNearMeNotes([]);
//         setNearMeCircle(null);
//       }
//     } catch (error) {
//       console.error(error);
//       toast.error("Error applying filters");
//     }
//   };

//   // Find notes near user location
//   const findNearby = async (distance = 5) => {
//     if (!navigator.geolocation) {
//       toast.error("Geolocation is not supported");
//       return;
//     }
//     return new Promise((resolve) => {
//       navigator.geolocation.getCurrentPosition(
//         async (position) => {
//           const { latitude, longitude } = position.coords;
//           try {
//             const res = await api.get(
//               `/notes/near-me?latitude=${latitude}&longitude=${longitude}&distance=${distance}`
//             );
//             if (res.data.success) {
//               setNearMeNotes(res.data.notes);
//               setNearMeCircle({ center: [latitude, longitude], radius: distance * 1000 });
//               toast.success("Nearby notes loaded!");
//             } else {
//               toast.error("Failed to load nearby notes");
//             }
//           } catch (error) {
//             console.error(error);
//             toast.error("Error fetching nearby notes");
//           }
//           resolve();
//         },
//         (error) => {
//           console.error(error);
//           toast.error("Failed to get location: " + error.message);
//           resolve();
//         },
//         { enableHighAccuracy: true, timeout: 10000 }
//       );
//     });
//   };

//   // Start watching user location live
//   const startWatchingLocation = () => {
//     if (navigator.geolocation) {
//       watchIdRef.current = navigator.geolocation.watchPosition(
//         (pos) => setUserLocation([pos.coords.latitude, pos.coords.longitude]),
//         (err) => console.error(err),
//         { enableHighAccuracy: true }
//       );
//     }
//   };

//   // Stop watching on unmount
//   const stopWatchingLocation = () => {
//     if (watchIdRef.current && navigator.geolocation) {
//       navigator.geolocation.clearWatch(watchIdRef.current);
//     }
//   };

//   // Handle edit note success
//   const handleNoteUpdated = (updatedNote) => {
//     setNotes((prev) => prev.map((n) => (n._id === updatedNote._id ? updatedNote : n)));
//     toast.success("Note updated successfully");
//   };

//   return (
//     <div className="flex flex-1">
//       <div className="flex-1">
//         <MapContainer center={userLocation || [19.8762, 75.3433]} zoom={userLocation ? 13 : 6} className="w-full h-full">
//           <TileLayer
//             attribution='&copy; OpenStreetMap contributors'
//             url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
//           />
//           <FlyToLocation position={userLocation} />

//           {/* User's notes */}
//           {notes.map((note) => (
//             <Marker key={note._id} position={[note.location.latitude, note.location.longitude]}>
//               <Popup minWidth={260}>
//                 <div className="text-sm space-y-1">
//                   <h3 className="font-semibold">{note.title}</h3>
//                   <p>{note.text?.substring(0, 60)}...</p>
//                   <p>Mood: <span className="font-medium">{note.mood}</span></p>
//                   {note.imageBase64 && (
//                     <img src={note.imageBase64} alt={note.title} className="mt-1 w-52 h-40 object-cover rounded" />
//                   )}
//                   <div className="flex justify-between mt-2">
//                     <button
//                       onClick={() => setEditingNote(note)}
//                       className="text-blue-600 hover:underline text-xs"
//                     >
//                       ✏ Edit
//                     </button>
//                     <button
//                       onClick={() => handleDeleteNote(note._id)}
//                       className="text-red-600 hover:underline text-xs"
//                     >
//                       🗑 Delete
//                     </button>
//                   </div>
//                   <p className="text-xs text-gray-400">{new Date(note.createdAt).toLocaleDateString()}</p>
//                 </div>
//               </Popup>
//             </Marker>
//           ))}

//           {/* Near me notes */}
//           {nearMeNotes.map((note) => (
//             <Marker
//               key={`near-${note._id}`}
//               position={[note.location.latitude, note.location.longitude]}
//               icon={redIcon}
//             >
//               <Popup minWidth={260}>
//                 <div className="text-sm space-y-1">
//                   <h3 className="font-semibold">{note.title}</h3>
//                   <p>{note.text?.substring(0, 60)}...</p>
//                   <p>Mood: <span className="font-medium">{note.mood}</span></p>
//                   {note.imageBase64 && (
//                     <img src={note.imageBase64} alt={note.title} className="mt-1 w-52 h-40 object-cover rounded" />
//                   )}
//                   <p className="text-xs text-gray-400">{new Date(note.createdAt).toLocaleDateString()}</p>
//                 </div>
//               </Popup>
//             </Marker>
//           ))}

//           {/* Circle for near me */}
//           {nearMeCircle && (
//             <Circle
//               center={nearMeCircle.center}
//               radius={nearMeCircle.radius}
//               pathOptions={{ fillColor: "red", color: "red", fillOpacity: 0.1 }}
//             />
//           )}

//           {/* User live location */}
//           {userLocation && (
//             <Marker position={userLocation} icon={greenIcon}>
//               <Popup>📍 You are here</Popup>
//             </Marker>
//           )}
//         </MapContainer>

//         {/* Edit modal */}
//         {editingNote && (
//           <EditNoteModal
//             note={editingNote}
//             onClose={() => setEditingNote(null)}
//             onUpdated={handleNoteUpdated}
//           />
//         )}
//       </div>

//       {/* Sidebar */}
//       <Sidebar onFilter={handleFilter} onFindNearby={findNearby} />
//     </div>
//   );
// }

// export default MapView;



import { useEffect, useState, useRef } from "react";
import { MapContainer, TileLayer, Marker, Popup, Circle, useMap } from "react-leaflet";
import api from "../services/api";
import { toast } from "react-toastify";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import EditNoteModal from "./EditNoteModal";
import Sidebar from "./Sidebar";
import markerIcon2x from "leaflet/dist/images/marker-icon-2x.png";
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";





// Fix default marker icons
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: markerIcon2x,
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
});

// Custom icons
const redIcon = new L.Icon({
  iconUrl: "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-red.png",
  shadowUrl: markerShadow,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

const greenIcon = new L.Icon({
  iconUrl: "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-green.png",
  shadowUrl: markerShadow,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

// Fly to user location smoothly
function FlyToLocation({ position }) {
  const map = useMap();
  useEffect(() => {
    if (position) {
      map.flyTo(position, 13, { duration: 1.5 });
    }
  }, [position, map]);
  return null;
}

function MapView() {
  const [notes, setNotes] = useState([]);
  const [nearMeNotes, setNearMeNotes] = useState([]);
  const [nearMeCircle, setNearMeCircle] = useState(null);
  const [editingNote, setEditingNote] = useState(null);
  const [userLocation, setUserLocation] = useState(null);
  const watchIdRef = useRef(null);

  useEffect(() => {
    fetchNotes();
    startWatchingLocation();
    return () => stopWatchingLocation();
  }, []);

  const fetchNotes = async () => {
    try {
      const res = await api.get("/notes/my-notes");
      if (res.data.success) {
        setNotes(res.data.notes);
      } else {
        toast.error("Failed to load notes");
      }
    } catch (error) {
      console.error(error);
      toast.error("Error loading notes");
    }
  };

  const handleDeleteNote = async (noteId) => {
    try {
      const res = await api.delete(`/notes/delete/${noteId}`);
      if (res.data.success) {
        setNotes((prev) => prev.filter((n) => n._id !== noteId));
        toast.success("Note deleted successfully");
      } else {
        toast.error("Failed to delete note");
      }
    } catch (error) {
      console.error(error);
      toast.error("Error deleting note");
    }
  };

  const handleFilter = async (filters) => {
    try {
      let query = "";
      if (filters.mood) query += `&mood=${filters.mood}`;
      if (filters.startDate) query += `&startDate=${filters.startDate}`;
      if (filters.endDate) query += `&endDate=${filters.endDate}`;

      if (query) {
        const res = await api.get(`/notes/filter?${query.slice(1)}`);
        if (res.data.success) {
          setNotes(res.data.notes);
        } else {
          toast.error("Failed to apply filters");
        }
      } else {
        await fetchNotes();
      }

      if (!filters.nearMe) {
        setNearMeNotes([]);
        setNearMeCircle(null);
      }
    } catch (error) {
      console.error(error);
      toast.error("Error applying filters");
    }
  };

  const findNearby = async (distance = 5) => {
    if (!navigator.geolocation) {
      toast.error("Geolocation is not supported");
      return;
    }
    return new Promise((resolve) => {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;
          try {
            const res = await api.get(
              `/notes/near-me?latitude=${latitude}&longitude=${longitude}&distance=${distance}`
            );
            if (res.data.success) {
              setNearMeNotes(res.data.notes);
              setNearMeCircle({ center: [latitude, longitude], radius: distance * 1000 });
              toast.success("Nearby notes loaded!");
            } else {
              toast.error("Failed to load nearby notes");
            }
          } catch (error) {
            console.error(error);
            toast.error("Error fetching nearby notes");
          }
          resolve();
        },
        (error) => {
          console.error(error);
          toast.error("Failed to get location: " + error.message);
          resolve();
        },
        { enableHighAccuracy: true, timeout: 10000 }
      );
    });
  };

  const startWatchingLocation = () => {
    if (navigator.geolocation) {
      watchIdRef.current = navigator.geolocation.watchPosition(
        (pos) => setUserLocation([pos.coords.latitude, pos.coords.longitude]),
        (err) => console.error(err),
        { enableHighAccuracy: true }
      );
    }
  };

  const stopWatchingLocation = () => {
    if (watchIdRef.current && navigator.geolocation) {
      navigator.geolocation.clearWatch(watchIdRef.current);
    }
  };

  const handleNoteUpdated = (updatedNote) => {
    setNotes((prev) => prev.map((n) => (n._id === updatedNote._id ? updatedNote : n)));
    // toast.success("Note updated successfully");
  };

  return (
    <div className="flex flex-col md:flex-row flex-1 overflow-hidden">
    {/* Map */}
    <div className="w-full md:flex-1 h-[70vh] md:h-full">
      <MapContainer
        center={userLocation || [19.8762, 75.3433]}
        zoom={userLocation ? 13 : 6}
        className="w-full h-full"
      >
        <TileLayer
          attribution='&copy; OpenStreetMap contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <FlyToLocation position={userLocation} />
  
        {/* User's notes */}
        {notes.map((note) => (
  <Marker key={note._id} position={[note.location.latitude, note.location.longitude]}>
    <Popup minWidth={260}>
      <div className="p-3 text-xs text-slate-800 space-y-2">
        <h3 className="font-semibold text-sm truncate">{note.title}</h3>
        <p className="text-gray-700">{note.text?.substring(0, 60)}...</p>
        <p>Mood: <span className="font-medium">{note.mood}</span></p>

        {note.imageBase64 && (
          <img
            src={note.imageBase64}
            alt={note.title}
            className="mt-1 w-full max-w-[200px] h-32 object-cover rounded-lg border border-gray-300"
          />
        )}

        <div className="flex justify-between mt-2 gap-2">
          <button
            onClick={() => setEditingNote(note)}
            className="px-2 py-1 border border-blue-500 text-blue-600 rounded hover:bg-blue-50 transition"
          >
            ✏ Edit
          </button>
          <button
            onClick={() => handleDeleteNote(note._id)}
            className="px-2 py-1 border border-red-500 text-red-600 rounded hover:bg-red-50 transition"
          >
            🗑 Delete
          </button>
        </div>
        <p className="text-[10px] text-gray-500 text-right">
          {new Date(note.createdAt).toLocaleDateString()}
        </p>
      </div>
    </Popup>
  </Marker>
))}

  
        {/* Near me notes */}
        {nearMeNotes.map((note) => (
          <Marker key={`near-${note._id}`} position={[note.location.latitude, note.location.longitude]} icon={redIcon}>
            <Popup minWidth={260}>
              <div className="text-sm space-y-1">
                <h3 className="font-semibold">{note.title}</h3>
                <p>{note.text?.substring(0, 60)}...</p>
                <p>Mood: <span className="font-medium">{note.mood}</span></p>
                {note.imageBase64 && (
                  <img src={note.imageBase64} alt={note.title} className="mt-1 w-52 h-40 object-cover rounded" />
                )}
                <p className="text-xs text-gray-400">{new Date(note.createdAt).toLocaleDateString()}</p>
              </div>
            </Popup>
          </Marker>
        ))}
  
        {/* Circle */}
        {nearMeCircle && (
          <Circle center={nearMeCircle.center} radius={nearMeCircle.radius} pathOptions={{ fillColor: "red", color: "red", fillOpacity: 0.1 }} />
        )}
  
        {/* User location */}
        {userLocation && (
          <Marker position={userLocation} icon={greenIcon}>
            <Popup>📍 You are here</Popup>
          </Marker>
        )}
      </MapContainer>
  
      {/* Edit modal */}
      {editingNote && (
        <EditNoteModal
          note={editingNote}
          onClose={() => setEditingNote(null)}
          onUpdated={handleNoteUpdated}
        />
      )}
    </div>
  
    {/* Sidebar */}
    <div className="w-full md:w-80 overflow-y-auto md:h-full">
      <Sidebar onFilter={handleFilter} onFindNearby={findNearby} />
    </div>
  </div>
  
  
  );
}

export default MapView;
