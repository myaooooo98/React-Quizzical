import React from "react"

export default function Quiz(props) {

    let containerClass = `quiz-container ${props.isStartQuiz ? '' : 'show'}`
    const [quizData, setQuizData] = React.useState([])
    React.useEffect(() => {
        fetch('https://opentdb.com/api.php?amount=10')
        .then(res => res.json())
        .then(data => setQuizData(data))
    }, [])

    console.log(quizData)

    return (
        <div className={containerClass}>
            <h3 className="question">{props.question}</h3>
            <button>
                <label>
                    <input 
                        type="radio"
                        name="options"
                        className="option"
                        value={props.option}
                    /> 
                    {props.option}
                </label>
                <label>
                    <input 
                        type="radio"
                        name="options"
                        className="option"
                        value={props.option}
                    /> 
                    {props.option}
                </label>
            </button>
        </div>
    )
}