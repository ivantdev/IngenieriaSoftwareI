import { NavLink } from "react-router-dom";
import PropTypes from "prop-types";
import { useGlobalContext } from "@/hooks/useGlobalContext";
import {
  Home,
  HelpCircle,
  UserPlus,
  UserCheck,
  UserMinus,
  Bell,
  LogOut,
} from "lucide-react";
import { useNavigate } from "react-router";
import { getCSRFToken } from "@/utils";

const menuItems = [
  { path: "/", label: "Dashboard", icon: Home },
  { path: "/guides-protocols", label: "Guías y protocolos", icon: HelpCircle },
  {
    path: "/pre-registration",
    label: "Pre-registro de paciente",
    icon: UserPlus,
    target: "_blank",
  },
  {
    path: "/patient-admission",
    label: "Admisión de paciente",
    icon: UserCheck,
  },
  {
    path: "/patient-discharge",
    label: "Salida de pacientes",
    icon: UserMinus,
  },
  {
    path: "/notifications-management",
    label: "Gestión de notificaciones",
    icon: Bell,
  },
];

function Menu({ closeMenu }) {
  const { addToast, user, setUser, globalState } = useGlobalContext();
  const navigate = useNavigate();
  const handleLogout = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${globalState.endpoint}/logout/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-CSRFToken": getCSRFToken(),
        },
        credentials: "include",
      });

      if (response.ok) {
        setUser({
          ...user,
          name: null,
          email: null,
          isActiveSession: false,
        });
        navigate("/logout");
      } else {
        addToast("No se pudo cerrar sesión", "error");
      }
    } catch {
      addToast("Error error cerrando sesión", "error");
    }
  };
  menuItems[2].path = `${globalState.landing_url}/pre-registration`;
  return (
    <div className="flex h-screen flex-col p-4 bg-white">
      {/* User Info */}
      <div className="flex items-center gap-4 mb-8">
        <div className="relative w-16 h-16 rounded-full bg-primary-blue flex-shrink-0">
          <img
            src={user.image || "/placeholder.svg?height=64&width=64"}
            alt="User Avatar"
            className="absolute inset-0 w-full h-full object-cover rounded-full"
          />
        </div>
        <div>
          <div className="font-bold text-lg md:text-xl lg:text-2xl">
            {user.name}
          </div>
          <div className="text-sm text-gray-500 md:text-base lg:text-lg">
            {user.email}
          </div>
        </div>
        <button type="button" className="ml-auto lg:hidden" onClick={closeMenu}>
          <span className="sr-only">Close menu</span>
        </button>
      </div>

      {/* Navigation Items */}
      <nav className="flex-grow">
        <ul className="space-y-2">
          {menuItems.map((item) => {
            const Icon = item.icon;
            return (
              <li key={item.path}>
                <NavLink
                  to={item.path}
                  onClick={closeMenu}
                  className={({ isActive }) =>
                    `flex items-center gap-4 p-2 pt-3 rounded-md text-gray-700 hover:bg-blue-500 hover:text-white ${isActive ? "bg-blue-500 text-white" : ""} text-base md:text-lg`
                  }
                >
                  <Icon className="h-5 w-5 md:h-6 md:w-6 lg:h-7 lg:w-7" />
                  <span>{item.label}</span>
                </NavLink>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* Logout Button */}
      <div className="mt-auto">
        <NavLink
          to="/logout"
          onClick={closeMenu}
          className="flex items-center gap-3 p-2 text-gray-800  hover:bg-gray-200 rounded-md w-full text-base md:text-lg lg:text-xl"
        >
          <LogOut className="h-5 w-5 md:h-6 md:w-6 lg:h-7 lg:w-7" />
          <span>Cerrar sesión</span>
        </NavLink>
      </div>
    </div>
  );
}
Menu.propTypes = {
  closeMenu: PropTypes.func.isRequired,
};

export default Menu;
