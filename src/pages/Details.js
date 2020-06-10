import React, { Component } from 'react';
import { database } from '../firebase';
import { Link } from 'react-router-dom';

class Details extends Component {
    constructor(props) {
        super(props)
        this.state = {
            data: null
        }

        this.dbRef = null
    }

    componentDidMount = () => {
        const { id } = this.props.match.params;
        this.dbRef = database.ref(`/questions/${id}`).on('value', (snapshot) => {
            this.setState({
                data: snapshot.val()
            })

        })
    }

    render() {
        return (
            <div className="container mx-auto px-4 py-8">
                <Link to="/" className="bg-teal hover:bg-teal-dark text-white font-bold py-2 px-4 rounded shadow">Back</Link>
                {this.state.data === null ?
                    <div>Loading</div> :
                    <div className="my-3">
                        <h1>{this.state.data.title}</h1>
                        <h2>Upvote: {this.state.data.upvote}</h2>
                        <h2>Downvote: {this.state.data.downvote}</h2>
                    </div>}
            </div>
        )
    }
}

export default Details;