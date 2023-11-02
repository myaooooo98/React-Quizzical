import React from "react";


export default function Quiz(props) {
    console.log(props.quiz)
    return (
        <div className="question-container">
            {/* <h3 className="question">{props.quiz.question}</h3> */}
            <div className="options-container">
                {/* {props.quiz.optionsArr} */}
            </div>
        </div>
    )
}