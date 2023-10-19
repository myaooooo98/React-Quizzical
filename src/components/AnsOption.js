import React from "react"

export default function AnsOption(props) {
    const [checkedClass, setCheckedClass] = React.useState('')

    const chosenClass = props.isChosen ? 'chosen options' : 'options'

    React.useEffect(() => {
        if (props.isCheck) {
            if (props.isCorrect) {
                setCheckedClass('correct options')
            }
            else {
                setCheckedClass('wrong options')
            }
        }
    }, [props.isCheck, props.isChosen, props.isCorrect])

    return (
        <button
            className={props.isCheck ? checkedClass : chosenClass}
            value={props.isCorrect}
            onClick={props.handleClick}
        >
            {props.option}
        </button>
    )
}