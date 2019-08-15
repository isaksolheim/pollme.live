import React from 'react';
import axios from 'axios';
import { BarChart, Bar, XAxis, YAxis, Tooltip } from 'recharts';

class VotePoll extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      post: {},
      isLoaded: false,
      vote: null,
      hasVoted: false,
      windowWidth: window.innerWidth - 40,
    };
  }

  handleResize() {
    let width = window.innerWidth - 40 >= 1000 ? 1000 : window.innerWidth - 40;
    this.setState({ windowWidth: width });
  }

  handleCopy = () => {
    let url = document.getElementById('url');
    url.select();
    document.execCommand('copy');
  }

  componentDidMount() {
    window.addEventListener('resize', this.handleResize.bind(this));
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
              <div key={option.content}>
                <label className="container">
                  <p>{option.content}</p>
                  <input type="checkbox" onChange={this.checkHandler} value={option.content} />
                  <span className="checkmark"></span>
                </label>
              </div>
            );
          })}
          <input onClick={this.submitHandler} className="button" type="submit" value="Vote" />
        </section>
      );
    } else {
      let {post} = this.state;
      let options = post.options;
      let data = [];

      // populating data array
      for (var i = 0; i < options.length; i++) {
        let dataPoint = { name: options[i].content, uv: options[i].votes, pv: 2400, amt: 2400 };
        data.push(dataPoint);
      }

      //
      let pollStyle = {
        margin: '0 auto',
        backgroundColor: '#f1f1f1',
      };

      let width = this.state.windowWidth;
      let height = 120 * data.length;

      return(
        <section id="votePoll">
          <h1>{post.question}</h1>
          <BarChart 
            width={width} 
            height={height} 
            style={pollStyle} 
            data={data} 
            layout="vertical"
            margin={{ right: 30, left: 50 }}
          >
            <XAxis type="number" allowDecimals={false} />
            <YAxis dataKey="name" type="category"/>
            <Tooltip />
            <Bar type="monotone" dataKey="uv" barSize={30} fill="#8884d8" label={{ position: 'right' }} />
          </BarChart>
          <h2>Share</h2>

          <input 
            id="url" 
            readOnly={true} 
            type="text" 
            value={`https://www.pollme.live/${this.props.match.params.id}`} />
          <button onClick={this.handleCopy}>Copy</button>
        </section>
      );
    }
  }
}

export default VotePoll;