import React from "react"

export default function Quiz(props) {
    return (
        <div className="quiz-container">
            <h3 className="question">{props.question}</h3>
            <button>
                <input 
                    type="radio"
                    name="options"
                    className="option"
                    value={props.option}
                    placeholder={props.option}
                />
            </button>
        </div>
    )
}