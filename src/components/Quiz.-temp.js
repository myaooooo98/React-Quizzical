import React from "react";
import Option from "./Option";


export default function Quiz(props) {
    
    const optionsElement = props.options.map(item => (
        <Option 
            key = {item.optId}
            id = {item.optId}
            option = {item.option}
        />
    ))

    return (
        <div className="question-container">
            <h3 className="question">{props.question}</h3>
            <div className="options-container">
                {optionsElement}
            </div>
        </div>
    )
}