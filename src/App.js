import React from "react"
import Intro from "./components/Intro"
import Quiz from "./components/Quiz"
import {nanoid} from "nanoid"


export default function App() {
    const [quizData, setQuizData] = React.useState([])

    React.useEffect(() => {
        fetch('https://opentdb.com/api.php?amount=5')
        .then(res => res.json())
        .then(data => setQuizData(data.results))
    }, [])

    const [isStartQuiz, setIsStartQuiz] = React.useState(false)
    const [isCheck, setIsCheck] = React.useState(false)
    // const [chosenData, setChosenData] = React.useState([])

    // push quiz element into chosenData when it is changed
    // make quiz element into state
    React.useEffect(() => {
        
    }, )

    let containerClass = `quiz-container ${isStartQuiz ? '' : 'show'}`    

    function htmlDecode(input) {
        var doc = new DOMParser().parseFromString(input, "text/html");
        return doc.documentElement.textContent;
      }

    function shuffleArray(arr) {
        for (let i = arr.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1)); // Generate a random index
          [arr[i], arr[j]] = [arr[j], arr[i]]; // Swap elements
        }
        return arr
    }

    let quizElements = quizData.map(quiz => {
        const optionsArr = quiz.incorrect_answers.map(option => ({
            id: nanoid(),
            option: htmlDecode(option),
            isCorrect: false,
            isChosen: false,
        }))

        optionsArr.push({
            id: nanoid(),
            option: htmlDecode(quiz.correct_answer),
            isCorrect: true,
            isChosen: false
        })

        const quizID = nanoid()

        return (
            <>
                <Quiz 
                    key = {quizID}
                    id = {quizID}
                    question = {htmlDecode(quiz.question)}
                    options = {shuffleArray(optionsArr)}
                    isCheck = {isCheck}
                />
                <hr />
            </>
        )
    })

    function startQuiz() {
        setIsStartQuiz(true)
    }

    function checkAns() {
        setIsCheck(!isCheck)
        console.log('checking')
    }

    return (
        <div>
            <img src="./images/blobs (1).png" className="blob1"></img>
            <Intro
                isStartQuiz = {isStartQuiz} 
                startQuiz = {startQuiz}
            />
            <div className={containerClass}>
                {quizElements}
                <button className="checkAns" onClick={checkAns}>Check Answer</button>
            </div>
            <img src='./images/blobs.png' className="blob2"></img>
        </div>
    )
}