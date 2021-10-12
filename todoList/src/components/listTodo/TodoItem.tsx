import React from 'react';
import classnames from 'classnames';
type TodoItemProps = {
  todoItem: { text: string; active: boolean };
  onToggle: () => void;
};
const TodoItem: React.FC<TodoItemProps> = ({ todoItem, onToggle }) => {
  const toggleChange = () => {
    onToggle();
  };

  return (
    <li
      className={classnames('todo-item ui-state-default', {
        completed: !todoItem.active,
      })}
    >
      <div className='checkbox'>
        <label>
          <input
            className='active'
            type='checkbox'
            checked={todoItem.active}
            onChange={toggleChange}
          />
          &nbsp;
          {todoItem.text}
        </label>
      </div>
    </li>
  );
};

export default TodoItem;
