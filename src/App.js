import { useEffect, useState } from "react";
import { nanoid } from "nanoid";
import { decode } from "he";
import Intro from "./components/Intro";
import Quiz from "./components/Quiz.-temp";

export default function App() {
    const [quizData, setQuizData] = useState([])
    const [quiz, setQuiz] = useState([])
    const [isStart, setIsStart] = useState(false)

    useEffect(() => {
        if (isStart) {
            fetch('https://opentdb.com/api.php?amount=5')
            .then(res => res.json())
            .then(data => setQuizData(data.results))
        }
    }, [isStart])

    useEffect(() => {
        const newQuiz = quizData.map(data => {
            const optionsArr = data.incorrect_answers
                                .map(opt => ({
                                    optId: nanoid(),
                                    option: decode(opt),
                                    isCorrect: false,
                                    isHeld: false,
                                }))
            optionsArr.push({
                optId: nanoid(),
                option: decode(data.correct_answer),
                isCorrect: true,
                isHeld: false
            })

            return {
                id: nanoid(),
                question: decode(data.question),
                optionsArr: shuffleArray(optionsArr)
            }
        })
        setQuiz(newQuiz)
    }, [quizData])


    function shuffleArray(arr) {
        for (let i = arr.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1)); // Generate a random index
          [arr[i], arr[j]] = [arr[j], arr[i]]; // Swap elements
        }
        return arr
    }

    function chosen(id, optId) {
        // setQuiz(prevQuiz => prevQuiz.map(item => {
        //     if(item.id === id) {
        //         for(let i = 0; i < item.optionsArr; i++) {
        //             if(item.optionsArr.optId === optId) {
                       
        //                 }
        //             }
        //         }
        //     }
        // }))
        // setOptions(prevOptions => prevOptions.map(option => {
        //     if (option.id === id) {
        //         return {
        //             ...option,
        //             isChosen: !option.isChosen
        //         }
        //     } else {
        //         return option
        //     }
        // }))
    }

    const quizElement = quiz.map(item => (
        <Quiz 
            key = {item.id}
            id = {item.id}
            question = {item.question} 
            options = {item.optionsArr}
        />
    ))
    // set option element here, and then put into quiz component

    return (
        <>
            <img src="./images/blobs (1).png" className="blob1" alt=""></img>
            <Intro
                isStart = {isStart} 
                startQuiz = {() => setIsStart(true)}
            />
            
            <div className={`quiz-container ${isStart ? '' : 'show'}`}>
                {quizElement}
                <button className="checkAns">Check Answer</button>
            </div>
            <img src='./images/blobs.png' className="blob2" alt=""></img>
        </>
    )
}