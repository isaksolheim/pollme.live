import React from 'react';
import './styles/main.scss';
import CreatePoll from './components/CreatePoll';
import Navbar from './components/Navbar';
import Footer from './components/Footer';

function App() {
  return (
    <div className="App">
      <Navbar />
      <CreatePoll />
      <Footer />
    </div>
  );
}

export default App;
