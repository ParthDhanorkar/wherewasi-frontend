// // import { BrowserRouter, Routes, Route } from "react-router-dom";
// // import Login from "./pages/Login";
// // import Register from "./pages/Register";
// // import HomePage from "./pages/HomePage";
// // import ForgotPassword from "./pages/ForgotPassword";
// // import { ToastContainer } from "react-toastify";
// // import "react-toastify/dist/ReactToastify.css";

// // function App() {
// //   return (
// //     <BrowserRouter>
// //       <Routes>
// //         <Route path="/" element={<HomePage />} />
// //         <Route path="/login" element={<Login />} />
// //         <Route path="/register" element={<Register />} />
// //         <Route path="/forgot-password" element={<ForgotPassword />} />
// //         {/* Profile, add note etc routes can be added later */}
// //       </Routes>
// //       <ToastContainer />
// //     </BrowserRouter>
// //   );
// // }
// // export default App;


// // src/App.js
// import { BrowserRouter, Routes, Route } from "react-router-dom";
// import Login from "./pages/Login";
// import Register from "./pages/Register";
// import ForgotPassword from "./pages/ForgotPassword";
// import HomePage from "./pages/HomePage";
// import ProtectedRoute from "./components/ProtectedRoute";
// import { ToastContainer } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import MyNotesList from "./components/MyNotesList";
// import 'leaflet/dist/leaflet.css';
// import UpdatePassword from "./pages/UpdatePassword";
// import ChangeUsername from "./pages/ChangeUsername";

// function App() {
//   return (
//     <BrowserRouter>
//       <Routes>
//         {/* Protected routes */}
//         <Route 
//           path="/" 
//           element={
//             <ProtectedRoute>
//               <HomePage />
//             </ProtectedRoute>
//           } 
//         />
//          <Route
//           path="/my-notes"
//           element={
//             <ProtectedRoute>
//               <MyNotesList />
//             </ProtectedRoute>
//           }
//         />
//         <Route
//           path="/update-password"
//           element={
//             <ProtectedRoute>
//               <UpdatePassword />
//             </ProtectedRoute>
//           }
//         />
//         <Route
//           path="/change-username"
//           element={
//             <ProtectedRoute>
//               <ChangeUsername />
//             </ProtectedRoute>
//           }
//         />

//         {/* Public routes */}
//         <Route path="/login" element={<Login />} />
//         <Route path="/register" element={<Register />} />
//         <Route path="/forgot-password" element={<ForgotPassword />} />

//         {/* ⚠️ Add other routes here in future */}
//       </Routes>
//       <ToastContainer position="top-center" />
//     </BrowserRouter>
//   );
// }

// export default App;



// src/App.js
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ForgotPassword from "./pages/ForgotPassword";
import HomePage from "./pages/HomePage";
import MyNotesList from "./components/MyNotesList";
import UpdatePassword from "./pages/UpdatePassword";
import ChangeUsername from "./pages/ChangeUsername";
import ProtectedRoute from "./components/ProtectedRoute";
import Layout from "./components/Layout";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import 'leaflet/dist/leaflet.css';
import LandingPage from "./pages/LandingPage";
import './styles/leaflet-custom.css'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Protected routes inside Layout */}
        <Route element={<ProtectedRoute><Layout /></ProtectedRoute>}>
          <Route path="/home" element={<HomePage />} />
          <Route path="/my-notes" element={<MyNotesList />} />
          <Route path="/update-password" element={<UpdatePassword />} />
          <Route path="/change-username" element={<ChangeUsername />} />
        </Route>

        {/* Public routes */}
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
      </Routes>
      <ToastContainer position="top-center" />
    </BrowserRouter>
  );
}

export default App;
