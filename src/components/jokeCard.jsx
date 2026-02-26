const JokeCard = ({joke}) => {
    if (!joke) return null;
    return (
        <div>
            <h3>blague n° {joke.id}</h3>
            <p>Question: {joke.question}</p>
            <p>Réponse: {joke.answer}</p>
        </div>
    );
};

export default JokeCard;