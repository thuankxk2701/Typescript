import $$observable from "./utils/symbol-observable";
import { kindOf } from "./utils/kindOf";
import isPlainObject from "./utils/isPlainObject";
import ActionTypes from "./utils/actionTypes";


export default function createStore(reducer, preloadedState, enhancer) {
  if (
    (typeof preloadedState === "function" && typeof enhancer === "function") ||
    (typeof enhancer === "function" && typeof arguments[3] === "function")
  ) {
    throw new Error(
      "It looks like you are passing several store enhancers to " +
        "createStore(). This is not supported. Instead, compose them " +
        "together to a single function. See https://redux.js.org/tutorials/fundamentals/part-4-store#creating-a-store-with-enhancers for an example.",
    );
  }

  if (typeof preloadedState === "function" && typeof enhancer === "undefined") {
    enhancer = preloadedState;
    preloadedState = undefined;
  }
  if (typeof enhancer !== "undefined") {
    if (typeof enhancer !== "function") {
      throw new Error(
        `Expected the enhancer to be a function. Instead, received: '${kindOf(enhancer)}'`,
      );
    }
    return enhancer(createStore)(reducer, preloadedState);
  }
  if (typeof reducer !== "function") {
    throw new Error(
      `Expected the root reducer to be a function. Instead, received: '${kindOf(reducer)}'`,
    );
  }
  let currentReducer = reducer;
  let currentState = preloadedState;
  let currentListeners = [];
  let nextListeners = currentListeners;
  let isDispatching = false;
  function ensureCanMutateNextListeners() {
    if (nextListeners === currentListeners) {
      nextListeners = currentListeners.slice();
    }
  }
  function getState() {
    if (isDispatching) {
      throw new Error(
        "You may not call store.getState() while the reducer is executing. " +
          "The reducer has already received the state as an argument. " +
          "Pass it down from the top reducer instead of reading it from the store.",
      );
    }
    return currentState;
  }

  function subscribe(listener) {
    if (typeof listener !== "function") {
      throw new Error(
        `Expected the listener to be a function. Instead, received: '${kindOf(listener)}'`,
      );
    }
    if (isDispatching) {
      throw new Error(
        "You may not call store.subscribe() while the reducer is executing. " +
          "If you would like to be notified after the store has been updated, subscribe from a " +
          "component and invoke store.getState() in the callback to access the latest state. " +
          "See https://redux.js.org/api/store#subscribelistener for more details.",
      );
    }
    let isSubscribed = true;
    ensureCanMutateNextListeners();
    nextListeners.push(listener);
    return function unsubscribe() {
      if (!isSubscribed) {
        return;
      }

      if (isDispatching) {
        throw new Error(
          "You may not unsubscribe from a store listener while the reducer is executing. " +
            "See https://redux.js.org/api/store#subscribelistener for more details.",
        );
      }
      isSubscribed = false;

      const index = nextListeners.indexOf(listener);
      nextListeners.splice(index, 1);
      currentListeners = null;
    };
  }
  function dispatch(action) {
    if (!isPlainObject(action)) {
      throw new Error(
        `Actions must be plain objects. Instead, the actual type was: '${kindOf(
          action,
        )}'. You may need to add middleware to your store setup to handle dispatching other values, such as 'redux-thunk' to handle dispatching functions. See https://redux.js.org/tutorials/fundamentals/part-4-store#middleware and https://redux.js.org/tutorials/fundamentals/part-6-async-logic#using-the-redux-thunk-middleware for examples.`,
      );
    }
    if (typeof action.type === "undefined") {
      throw new Error(
        'Actions may not have an undefined "type" property. You may have misspelled an action type string constant.',
      );
    }
    if (isDispatching) {
      throw new Error("Reducers may not dispatch actions.");
    }
    try {
      isDispatching = true;
      currentState = currentReducer(currentState, action);
    } finally {
      isDispatching = false;
    }
    const listeners = (currentListeners = nextListeners);
    for (let item of listeners) {
      const listener = item;
      listener();
    }
    return action;
  }
  function replaceReducer(nextReducer) {
    if (typeof nextReducer !== "function") {
      throw new Error(
        `Expected the nextReducer to be a function. Instead, received: '${kindOf(nextReducer)}`,
      );
    }
    currentReducer = nextReducer;
    dispatch({ type: ActionTypes.REPLACE });
  }
  function observable() {
    const outerSubscribe = subscribe;
    return {
      subscribe(observer) {
        if (typeof observer !== "object" || observer === null) {
          throw new Error(
            `Expected the observer to be an object. Instead, received: '${kindOf(observer)}'`,
          );
        }
        function observerState() {
          if (observer.next) {
            observer.next(getState());
          }
        }
        observerState();
        const unsubscribe = outerSubscribe(observerState);
        return { unsubscribe };
      },
      [$$observable]() {
        return this;
      },
    };
  }
  dispatch({ type: ActionTypes.INIT });
  return {
    dispatch,
    subscribe,
    getState,
    replaceReducer,
    [$$observable]: observable,
  };
}
