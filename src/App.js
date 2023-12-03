import { useEffect, useState } from "react";
import ReactLoading from 'react-loading';
import { nanoid } from "nanoid";
import { decode } from "he";
import Intro from "./components/Intro";
import Quiz from "./components/Quiz.-temp";

export default function App() {
    const [quizData, setQuizData] = useState()
    const [quiz, setQuiz] = useState([])
    const [isStart, setIsStart] = useState(false)
    const [isCheck, setIsCheck] = useState(false)
    const [score, setScore] = useState(0)
    const [newGame, setNewGame] = useState(false)

    useEffect(() => {
        if (isStart) {
            startNewQuiz()
        }
    }, [isStart])

    useEffect(() => {
        if(quizData) {
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
                    isHeld: false,
                })
    
                return {
                    id: nanoid(),
                    question: decode(data.question),
                    optionsArr: shuffleArray(optionsArr),
                }
            })
            setQuiz(newQuiz)
        }
    }, [quizData])

    useEffect(() => {
        if (isCheck) {
            quiz.forEach(item => {
                const temp = item.optionsArr.filter(i => i.isCorrect && i.isHeld)
                setScore(prev => prev + temp.length)
            })  
        }
    }, [isCheck, quiz])

    useEffect(() => {
        if(newGame) {
            startNewQuiz()
            setIsCheck(false)
            setScore(0)
            setNewGame(false)
        }
    }, [newGame])

    async function startNewQuiz() {
        const response = await fetch('https://opentdb.com/api.php?amount=5')
        const data = await response.json()
        setQuizData(data.results)
    }

    function shuffleArray(arr) {
        for (let i = arr.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1)); // Generate a random index
          [arr[i], arr[j]] = [arr[j], arr[i]]; // Swap elements
        }
        return arr
    }

    console.log({quiz})

    function chosen(id, optId) {
        // if there are answer chosen, then should disable all other answer
        setQuiz(prevQuiz => {
            const updatedQuiz = prevQuiz.map(quiz => {
                if (quiz.id === id) {
                    const optHaveBeenHeld = quiz.optionsArr.find(item => item.optId === optId).isHeld
                    const noOptIsHeld = quiz.optionsArr.every(item => !item.isHeld)
                    if (optHaveBeenHeld || noOptIsHeld) {
                        const updatedAnswers = quiz.optionsArr.map(option => {
                            if (option.optId === optId) {
                                return {
                                    ...option, 
                                    isHeld: !option.isHeld,
                                }
                            }
                            return option
                        })
                        return {
                            ...quiz,
                            optionsArr: updatedAnswers
                        } 
                    }
                }
                return quiz
            })
            return updatedQuiz
        })
    }

    function checkAns() {
        // add some checking, make sure each question has an answer
        const quesAns = []
        quiz.forEach(ques => {
            const item = { 
                'ques': ques.question
            }
            ques.optionsArr.forEach(opt => {
                if (opt.isHeld) {
                    item['ans'] = opt.option
                }
            })
            quesAns.push(item)
        })
        
        if(quesAns.every(item => item.ans !== undefined)) {
            setIsCheck(true)
        }
    }

    const quizElement = quiz.map(item => (
        <Quiz 
            key = {item.id}
            id = {item.id}
            question = {item.question} 
            options = {item.optionsArr}
            handleChosenOption = {(id, optId) => chosen(id, optId)}
            isCheck = {isCheck}
        />
    ))

    return (
        <>
            <img src="./images/blobs (1).png" className="blob1" alt=""></img>
            <Intro
                isStart = {isStart} 
                startQuiz = {() => setIsStart(true)}
            />

            {/* FIXME!!! show it when the quiz is not fetch yet */}
            { quizData === undefined && 
                <div className="intro-container">
                    <ReactLoading type="spinningBubbles" color="#4D5B9E"/>
                </div>
            }
            <div className={`quiz-container ${isStart && 'show'}`}>
                {quizElement}
                    <div className="bottom">
                        {
                            !isCheck ?
                            <button onClick={checkAns}>Check Answer</button> : 
                            <div className="new-game-container">
                                <p>You scored correct {score}/{quizData.length} answers</p>
                                <button onClick={() => setNewGame(true)}>Play Again</button>
                            </div>
                        }
                    </div>
            </div>
            <img src='./images/blobs.png' className="blob2" alt=""></img>
        </>
    )
}