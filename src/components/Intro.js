import React from "react"

export default function Intro(props) {

    return (
        <div className={`intro-container ${props.isStart && 'show'}`}>
            <h1 className="title">Quizzical</h1>
            <p className="description">Take quizzes to test your knowledge on a variety of fun and interesting topics!</p>
            <button 
                className="intro-btn"
                onClick={props.startQuiz}
            >
                    Start Quiz
            </button>
        </div>
    )
}