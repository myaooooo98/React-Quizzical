import React from "react"
import AnsOption from "./AnsOption";

export default function Quiz(props) {

    const optionsArr = props.options.map(option => ({
        option: option,
        isCorrect: false
    }))

    optionsArr.push({
        option: props.answer,
        isCorrect: true
    })

    function shuffleArray(arr) {
        for (let i = arr.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1)); // Generate a random index
          [arr[i], arr[j]] = [arr[j], arr[i]]; // Swap elements
        }
      }
      
    shuffleArray(optionsArr)

    const optionsElement = optionsArr.map(item => (
        <AnsOption 
            option = {item.option}
            isCorrect = {item.isCorrect}
        />
    ))

    return (
        <div className="quiz-container">
            <h3 className="question">{props.question}</h3>
            {optionsElement}
        </div>
    )
}