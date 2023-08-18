import React from "react"
import Intro from "./components/Intro"

export default function App() {
    const [isStartQuiz, setIsStartQuiz] = React.useState(false)

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
            <img src='./images/blobs.png' className="blob2"></img>
        </div>
    )
}