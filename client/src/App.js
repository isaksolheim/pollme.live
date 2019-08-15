import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import './styles/main.scss';
import CreatePoll from './components/CreatePoll';
import VotePoll from './components/VotePoll';
import Navbar from './components/Navbar';
import Footer from './components/Footer';

function App() {
  return (
    <div className="App">
      <Router>
        <Navbar />
        <Route exact path="/" component={CreatePoll} />
        <Route path="/:id" component={VotePoll} />
        <Footer />
      </Router>
    </div>
  );
}

export default App;
