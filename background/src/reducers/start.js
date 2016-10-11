const initialState = 10;

export default (state = initialState, action) => {
  switch (action.type) {
    case 'ADD_COUNT':
    	console.log('testing background page ')
      return state + (action.payload || 1);
    default:
      return state;
  }
};
