import { useReducer, createContext, useContext, useEffect } from 'react';
import storage from '../utils/localStorage';

const AuthContext = createContext({
  user: null,
  setUser: (userData) => {},
  logoutUser: () => {},
});

const authReducer = (state, action) => {
  switch (action.type) {
    case 'LOGIN':
      return {
        ...state,
        user: action.payload,
      };
    case 'LOGOUT':
      return {
        ...state,
        user: null,
      };
    default:
      return state;
  }
};

export const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, { user: null });

  useEffect(() => {
    const loggedUser = storage.loadUser();

    if (loggedUser) {
      dispatch({
        type: 'LOGIN',
        payload: loggedUser,
      });
    }
  }, []);

  const setUser = (userData) => {
    storage.saveUser(userData);
    dispatch({
      type: 'LOGIN',
      payload: userData,
    });
  };

  const logoutUser = () => {
    storage.removeUser();
    dispatch({ type: 'LOGOUT' });
  };

  return (
    <AuthContext.Provider value={{ user: state.user, setUser, logoutUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => useContext(AuthContext);
