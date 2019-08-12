import React from 'react';
import axios from 'axios';

class VotePoll extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      post: {},
      isLoaded: false,
      vote: null,
      hasVoted: false,
    };
  }

  componentDidMount() {
    let id = this.props.match.params.id;
    axios.get('http://localhost:5000/')
      .then(res => {
        this.setState({
          post: res.data.find(post => post._id === id),
          isLoaded: true,
        })
      });
  }

  checkHandler = (e) => {
    this.setState({ vote: e.target.value });
  }

  submitHandler = (e) => {
    e.preventDefault();

    let id = this.props.match.params.id;

    let poll = this.state.post;
    let vote = this.state.vote;
    for (var i = 0; i < poll.options.length; i++) {
      if (vote === poll.options[i].content) {
        poll.options[i].votes = poll.options[i].votes + 1;
        break;
      }
    }

    axios.post(`http://localhost:5000/${id}`, poll);
    this.setState({ hasVoted: true });
  }
  render() {
    let {isLoaded, hasVoted} = this.state;

    if (!isLoaded) {
      return(
        <p>Loading...</p>
      );
    } else if (!hasVoted) {
      let {post} = this.state;
      return(
        <section id="votePoll">
          <h1>{post.question}</h1>
          {post.options.map(option => {
            return(
              <h2 key={option.content}>
                {option.content}<input onChange={this.checkHandler} value={option.content} type="checkbox" />
              </h2>
            );
          })}
          <input onClick={this.submitHandler} className="button" type="submit" value="Vote" />
        </section>
      );
    } else {
      let {post} = this.state;
      return(
        <section id="votePoll">
          <h1>{post.question}</h1>
          <p>Thanks for voting</p>
        </section>
      );
    }
  }
}

export default VotePoll;