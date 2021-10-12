import React, { useState } from 'react';
type TodoProps = {
  onSubmit: (text: string, valueLocation: boolean) => void;
  type: string;
};
const Header: React.FC<TodoProps> = ({ onSubmit, type }) => {
  const [value, setValue] = useState<string>('');
  const placeholder =
    type === 'ADD' ? 'Please input your task' : 'Search for your task';
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const text = e.target.value;
    if (type !== 'ADD') onSubmit(text, false);
    setValue(text);
  };

  const handleTaskSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (type === 'ADD' && value.trim() !== '') {
      onSubmit(value, true);
      setValue('');
    }
  };
  return (
    <header>
      <form onSubmit={handleTaskSubmit}>
        <h1>Things Todo</h1>
        <input
          type='text'
          className='form-control add-todo'
          value={value}
          placeholder={placeholder}
          onChange={handleChange}
        />
      </form>
    </header>
  );
};
export default Header;
