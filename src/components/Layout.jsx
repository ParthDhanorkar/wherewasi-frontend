// // src/components/Layout.jsx
// import Navbar from "./Navbar";
// import { Outlet } from "react-router-dom";

// function Layout() {
//   return (
//     <div className="flex flex-col min-h-screen">
//       <Navbar />
//       <div className="flex-1 flex overflow-hidden">
//         <Outlet />
//       </div>
//     </div>
//   );
// }

// export default Layout;




import Navbar from "./Navbar";
import { Outlet } from "react-router-dom";

function Layout() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <div className="flex-1 flex overflow-hidden pt-16"> {/* <-- add pt-16 here */}
        <Outlet />
      </div>
    </div>
  );
}

export default Layout;
