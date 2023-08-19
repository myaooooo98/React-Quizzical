import React from "react"

export default function Quiz(props) {

    let containerClass = `quiz-container ${props.isStartQuiz ? '' : 'start'}`

    return (
        <div className={containerClass}>
            <h3 className="question">{props.question}</h3>
            <button>
                <label>
                    <input 
                        type="radio"
                        name="options"
                        className="option"
                        value={props.option}
                    /> 
                    {props.option}
                </label>
                <label>
                    <input 
                        type="radio"
                        name="options"
                        className="option"
                        value={props.option}
                    /> 
                    {props.option}
                </label>
            </button>
        </div>
    )
}