import React from 'react';

const List = ({ answers, handleUpVote, handleDownVote }) => {

    const sortList = (first, second) => {
        return (answers[second].date) - (answers[first].date)
    }

    const convertTimestamp = (timestamp) => {
        return new Intl.DateTimeFormat('en-US', { year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit' }).format(timestamp);
    }

    return (
        <div>
            {Object.keys(answers).sort(sortList).map((key) => (
                <div key={key} className="card mt-4 text-decoration-none">
                    <div className="card-body">
                        <h3 className="card-title">{answers[key].answer}</h3>
                        <div className="card-sub-title">
                            <span className="pr-2">Created at {convertTimestamp(answers[key].date)}</span>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    )
}

export default List;


