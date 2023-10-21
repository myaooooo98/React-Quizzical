import React from "react"

export default function AnsOption(props) {
    const chosenClass = props.isChosen ? 'chosen options' : 'options'

    // let checkedClass
    // if (props.isCheck) {
    //     if (props.isChosen) {
    //         if (props.isCorrect) {
    //             checkedClass = 'correct options'
    //         }
    //         checkedClass = 'wrong options'
    //     }
    //     checkedClass = 'options'
    // }

    return (
        <button
            className={props.isCheck ? props.checkClass : chosenClass}
            value={props.isCorrect}
            onClick={props.handleClick}
        >
            {props.option}
        </button>
    )
}