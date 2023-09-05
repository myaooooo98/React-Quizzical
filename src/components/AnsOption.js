import React from "react"

export default function AnsOption(props) {
    const chosenClass = props.isChosen ? 'chosen' : 'options'

    return (
        <button
            className={chosenClass}
            value={props.isCorrect}
            onClick={props.handleClick}
        >
            {props.option}
        </button>
    )
}