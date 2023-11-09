import React from "react";


export default function Quiz(props) {

    return (
        <div className="question-container">
            <h3 className="question">{props.question}</h3>
            <div className="options-container">
                {props.options.map(item => (
                    <button
                        key={item.optId}
                        onClick={() => props.handleChosenOption(props.id, item.optId)}
                        className={` options 
                            ${item.isHeld && 'chosen'}
                            ${props.isCheck && item.isCorrect && 'correct'}
                            ${props.isCheck && item.isHeld && !item.isCorrect && 'wrong'}
                        `}
                    >
                        {item.option}
                    </button>
                ))}
            </div>
        </div>
    )
}