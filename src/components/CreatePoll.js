import React from 'react';
import axios from 'axios';

class CreatePoll extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      question: "",
      options: [
        {
          "content": "yes",
          "votes": 1
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
  };

  render() {
    let options = this.state.options;
    return(
      <section id="createPoll">
        <h1>NEW POLL</h1>
        <form onSubmit={this.newPollHandler}>
          <label>
            Question
            <input type="text" name="question" onChange={this.inputHandler} />
          </label>
          {options.map(option => {
            return(
              <input type="text" name={`option-${option.content}`} key={option.content} />
            );
          })}
          <button onClick={this.addOption}>Add Option</button>
          <input type="submit" value="Submit" />
        </form>
      </section>
    );
  }
}

export default CreatePoll;