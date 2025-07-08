import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import mapImage from '../assets/map.png';
import notesImage from '../assets/Mynotes.png';
import addNoteImage from '../assets/addNotes.png';


function LandingPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-cyan-50 to-blue-50">
      {/* Navbar */}
      <nav className="flex justify-between items-center px-6 py-4 bg-white shadow-sm">
        <h1
          className="text-2xl font-extrabold text-sky-700 cursor-pointer"
          onClick={() => navigate("/")}
        >
          WhereWasI
        </h1>
        <div className="flex gap-3">
          <button
            onClick={() => navigate("/login")}
            className="px-4 py-2 rounded-full border border-sky-600 text-sky-700 font-semibold hover:bg-sky-50 transition"
          >
            Login
          </button>
          <button
            onClick={() => navigate("/register")}
            className="px-4 py-2 rounded-full bg-sky-600 text-white font-semibold hover:bg-sky-700 transition"
          >
            Register
          </button>
        </div>
      </nav>

      {/* Hero */}
      <header className="flex-1 flex flex-col justify-center items-center text-center px-6 py-10">
        <motion.h1
          className="text-4xl md:text-6xl font-extrabold text-slate-800 mb-4"
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          Remember Where You’ve Been
        </motion.h1>
        <motion.p
          className="max-w-2xl text-gray-700 text-lg md:text-xl mb-8"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.7 }}
        >
          Note your memories tied to places. Keep your moments organized, secure, and beautiful.
        </motion.p>
        <motion.div
          className="flex flex-col md:flex-row gap-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.7 }}
        >
          <button
            onClick={() => navigate("/login")}
            className="bg-sky-600 hover:bg-sky-700 text-white font-semibold px-6 py-3 rounded-full shadow"
          >
            Get Started
          </button>
          <button
            onClick={() => navigate("/register")}
            className="border border-sky-600 text-sky-700 font-semibold px-6 py-3 rounded-full hover:bg-sky-50 transition"
          >
            Create Account
          </button>
        </motion.div>
      </header>

      {/* Live App Preview */}
      <section className="py-12 px-6 max-w-6xl mx-auto">
        <h2 className="text-2xl md:text-3xl font-bold text-slate-800 text-center mb-8">
          ✨ What your app looks like
        </h2>
        <div className="grid md:grid-cols-3 gap-6">
          <div className="bg-white rounded-xl shadow hover:shadow-md transition p-4">
            <img src={mapImage} alt="Map" className="rounded mb-2" />
            <h3 className="font-semibold text-slate-700">Interactive Map</h3>
            <p className="text-sm text-gray-600">View and add notes right where you were.</p>
          </div>
          <div className="bg-white rounded-xl shadow hover:shadow-md transition p-4">
            <img src={notesImage} alt="Notes" className="rounded mb-2" />
            <h3 className="font-semibold text-slate-700">Your Notes List</h3>
            <p className="text-sm text-gray-600">All your notes organized by date and place.</p>
          </div>
          <div className="bg-white rounded-xl shadow hover:shadow-md transition p-4">
            <img src={addNoteImage} alt="Add Note" className="rounded mb-2" />
            <h3 className="font-semibold text-slate-700">Easy Add Note</h3>
            <p className="text-sm text-gray-600">Quickly add text, photo, mood & location.</p>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-12 px-6 bg-sky-50">
        <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-6">
          <div className="bg-white rounded-xl shadow p-6 text-center hover:scale-105 transform transition">
            <h3 className="text-xl font-semibold mb-2 text-sky-700">📍 Geolocation Notes</h3>
            <p className="text-gray-600 text-sm">
              Pin your moments on the map and revisit them anytime.
            </p>
          </div>
          <div className="bg-white rounded-xl shadow p-6 text-center hover:scale-105 transform transition">
            <h3 className="text-xl font-semibold mb-2 text-sky-700">🗂 Organized & Secure</h3>
            <p className="text-gray-600 text-sm">
              Your data stays private, organized, and synced.
            </p>
          </div>
          <div className="bg-white rounded-xl shadow p-6 text-center hover:scale-105 transform transition">
            <h3 className="text-xl font-semibold mb-2 text-sky-700">✨ Clean UI</h3>
            <p className="text-gray-600 text-sm">
              Fast, beautiful and distraction-free experience.
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="text-center text-xs text-gray-500 py-6">
        &copy; {new Date().getFullYear()} WhereWasI. All rights reserved.
      </footer>
    </div>
  );
}

export default LandingPage;
