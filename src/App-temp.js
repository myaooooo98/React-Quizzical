import React from "react"
import Intro from "./components/Intro"
import Quiz from "./components/Quiz"
import {nanoid} from "nanoid"


export default function App() {
    const [quizData, setQuizData] = React.useState([])
    const [quizElement, setQuizElement] = React.useState()
    const [isStartQuiz, setIsStartQuiz] = React.useState(false)
    const [isCheck, setIsCheck] = React.useState(false)

    React.useEffect(() => {
        fetch('https://opentdb.com/api.php?amount=5')
        .then(res => res.json())
        .then(data => setQuizData(data.results))
    }, [])

    // need a state that hold all the changes - answer is chosen
    // make sure every question has a chosen answer
    // make sure only one answer can be chosen per question - disabled it when there are chosen answer?
    
    React.useEffect(() => {
        setQuizElement(quizData.map(quizEle => {
            const optionsArr = quizEle.incorrect_answers.map(option => ({
                id: nanoid(),
                option: htmlDecode(option),
                isCorrect: false,
                isChosen: false,
            }))
    
            optionsArr.push({
                id: nanoid(),
                option: htmlDecode(quizEle.correct_answer),
                isCorrect: true,
                isChosen: false,
            })
    
            const id = nanoid()
            
            return (
                <>
                    <Quiz 
                        key = {id}
                        id = {id}
                        question = {htmlDecode(quizEle.question)}
                        options = {shuffleArray(optionsArr)}
                        isCheck = {isCheck}
                    />
                    <hr />
                </>
            )
        }))
    }, [quizData, isCheck])

    // const quizElements = quizData.map(quizEle => {
    //     const optionsArr = quizEle.incorrect_answers.map(option => ({
    //         id: nanoid(),
    //         option: htmlDecode(option),
    //         isCorrect: false,
    //         isChosen: false,
    //     }))

    //     optionsArr.push({
    //         id: nanoid(),
    //         option: htmlDecode(quizEle.correct_answer),
    //         isCorrect: true,
    //         isChosen: false,
    //     })

    //     const id = nanoid()
        
    //     return (
    //         <>
    //             <Quiz 
    //                 key = {id}
    //                 id = {id}
    //                 question = {htmlDecode(quizEle.question)}
    //                 options = {shuffleArray(optionsArr)}
    //                 isCheck = {isCheck}
    //             />
    //             <hr />
    //         </>
    //     )
    // })

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

    function startQuiz() {
        setIsStartQuiz(true)
    }

    function checkAns() {
        setIsCheck(!isCheck)
        console.log('checking')
    }

    return (
        <div>
            <img src="./images/blobs (1).png" className="blob1" alt=""></img>
            <Intro
                isStartQuiz = {isStartQuiz} 
                startQuiz = {startQuiz}
            />
            <div className={containerClass}>
                {quizElement}
                <button className="checkAns" onClick={checkAns}>Check Answer</button>
            </div>
            <img src='./images/blobs.png' className="blob2" alt=""></img>
        </div>
    )
}