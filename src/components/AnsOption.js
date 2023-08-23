import React from "react"

export default function AnsOption(props) {
    const styles = {
        backgroundColor: props.isChosen ? "#59E391" : "#FFFFFF"
    }

    return (
        <button
            className="options"
            value={props.isCorrect}
            onClick={props.handleClick}
            style={styles}
        >
            {props.option}
        </button>
    )
}