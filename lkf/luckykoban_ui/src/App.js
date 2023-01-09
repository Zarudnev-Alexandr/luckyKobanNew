import React from 'react';
import { useDispatch } from 'react-redux';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './styles/style.scss'

import {Main} from './components/main'
import {Login} from './components/login'

const App = () => {
  return (   
    <Router>
      <Routes>
        <Route path='/' element={<Main />} />
        <Route path='/Login' element={<Login />} />
      </Routes>  
    </Router>  
  );
}

export default App;
