import { useState } from "react";
import { Outlet } from "react-router-dom";
import Menu from "@/components/Menu";
import { Menu as MenuIcon, X as CloseIcon } from "lucide-react";

function Dashboard() {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <div className="flex h-screen">
      {/* Mobile Menu Button */}
      <button
        onClick={toggleMenu}
        className={`lg:hidden p-2 text-gray-600 hover:text-gray-800 focus:outline-none z-50 absolute top-4 ${menuOpen ? "left-74" : "left-4"}`}
      >
        {menuOpen ? (
          <CloseIcon className="h-6 w-6" />
        ) : (
          <MenuIcon className="h-6 w-6" />
        )}
      </button>

      {/* Sidebar (Menu) */}
      <div
        className={`fixed lg:relative inset-y-0 left-0 w-84 bg-sidebar-bg transform transition-transform duration-300 ease-in-out z-40 ${menuOpen ? "translate-x-0" : "-translate-x-full"} lg:translate-x-0`}
      >
        <Menu closeMenu={toggleMenu} />
      </div>

      {/* Overlay (for mobile) */}
      {menuOpen && (
        <button
          className="fixed inset-0 bg-black bg-opacity-50 z-30 lg:hidden"
          onClick={toggleMenu}
          onKeyDown={(e) => e.key === "Escape" && toggleMenu()}
          aria-label="Close menu overlay"
        ></button>
      )}

      {/* Main Content Area */}
      <div className="flex-1 p-4 mt-10">
        <Outlet />
      </div>
    </div>
  );
}

export default Dashboard;
