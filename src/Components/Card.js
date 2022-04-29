import './Card.css'

const Card = (props) => {

    const clickHandler = () => {
        if (!props.disabled) {
            props.choiceHandle(props.card)
        }

    }

    return (
        <div className='card'>
            <div className={props.flipped ? "flipped" : ""}>
                <img className='front' src={props.card.src} />
                <img className='back' src="/images/marvel_logo.jpg" onClick={clickHandler} />
            </div>
        </div>
    )
}

export default Card