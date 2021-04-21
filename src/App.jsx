import React, { useEffect, useReducer } from "react";
import Modal from "./components/Modal";

import Index from "./views/Index";

export const AppContext = React.createContext();

function reducer(state, action) {
  switch (action.type) {
    case "timerTop":
      return {
        ...state,
        timerTop: action.payload,
        updateComponent: state.updateComponent + 1,
      };
    case "timerBottom":
      return {
        ...state,
        timerBottom: action.payload,
        updateComponent: state.updateComponent + 1,
      };
    case "increment":
      return {
        ...state,
        increment: action.payload,
        updateComponent: state.updateComponent + 1,
      };
    case "isModalActive":
      return { ...state, isModalActive: action.payload };
    case "flipTimer":
      return { ...state, flipTimer: action.payload };
    case "darkMode":
      return { ...state, darkMode: action.payload };
    default:
      return state;
  }
}

const App = () => {
  const [state, dispatch] = useReducer(reducer, {
    increment: 3000,
    timerTop: 180000,
    timerBottom: 180000,
    darkMode: false,
    flipTimer: false,
    isModalActive: false,
    updateComponent: 1,
  });

  useEffect(() => {
    if (state.darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [state.darkMode]);

  return (
    <main className="dark:text-[#C9D1D9] bg-gray-200 dark:bg-[#090C10]">
      <AppContext.Provider value={{ state, dispatch }}>
        <Index key={state.updateComponent} />
        <Modal show={state.isModalActive} />
      </AppContext.Provider>
    </main>
  );
};

export default App;
