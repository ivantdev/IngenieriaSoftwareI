import { createContext, useReducer, useMemo } from "react";
import PropTypes from "prop-types";
import useLocalStorageSync from "@/hooks/useLocalStorageSync";
import useToast from "@/hooks/useToast";

const GlobalContext = createContext(null);

const initialState = {
  endpoint: import.meta.env.VITE_API_ENDPOINT || "https://api.example.com",
};

const reducer = (state, action) => {
  switch (action.type) {
    case "SET_ENDPOINT":
      return { ...state, endpoint: action.payload };
    // Add more cases for other actions as needed
    default:
      return state;
  }
};

function GlobalProvider({ children }) {
  const [globalState, dispatch] = useReducer(reducer, initialState);
  const { toasts, addToast, removeToast } = useToast();
  const [userData, setUserData] = useLocalStorageSync("userData", {
    name: "NO LOGGED IN",
    email: "no-logged-in@mail.com",
    image: "/placeholder.svg?height=64&width=64",
  });

  const contextValue = useMemo(() => {
    return {
      globalState,
      dispatch,
      userData,
      setUserData,
      toasts,
      addToast,
      removeToast,
    };
  }, [
    globalState,
    dispatch,
    userData,
    setUserData,
    toasts,
    addToast,
    removeToast,
  ]);

  return (
    <GlobalContext.Provider value={contextValue}>
      {children}
    </GlobalContext.Provider>
  );
}

GlobalProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export { GlobalProvider, GlobalContext };
