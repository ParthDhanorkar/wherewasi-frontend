

// src/pages/HomePage.jsx
import { useState } from "react";
import MapView from "../components/MapView";
import FloatingButton from "../components/FloatingButton";
import AddNoteModal from "../components/AddNoteModal";

function HomePage() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <div className="flex flex-1 relative">
        <MapView className="flex-1 " />
        <FloatingButton onClick={() => setIsModalOpen(true)} />
      </div>
      {isModalOpen && (
        <AddNoteModal onClose={() => setIsModalOpen(false)} />
      )}
    </>
  );
}
export default HomePage;
