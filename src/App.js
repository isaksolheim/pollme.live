import React from 'react';
import './styles/main.scss';
import CreatePoll from './components/CreatePoll';
import Navbar from './components/Navbar';

function App() {
  return (
    <div className="App">
      <Navbar />
      <CreatePoll />
    </div>
  );
}

export default App;
