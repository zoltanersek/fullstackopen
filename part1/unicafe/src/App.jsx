import { useState } from 'react'

const Button = ({text, onClick}) => {
    return (
        <button onClick={onClick}>{text}</button>
    )
}

const GiveFeedback = ({good, neutral, bad, setGood, setNeutral, setBad}) => {
    return (
        <div>
            <h1>give feedback</h1>
            <p>
                <Button text='good' onClick={() => setGood(good + 1)} />
                <Button text='neutral' onClick={() => setNeutral(neutral + 1)} />
                <Button text='bad' onClick={() => setBad(bad + 1)} />
            </p>
        </div>
    )
}

const StatisticLine = ({text, value}) => {
    return (
        <tr>
            <td>{text}</td>
            <td>{value}</td>
        </tr>
    )
}

const Statistics = ({good, neutral, bad}) => {
    if (good === 0 && neutral === 0 && bad === 0) {
        return (
            <div>
                <h1>statistics</h1>
                <div>no feedback given</div>
            </div>
        )
    } else {
        const all = good + neutral + bad
        const average = (good - bad) / all
        const positive = good / all
        return (
            <div>
                <h1>statistics</h1>
                <table>
                    <tbody>
                        <StatisticLine text='good' value={good} />
                        <StatisticLine text='neutral' value={neutral} />
                        <StatisticLine text='bad' value={bad} />
                        <StatisticLine text='all' value={all} />
                        <StatisticLine text='average' value={average} />
                        <StatisticLine text='positive' value={`${positive} %`} />
                    </tbody>
                </table>
            </div>
        )
    }
}

const App = () => {
    // save clicks of each button to its own state
    const [good, setGood] = useState(0)
    const [neutral, setNeutral] = useState(0)
    const [bad, setBad] = useState(0)

    return (
        <div>
            <GiveFeedback good={good} neutral={neutral} bad={bad} setGood={setGood} setNeutral={setNeutral} setBad={setBad} />
            <Statistics good={good} neutral={neutral} bad={bad} />
        </div>
    )
}

export default App