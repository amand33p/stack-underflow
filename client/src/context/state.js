import { useReducer, createContext, useContext, useEffect } from 'react';
import storage from '../utils/localStorage';

const StateContext = createContext({
  editValues: null,
  notification: null,
  darkMode: false,
  setEditValues: (values) => {},
  clearEdit: () => {},
  notify: (message, severity, duration) => {},
  clearNotif: () => {},
  toggleDarkMode: () => {},
});

const stateReducer = (state, action) => {
  switch (action.type) {
    case 'SET_EDIT':
      return {
        ...state,
        editValues: action.payload,
      };
    case 'CLEAR_EDIT':
      return {
        ...state,
        editValues: null,
      };
    case 'SET_NOTIFICATION':
      return {
        ...state,
        notification: action.payload,
      };
    case 'CLEAR_NOTIFICATION':
      return {
        ...state,
        notification: null,
      };
    case 'TOGGLE_DARK_MODE':
      return {
        ...state,
        darkMode: !state.darkMode,
      };
    default:
      return state;
  }
};

export const StateProvider = ({ children }) => {
  const [state, dispatch] = useReducer(stateReducer, {
    editValues: null,
    notification: null,
    darkMode: false,
  });

  useEffect(() => {
    const loadedDarkMode = storage.loadDarkMode();
    if (loadedDarkMode === true) {
      dispatch({
        type: 'TOGGLE_DARK_MODE',
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const setEditValues = (valuesObj) => {
    dispatch({
      type: 'SET_EDIT',
      payload: valuesObj,
    });
  };

  const clearEdit = () => {
    dispatch({
      type: 'CLEAR_EDIT',
    });
  };

  let timeoutID = null;

  const notify = (message, severity = 'success', duration = 5) => {
    clearTimeout(timeoutID);

    dispatch({
      type: 'SET_NOTIFICATION',
      payload: { message, severity, duration },
    });

    timeoutID = setTimeout(() => {
      dispatch({
        type: 'CLEAR_NOTIFICATION',
      });
    }, duration * 1000);
  };

  const clearNotif = () => {
    dispatch({
      type: 'CLEAR_NOTIFICATION',
    });
  };

  const toggleDarkMode = () => {
    dispatch({
      type: 'TOGGLE_DARK_MODE',
    });

    storage.saveDarkMode(!state.darkMode);
  };

  return (
    <StateContext.Provider
      value={{
        editValues: state.editValues,
        notification: state.notification,
        darkMode: state.darkMode,
        setEditValues,
        clearEdit,
        notify,
        clearNotif,
        toggleDarkMode,
      }}
    >
      {children}
    </StateContext.Provider>
  );
};

export const useStateContext = () => useContext(StateContext);
