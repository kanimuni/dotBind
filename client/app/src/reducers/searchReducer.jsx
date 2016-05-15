const searchReducer = (state = {
  display: true,
  buttons: [],
}, action) => {
  switch(action.type) {
    case 'SWITCH_DISPLAY':
      console.log('searchReducer is called: ', action.payload);
      return {
        display: action.payload,
        buttons: []
      };
    default:
      console.log('searchReducer is called, default state: ', state);
      return state;
  };
};

export default searchReducer;