import React from "react"
import AnsOption from "./AnsOption";

export default function Quiz(props) {

    const [options, setOptions] = React.useState(props.options)

    const optionsElement = options.map(item => (
        <AnsOption 
            key = {item.id}
            option = {item.option}
            isCorrect = {item.isCorrect}
            isChosen = {item.isChosen}
            handleClick = {() => chosen(item.id)}
        />
    ))

    React.useEffect(() => {
        // do something here to change the background of options based on the correct answer is chosen or not
        
    }, [props.isCheck])

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