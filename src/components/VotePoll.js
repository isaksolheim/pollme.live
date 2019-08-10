import React from 'react';
import axios from 'axios';

class VotePoll extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      post: {},
      isLoaded: false,
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
              <h2 key={option.content}>{option.content}</h2>
            );
          })}
        </section>
      );
    }
  }
}

export default VotePoll;