import React from 'react';
import { Link } from 'react-router-dom';

const List = ({ questions, handleUpVote, handleDownVote }) => {

    const sortList = (first, second) => {
        return (questions[second].date) - (questions[first].date)
    }

    const convertTimestamp = (timestamp) => {
        return new Intl.DateTimeFormat('en-US', { year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit' }).format(timestamp);
    }

    return (
        <div>
            {Object.keys(questions).sort(sortList).map((key) => (
                <Link to={`/detail/${key}`} className="card mb-4 text-decoration-none">
                    <div key={key} className="card-body">
                        <div className="card-title"><h3>{questions[key].title}</h3></div>
                        <div className="card-sub-title">
                            <span className="pr-2">Created at {convertTimestamp(questions[key].date)}</span>
                            <span className="pr-2"> | Total Answer : {questions[key].totalAnswer}</span>
                        </div>
                    </div>
                </Link>
            ))}
        </div>
    )
}

export default List;

