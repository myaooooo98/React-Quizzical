import React from "react"
import Intro from "./components/Intro"

export default function App() {
    function startQuiz() {
        const styles = {
            display: 'none'
        }
        return styles
    }

    return (
        <div>
            <img src="./images/blobs (1).png" className="blob1"></img>
            <Intro 
                handleClick = {startQuiz}
            />
            <img src='./images/blobs.png' className="blob2"></img>
        </div>
    )
}