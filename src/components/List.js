import React from 'react';
import { Link } from 'react-router-dom';

const List = ({ questions, handleUpVote, handleDownVote }) => {

    const sortVote = (first, second) => {
        return (questions[second].upvote - questions[second].downvote) - (questions[first].upvote - questions[first].downvote)
    }

    return (
        <div className="my-6 mx-3 font-sans text-2xl text-grey-darker">
            {Object.keys(questions).sort(sortVote).map((key) => (
                <Link to={`/detail/${key}`} className="no-underline text-grey-darker">
                    <div key={key} className="flex bg-blue-lightest shadow border p-6 my-5">
                        <div className="text-4xl">
                            <div className="upvote-container">
                                <button onClick={(e) => handleUpVote(e, questions[key], key)}>🔼</button>
                            </div>
                            <div className="upvote-container">
                                <button onClick={(e) => handleDownVote(e, questions[key], key)}>🔽</button>
                            </div>
                        </div>
                        <div className="content ml-4">
                            <div className="title text-4xl">{questions[key].title}</div>
                            <div className="votes py-2 px-3">
                                <span className="pr-2">Upvote : {questions[key].upvote}</span>
                                <span className="pr-2">Downvote : {questions[key].downvote}</span>
                            </div>
                        </div>
                    </div>
                </Link>
            ))}
        </div>
    )
}

export default List;

