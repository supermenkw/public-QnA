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
        <div className="my-6 mx-3 font-sans text-2xl text-grey-darker">
            {Object.keys(questions).sort(sortList).map((key) => (
                <Link to={`/detail/${key}`} className="no-underline text-grey-darker">
                    <div key={key} className="flex bg-blue-lightest shadow border p-6 my-5">
                        <div className="content ml-4">
                            <div className="title text-4xl">{questions[key].title}</div>
                            <div className="votes py-2 px-3">
                                <span className="pr-2">Created at {convertTimestamp(questions[key].date)}</span>
                                <span className="pr-2"> | Total Answer : {questions[key].totalAnswer}</span>
                            </div>
                        </div>
                    </div>
                </Link>
            ))}
        </div>
    )
}

export default List;

