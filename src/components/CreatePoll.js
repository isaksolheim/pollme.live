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

    let options = [];
    for (var i = 0; i < document.getElementById('options').children.length; i++) {
     let option = {
      "content": document.getElementById('options').children[i].children[1].value,
      "votes": 0
      };
      options.push(option);
    }

    var poll = {
      "question": this.state.question,
      "options": options 
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
    this.setState({ numOptions: (this.state.numOptions + 1) });
  };

  deleteOption = () => {
    this.setState({ numOptions: this.state.numOptions - 1 });
  }

  options = () => {
    let allOptions = [];

    for (var i = 1; i <= this.state.numOptions; i++) {
      let newOption = (
        <div key={i} className="option">
          <label>
            Option {i}
            {i === this.state.numOptions ? <i onClick={this.deleteOption} className="far fa-trash-alt" /> : null}
          </label>
          <input type="text" name="option" onChange={this.inputHandler} />
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
          <input type="submit" value="Create Poll" />
        </form>
      </section>
    );
  }
}

export default CreatePoll;