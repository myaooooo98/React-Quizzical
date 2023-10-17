import React from "react"

export default function AnsOption(props) {
    const chosenClass = props.isChosen ? 'chosen' : 'options'
    // const finalAnswer = something ? 'green' : 'red'
    let checkClass
    
    if (props.isCheck) {
        checkClass = props.isCorrect ? 'correct' : 'wrong'
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