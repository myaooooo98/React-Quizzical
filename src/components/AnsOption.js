import React from "react"

export default function AnsOption(props) {
    const [checkClass, setCheckClass] = React.useState('')
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

    React.useEffect(() => {
        // do something here to change the background of options based on the correct answer is chosen or not
        if (props.isCheck) {
            if (props.isChosen && props.isCorrect) {
                setCheckClass('correct options')
            }
            if (props.isChosen) {
                setCheckClass('wrong options')
            } else {
                setCheckClass('options')
            }
        };
    }, [props.isCheck, props.isChosen, props.isCorrect])

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