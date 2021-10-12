import React, { useState } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Header from './components/header/Header';
import Footer from './components/footer/Footer';
import ListTodo from './components/listTodo/ListTodo';
const App: React.FC = () => {
  const [todoLists, setTodoList] = useState<
    { text: string; active: boolean }[]
  >([]);
  const [searchValues, setSearchValues] = useState<
    { text: string; active: boolean }[]
  >([]);

  const handleSubmit = (value: string, location: boolean) => {
    if (location) {
      setTodoList([...todoLists, { text: value, active: true }]);
    } else {
      setSearchValues(
        todoLists.filter((item) => {
          return item.text.toLowerCase().includes(value.toLowerCase());
        })
      );
    }
  };
  const handleToggleItem = (index: number) => {
    const newITodo = { ...todoLists[index], active: !todoLists[index].active };
    const updateTodoLists = [...todoLists];

    updateTodoLists.splice(index, 1, newITodo);
    setTodoList(updateTodoLists);
  };
  return (
    <Router>
      <div className='container'>
        <div className='row'>
          <div className='todoList'>
            <Switch>
              <Route
                exact
                path='/'
                render={() => (
                  <>
                    <Header onSubmit={handleSubmit} type='ADD' />
                    <ListTodo
                      todoLists={todoLists}
                      onToggle={handleToggleItem}
                    />
                  </>
                )}
              />
              <Route
                exact
                path='/search'
                render={() => (
                  <>
                    <Header onSubmit={handleSubmit} type='SEARCH' />
                    <ListTodo
                      todoLists={searchValues}
                      onToggle={handleToggleItem}
                    />
                  </>
                )}
              />
            </Switch>
            <Footer />
          </div>
        </div>
      </div>
    </Router>
  );
};

export default App;
