import React, { useEffect, useState } from 'react';
import './App.css';

import ListTask from './component/listTask/listTask';

import TodoService from "./service/todoService"
import { TaskProps } from './component/task/task';
import AppProvider from './contex/appContex';
function App() {

  return (
    <AppProvider>
      <div className="App">
        <ListTask  />
      </div>
    </AppProvider>
  );
}

export default App;
