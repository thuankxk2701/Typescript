import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type CounterStateProp = { id: string; item: string; completed: boolean };
const initialState: CounterStateProp[] = [];
const addTodoReducer = createSlice({
  name: 'todos',
  initialState: initialState,
  reducers: {
    //Here we will write our reducer
    // Adding todos
    addTodos: (state, action: PayloadAction<CounterStateProp>) => {
      state.push(action.payload);
      return state;
    },
    removeTodos: (state, action: PayloadAction<string>) => {
      return state.filter((item) => item.id !== action.payload);
    },
    updateTodos: (
      state,
      action: PayloadAction<{ id: string; item: string }>
    ) => {
      return state.map((todo) => {
        if (todo.id === action.payload.id) {
          return {
            ...todo,
            item: action.payload.item,
          };
        }
        return todo;
      });
    },
    completeTodos: (state, action: PayloadAction<string>) => {
      return state.map((todo) => {
        if (todo.id === action.payload) {
          return {
            ...todo,
            completed: true,
          };
        }
        return todo;
      });
    },
  },
});
export const { addTodos, removeTodos, updateTodos, completeTodos } =
  addTodoReducer.actions;
export const reducer = addTodoReducer.reducer;
