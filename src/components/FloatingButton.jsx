// src/components/FloatingButton.js
function FloatingButton({ onClick }) {
    return (
      <button
        onClick={onClick}
        className="fixed bottom-6 right-6 bg-blue-600 text-white rounded-full w-14 h-14 shadow-lg hover:bg-blue-700 flex items-center justify-center text-3xl"
        aria-label="Add note"
      >
        +
      </button>
    );
  }
  
  export default FloatingButton;
  