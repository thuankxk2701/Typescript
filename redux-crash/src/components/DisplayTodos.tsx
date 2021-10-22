import React, { useState } from 'react';
import { useAppSelector } from '../redux/hooks';
import TodoItems from './todoItem';
import { CounterStateProp } from '../redux/reducer';
import { AnimatePresence, motion } from 'framer-motion';

const DisplayTodos: React.FC = () => {
  const todos: CounterStateProp[] = useAppSelector((state) => state);
  const [sort, setSort] = useState<string>('active');
  return (
    <div className='displaytodos'>
      <div className='buttons'>
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => setSort('active')}
        >
          Active
        </motion.button>
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => setSort('completed')}
        >
          Completed
        </motion.button>
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => setSort('all')}
        >
          All
        </motion.button>
      </div>
      <ul>
        <AnimatePresence>
          {todos.length > 0 && sort === 'active'
            ? todos.map((item: CounterStateProp) => {
                return (
                  item.completed === false && (
                    <TodoItems key={item.id} item={item} />
                  )
                );
              })
            : null}
          {todos.length > 0 && sort === 'completed'
            ? todos.map((item: CounterStateProp) => {
                return (
                  item.completed === true && (
                    <TodoItems key={item.id} item={item} />
                  )
                );
              })
            : null}
          {todos.length > 0 && sort === 'all'
            ? todos.map((item: CounterStateProp) => {
                return <TodoItems key={item.id} item={item} />;
              })
            : null}
        </AnimatePresence>
      </ul>
    </div>
  );
};

export default DisplayTodos;
