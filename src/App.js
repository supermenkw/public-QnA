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
    const timestamp = Date.now();
    this.dbRef.push({ title: this.state.newQuestion, date: timestamp, totalAnswer: 0 })

  }

  render() {
    return (
      <div className="container" >
        <h1 className="text-center m-4">Public QnA</h1>
        <div className="row justify-content-center mb-5">
          <form className="form-inline text-center" onSubmit={this.handleSubmit}>
            <h2 for="inputQuestion" id="question-text">Question</h2>
            <input id="inputQuestion" type="text" onChange={this.handleChange} className="ml-3 mr-3 form-control" />
            <button type="submit" className="btn btn-secondary">Submit</button>
          </form>
        </div>
        {this.state.data ?
          <List questions={this.state.data} /> :
          <div className="row justify-content-center">
            <div class="spinner-border m-5" role="status"></div>
          </div>
        }
      </div>
    )
  }
}

export default App;
