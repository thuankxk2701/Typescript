let initialState={
    counter:0,
  }
  export function counterReducer(state = initialState, action) {

    switch (action.type) {
      case "increment":
        return { counter: state.counter + 1 };
      case "decrement":
        return { counter: state.counter - 1 };

      default:
        return state;
    }
  }