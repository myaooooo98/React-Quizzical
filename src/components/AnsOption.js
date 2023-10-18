import React from "react"

export default function AnsOption(props) {
    const chosenClass = props.isChosen ? 'chosen options' : 'options'
    // const finalAnswer = something ? 'green' : 'red'
    let checkClass
    
    if (props.isCheck) {
        checkClass = props.isCorrect ? 'correct options' : 'wrong options'
    }

    return (
        <button
            className={props.isCheck ? checkClass : chosenClass}
            value={props.isCorrect}
            onClick={props.handleClick}
        >
            {props.option}
        </button>
    )
}