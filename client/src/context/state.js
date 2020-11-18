import { useReducer, createContext, useContext } from 'react';

const StateContext = createContext({
  editValues: null,
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
    default:
      return state;
  }
};

export const StateProvider = ({ children }) => {
  const [state, dispatch] = useReducer(stateReducer, { editValues: null });

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

  return (
    <StateContext.Provider
      value={{ editValues: state.editValues, setEditValues, clearEdit }}
    >
      {children}
    </StateContext.Provider>
  );
};

export const useStateContext = () => useContext(StateContext);
