import React from 'react';
import axios from 'axios';

class CreatePoll extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      question: "",
      numOptions: 1,
      options: [
        {
          "content": "",
          "votes": 0
        }
      ],
    };
  }

  newPollHandler = (e) => {
    e.preventDefault();

    var poll = {
      "question": this.state.question,
      "options": this.state.options
    };

    axios.post('http://localhost:5000/create', poll)
      .then(res => console.log(res.data));
  }

  inputHandler = (e) => {
    if (e.target.name === 'question') {
      this.setState({ question: e.target.value });
    }
  }

  addOption = (e) => {
    e.preventDefault();
    this.setState({ numOptions: (this.state.numOptions + 1) })
  };


  options = () => {
    let allOptions = [];

    for (var i = 1; i <= this.state.numOptions; i++) {
      let newOption = (
        <div key={i} className="option">
          <label>Option {i}</label>
          <input type="text" name="question" onChange={this.inputHandler} />
        </div>
      );

      allOptions.push(newOption);
    }

    return allOptions;
  }

  render() {
    return(
      <section id="createPoll">
        <h1>NEW POLL</h1>
        <form onSubmit={this.newPollHandler}>
          <label>Question</label>
          <input type="text" name="question" onChange={this.inputHandler} />
          <div id="options" className="options">
            {this.options()}
          </div>
          <button onClick={this.addOption}>Add Option</button>
          <input type="submit" value="Submit" />
        </form>
      </section>
    );
  }
}

export default CreatePoll;