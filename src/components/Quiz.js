import React, { useState } from "react"
import {nanoid} from "nanoid"
import AnsOption from "./AnsOption";

export default function Quiz(props) {

    const optionsArr = props.options.map(option => ({
        id: nanoid(),
        option: option,
        isCorrect: false,
        isChosen: false
    }))

    optionsArr.push({
        id: nanoid(),
        option: props.answer,
        isCorrect: true,
        isChosen: false
    })

    function shuffleArray(arr) {
        for (let i = arr.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1)); // Generate a random index
          [arr[i], arr[j]] = [arr[j], arr[i]]; // Swap elements
        }
    }

    const [options, setOptions] = React.useState(shuffleArray(optionsArr))

    function chosen(id) {
        setOptions(prevOption => prevOption.map(option => {
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

    const optionsElement = options.map(item => (
        <AnsOption 
            key = {item.id}
            option = {item.option}
            isCorrect = {item.isCorrect}
            isChosen = {item.isChosen}
            handleClick = {() => chosen(item.id)}
        />
    ))

    return (
        <div className="quiz-container">
            <h3 className="question">{props.question}</h3>
            {optionsElement}
        </div>
    )
}