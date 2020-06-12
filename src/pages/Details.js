import React, { Component } from 'react';
import { database } from '../firebase';
import { Link } from 'react-router-dom';
import ListAnswer from '../components/ListAnswer';
import './details.css'

class Details extends Component {
    constructor(props) {
        super(props)
        this.state = {
            data: null,
            answerData: null,
            newAnswer: ''
        }

        this.dbRef = null
        this.answerRef = null
    }

    componentDidMount = () => {
        const { id } = this.props.match.params;
        this.dbRef = database.ref(`/questions/${id}`);
        this.dbRef.on('value', (snapshot) => {
            this.setState({
                data: snapshot.val()
            })

        })

        this.answerRef = this.dbRef = database.ref(`/questions/${id}/answers`);
        this.answerRef.on('value', (snapshot) => {
            this.setState({
                answerData: snapshot.val()
            })

        })

    }

    handleChange = (event) => {
        const newAnswer = event.target.value;
        this.setState({
            newAnswer
        })
    }

    handleSubmit = (event) => {
        event.preventDefault();
        const { id } = this.props.match.params;
        const timestamp = Date.now()
        this.answerRef = database.ref(`/questions/${id}/answers`);
        this.answerRef.push({ answer: this.state.newAnswer, date: timestamp }).then(() => {
            this.dbRef.database.ref(`/questions/${id}`).set({
                title: this.state.data.title,
                date: this.state.data.date,
                totalAnswer: this.state.data.totalAnswer + 1,
                answers: this.state.data.answers
            })
        })
    }

    render() {
        const convertTimestamp = (timestamp) => {
            return new Intl.DateTimeFormat('en-US', { year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit' }).format(timestamp);
        }

        return (
            <div className="container mt-3">
                <Link to="/" className="btn btn-secondary">Back</Link>
                <h3 className="text-center mt-2">Detail</h3>
                {this.state.data === null ?
                    <div className="card mb-4 p-4">
                        <div className="card-body">
                            <div className="row justify-content-center">
                                <div class="spinner-border" role="status"></div>
                            </div>

                        </div>
                    </div>
                    :
                    <div className="col-12">
                        <div className="card mb-4">
                            <div className="card-body">
                                <h2 className="card-title">{this.state.data.title}</h2>
                                <div className="card-sub-title">
                                    <span className="pr-2">Created at {convertTimestamp(this.state.data.date)}</span>
                                    <span className="pr-2"> | Total Answer : {this.state.data.totalAnswer}</span>
                                </div>
                            </div>
                        </div>
                    </div>}
                <div className="row justify-content-center">
                    <form className="form-inline" onSubmit={this.handleSubmit}>
                        <h2 for="inputAnswer" id="answer-text">Answer</h2>
                        <input id="inputAnswer" type="text" onChange={this.handleChange} className="ml-3 mr-3 form-control" />
                        <button type="submit" className="btn btn-secondary">Submit</button>
                    </form>
                </div>
                {this.state.answerData ?
                    <ListAnswer answers={this.state.answerData} /> :
                    <div className="row justify-content-center">
                        <div class="spinner-border m-5" role="status"></div>
                    </div>
                }
            </div>
        )
    }
}

export default Details;