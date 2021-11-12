import React, { useState } from 'react';
import { addTodos } from '../redux/reducer';

import { useAppDispatch } from '../redux/hooks';
import { GoPlus } from 'react-icons/go';
const Todos: React.FC = () => {
  const dispatch = useAppDispatch();
  const [todo, setTodo] = useState<string>('');
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTodo(e.target.value);
  };

  return (
    <div className='addTodos'>
      <input
        type='text'
        value={todo}
        onChange={(e) => handleChange(e)}
        className='todo-input'
      />
      <button
        className='add-btn'
        onClick={() => {
          if (todo !== '') {
            setTodo('');
            dispatch(
              addTodos({
                id: Math.random().toString(),
                title: todo,
                completed: false,
              })
            );
          }
        }}
      >
        <GoPlus />
      </button>
      <br />
    </div>
  );
};

export default Todos;
