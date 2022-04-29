import './App.css'
import { useState, useEffect } from 'react'
import Card from './Components/Card'

const cardImages = [
    { "src": "/images/ironman.jpg", matched: false },
    { "src": "/images/captianAmerica.jpg", matched: false },
    { "src": "/images/blackWidow.jpg", matched: false },
    { "src": "/images/thor.jpg", matched: false },
    { "src": "/images/hulk.jpg", matched: false },
    { "src": "/images/hawkeye.jpg", matched: false },
]

function App() {
    const [cards, setCards] = useState([])
    const [turns, setTurns] = useState(0)
    const [choiceOne, setChoiceOne] = useState(null)
    const [choiceTwo, setChoiceTwo] = useState(null)
    const [disabled, setDisabled] = useState(false)

    const shuffleCards = () => {
        const shuffledCards = [...cardImages, ...cardImages]
            .sort(() => Math.random() - 0.5)
            .map((card) => ({ ...card, id: Math.random() }))
        setChoiceOne(null)
        setChoiceTwo(null)
        setCards(shuffledCards)
        setTurns(0)
    }

    const choiceHandler = (card) => {
        choiceOne ? setChoiceTwo(card) : setChoiceOne(card)
    }

    useEffect(() => {

        if (choiceOne && choiceTwo) {
            setDisabled(true)
            if (choiceOne.src === choiceTwo.src) {
                setCards(prevCards => {
                    return prevCards.map(card => {
                        if (card.src === choiceOne.src) {
                            return { ...card, matched: true }
                        } else {
                            return card
                        }
                    })
                })
                reset()
            }
            else {
                setTimeout(() => reset(), 1000)
            }
        }
    }, [choiceOne, choiceTwo])

    // console.log(cards)

    useEffect(() => {
        shuffleCards()
    }, [])

    const reset = () => {
        setChoiceOne(null)
        setChoiceTwo(null)
        setTurns(prevTurns => prevTurns + 1)
        setDisabled(false)
    }
    return (
        <div className="App">
            <h1>Match The Characters</h1>
            <button onClick={shuffleCards}>New Game (Shuffle Tiles)</button>
            <div className="card-grid">
                {cards.map(card => (
                    <Card key={card.id} card={card} choiceHandle={choiceHandler}
                        flipped={card === choiceOne || card === choiceTwo || card.matched}
                        disabled={disabled} />
                ))}
            </div>
            <p>Turns: {turns}</p>
            
        </div>
    );
}

export default App