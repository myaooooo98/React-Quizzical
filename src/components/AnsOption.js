import React from "react"

export default function AnsOption(props) {
    return (
        <button
            className="options"
            value={props.isCorrect}
        >
            {props.option}
        </button>
    )
}