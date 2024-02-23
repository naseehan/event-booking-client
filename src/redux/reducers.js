// reducers.js
const initialState = {
    adminEmail: '',
  };
  
  const rootReducer = (state = initialState, action) => {
    switch (action.type) {
      case 'SET_ADMIN_EMAIL':
        return {
          ...state,
          adminEmail: action.payload,
        };
      default:
        return state;
    }
  };
  
  export default rootReducer;
  