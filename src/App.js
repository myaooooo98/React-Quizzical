import React from "react"
import Intro from "./components/Intro"
import Quiz from "./components/Quiz"
import {nanoid} from "nanoid"


export default function App() {
    const [quizData, setQuizData] = React.useState([])
    React.useEffect(() => {
        fetch('https://opentdb.com/api.php?amount=10')
        .then(res => res.json())
        .then(data => setQuizData(data.results))
    }, [])

    console.log(quizData)
    const [isStartQuiz, setIsStartQuiz] = React.useState(false)

    function shuffleArray(arr) {
        for (let i = arr.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1)); // Generate a random index
          [arr[i], arr[j]] = [arr[j], arr[i]]; // Swap elements
        }
    }

    let quizElements = quizData.map(quiz => {
        const optionsArr = quiz.incorrect_answers.map(option => ({
            id: nanoid(),
            option: option,
            isCorrect: false,
            isChosen: false
        }))

        optionsArr.push({
            id: nanoid(),
            option: quiz.correct_answer,
            isCorrect: true,
            isChosen: false
        })

        return (
            <Quiz 
                key = {quiz.question}
                question = {quiz.question}
                options = {shuffleArray(optionsArr)}
            />
        )
    })

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