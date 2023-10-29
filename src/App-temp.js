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
        setQuiz(
            quizData.map(data => ({
                id: nanoid(),
                question: encode(data.question)
            }))
        )
    }, quizData)

    function shuffleArray(arr) {
        for (let i = arr.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1)); // Generate a random index
          [arr[i], arr[j]] = [arr[j], arr[i]]; // Swap elements
        }
        return arr
    }
}