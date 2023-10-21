import React from "react"
import AnsOption from "./AnsOption";

export default function Quiz(props) {

    const [options, setOptions] = React.useState(props.options)
    const [checkClass, setCheckClass] = React.useState('')

    const optionsElement = options.map(item => (
        <AnsOption 
            key = {item.id}
            option = {item.option}
            isCorrect = {item.isCorrect}
            isChosen = {item.isChosen}
            handleClick = {() => chosen(item.id)}
            isCheck = {props.isCheck}
            checkClass = {checkClass}
        />
    ))

    React.useEffect(() => {
        // do something here to change the background of options based on the correct answer is chosen or not
        if (props.isCheck) {
            options.forEach(item => {
                if (item.isChosen && item.isCorrect) {
                    setCheckClass('correct options')
                }
                if (item.isChosen) {
                    setCheckClass('wrong options')
                } else {
                    setCheckClass('options')
                }
            });
        }
    }, [props.isCheck, options])

    function chosen(id) {
        setOptions(prevOptions => prevOptions.map(option => {
            if (option.id === id) {
                return {
                    ...option,
                    isChosen: !option.isChosen
                }
            } else {
                return option
            }
        }))
    }

    return (
        <div className="question-container">
            <h3 className="question">{props.question}</h3>
            <div className="options-container">
                {optionsElement}
            </div>
        </div>
    )
}