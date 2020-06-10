import React, { Component } from 'react';
import { database } from './firebase.js';
import List from './components/List.js';
import './App.css';


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: null,
      newQuestion: ''
    }

    this.dbRef = null
  }

  componentDidMount() {
    this.dbRef = database.ref("/questions")

    this.dbRef.on("value", (snapshot) => {
      this.setState({
        data: snapshot.val()
      })

    })
  }

  handleChange = (event) => {
    const newQuestion = event.target.value;
    this.setState({
      newQuestion
    })
  }

  handleSubmit = (event) => {
    event.preventDefault();
    this.dbRef.push({ title: this.state.newQuestion, upvote: 0, downvote: 0 })

  }

  handleUpVote = (event, questions, key) => {
    const { title, upvote, downvote } = questions
    this.dbRef.child(key).set({
      title,
      upvote: upvote + 1,
      downvote
    })
  }

  handleDownVote = (event, questions, key) => {
    const { title, upvote, downvote } = questions
    this.dbRef.child(key).set({
      title,
      upvote,
      downvote: downvote + 1
    })
  }

  render() {
    return (
      <div className="container mx-auto px-4 py-8" >
        <div className="flex font-sans font-bold text-4xl justify-center mb-8 text-grey-darker">Public QnA</div>
        <div className="flex justify-center">
          <form onSubmit={this.handleSubmit}>
            <label className="text-2xl font-blod text-grey-darker">Question : </label>
            <input type="text" onChange={this.handleChange} className="border rounded shadow py-2 dx-3 mx-3" />
            <button type="submit" className="bg-teal hover:bg-teal-dark text-white font-bold py-2 px-4 rounded shadow">Submit</button>
          </form>
        </div>
        {this.state.data ?
          <List questions={this.state.data} handleUpVote={this.handleUpVote} handleDownVote={this.handleDownVote} /> :
          <div className="loader"></div>}
      </div>
    )
  }
}

export default App;
