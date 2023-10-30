import { useEffect, useState } from "react";
import { nanoid } from "nanoid";
import { encode } from "he";

export default function App() {
    const [quizData, setQuizData] = useState([])
    const [quiz, setQuiz] = useState([])

    useEffect(() => {
        fetch('https://opentdb.com/api.php?amount=5')
        .then(res => res.json())
        .then(data => setQuizData(data.results))
    }, [])

    useEffect(() => {
        const newQuiz = quizData.map(data => {
            const optionsArr = data.incorrect_answers
                                .map(opt => ({
                                    option: encode(opt),
                                    isCorrect: false,
                                    isHeld: false,
                                }))
            optionsArr.push({
                option: encode(data.correct_answer),
                isCorrect: true,
                isHeld: false
            })

            return {
                id: nanoid(),
                question: encode(data.question),
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
}