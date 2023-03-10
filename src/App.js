import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/home';
import PageRender from './customRouter/PageRender';
import { useDispatch, useSelector } from 'react-redux';
import { refreshToken } from './redux/actions/authAction';
import { SOCKET } from './redux/types';
import io from 'socket.io-client';
import SocketClient from './SocketClient';
import Navbar from './components/Navbar';
import Alert from './components/alert/Alert';

function App() {
  const { auth } = useSelector((state) => state);
  const dispatch = useDispatch();

  useEffect(() => {
    const socket = io('http://localhost:5000');
    dispatch({ type: SOCKET, payload: socket });

    return () => socket.close();
  }, [dispatch]);

  useEffect(() => {
    dispatch(refreshToken());
  }, [dispatch]);

  return (
    <div
      className='dark:text-white bg-cover'
    >
      <div className='primary_bg dark:bg-neutral-900' style={{ zIndex: '0' }}></div>
      <div className='container'>
        {auth.user && <Navbar />}
        <Alert />
        <Router>
          <SocketClient />
          <Routes>
            <Route exact path='/' element={<Home />} />
            <Route path='/:page' element={<PageRender />} />
            <Route path='/:page/:id' element={<PageRender />} />
          </Routes>
        </Router>
      </div>
    </div>
  );
}

export default App;