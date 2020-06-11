import React from 'react';

const List = ({ answers, handleUpVote, handleDownVote }) => {

    const sortList = (first, second) => {
        return (answers[second].date) - (answers[first].date)
    }

    const convertTimestamp = (timestamp) => {
        return new Intl.DateTimeFormat('en-US', { year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit' }).format(timestamp);
    }

    return (
        <div className="my-6 mx-3 font-sans text-2xl text-grey-darker">
            {Object.keys(answers).sort(sortList).map((key) => (
                <div key={key} className="flex bg-blue-lightest shadow border p-6 my-5">
                    <div className="content ml-4">
                        <div className="title text-4xl">{answers[key].answer}</div>
                        <div className="votes py-2 px-3">
                            <span className="pr-2">Created at {convertTimestamp(answers[key].date)}</span>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    )
}

export default List;


