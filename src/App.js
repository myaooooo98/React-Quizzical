import React from "react"
import Intro from "./components/Intro"
import Quiz from "./components/Quiz"

export default function App() {
    const [quizData, setQuizData] = React.useState([])
    React.useEffect(() => {
        fetch('https://opentdb.com/api.php?amount=10')
        .then(res => res.json())
        .then(data => setQuizData(data.results))
    }, [])

    console.log(quizData)
    const [isStartQuiz, setIsStartQuiz] = React.useState(false)

    let quizElements = quizData.map(quiz => (
        <Quiz 
            question = {quiz.question}
            options = {quiz.incorrect_answers}
            answer = {quiz.correct_answer}
        />
    ))

    function startQuiz() {
        setIsStartQuiz(true)
    }

    return (
        <div>
            <img src="./images/blobs (1).png" className="blob1"></img>
            <Intro
                isStartQuiz = {isStartQuiz} 
                startQuiz = {startQuiz}
            />
            <div className={isStartQuiz ? '' : 'show'}>
                {quizElements}
            </div>
            <img src='./images/blobs.png' className="blob2"></img>
        </div>
    )
}