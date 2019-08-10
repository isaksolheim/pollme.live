import React from 'react';
import axios from 'axios';

class VotePoll extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      post: {},
      isLoaded: false,
      vote: null,
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

    console.log('Vote', this.state.vote);
  }
  render() {
    let {isLoaded} = this.state;

    if (!isLoaded) {
      return(
        <p>Loading...</p>
      );
    } else {
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
    }
  }
}

export default VotePoll;