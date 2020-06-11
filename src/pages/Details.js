import React, { Component } from 'react';
import { database } from '../firebase';
import { Link } from 'react-router-dom';
import ListAnswer from '../components/ListAnswer';

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
            <div className="container mx-auto px-4 py-8">
                <Link to="/" className="bg-teal hover:bg-teal-dark text-white font-bold py-2 px-4 rounded shadow no-underline">Back</Link>
                <div classNam="flex justify-center">
                    <h3 className="text-4xl text-center font-blod text-grey-darker mx-5">Detail</h3>
                </div>
                {this.state.data === null ?
                    console.log('mengambil data...')
                    :
                    <div className="my-6 mx-3 font-sans text-2xl text-grey-darker">
                        <div className="flex bg-blue-lightest shadow border p-6 my-5">
                            <div className="content ml-4">
                                <div className="title text-4xl">{this.state.data.title}</div>
                                <div className="votes py-2 px-3">
                                    <span className="pr-2">Created at {convertTimestamp(this.state.data.date)}</span>
                                    <span className="pr-2"> | Total Answer : {this.state.data.totalAnswer}</span>
                                </div>
                            </div>
                        </div>
                    </div>}
                <div className="flex justify-center">
                    <form onSubmit={this.handleSubmit}>
                        <label className="text-2xl font-blod text-grey-darker">Answer : </label>
                        <input type="text" onChange={this.handleChange} className="border rounded shadow py-2 dx-3 mx-3" />
                        <button type="submit" className="bg-teal hover:bg-teal-dark text-white font-bold py-2 px-4 rounded shadow">Submit</button>
                    </form>
                </div>
                {this.state.answerData ?
                    <ListAnswer answers={this.state.answerData} /> :
                    <div className="loader"></div>}
            </div>
        )
    }
}

export default Details;