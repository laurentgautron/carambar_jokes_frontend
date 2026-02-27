import { useState } from 'react';
import './App.css';
import JokeCard from './components/jokeCard.jsx';

import { getAllJokes, getOneJoke, getRandomJoke, addJoke } from './services/api.js'

function App() {
  const [jokes, setJokes] = useState([]);
  const [id, setId] = useState(0);
  const [showForm, setShowForm] = useState(false);
  const [jokeForm, setJokeForm] = useState(false);
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');
  const [error, setError] = useState('')

  const handleJokes = async (ev) => {
    ev.preventDefault();
    setId(false);
    setShowForm(false);
    setJokeForm(false);
    setError('');
    try {
      const data = await getAllJokes();
      setJokes(data);
    } catch (error) {
      setError(error.message);
    };
  };

  const handleRandomJoke = async (ev) => {
    ev.preventDefault();
    setShowForm(false)
    setId(false);
    setError('');
    try {
      const data = await getRandomJoke();
      setJokes([data]);
    } catch (error) {
      setError(error.message);
    };
  };

  const handleIdSubmit = async (ev) => {
    ev.preventDefault();
    setJokeForm(false);
    setShowForm(true);
    setError('');
    setJokes([]);
    try {
      const data = await getOneJoke(id);
      setShowForm(false);
      setJokes([data]);
    } catch (error) {
      setJokes([]);
      setError(error.message);
    };
  }

  const handleChooseForm = (ev) => {
    ev.preventDefault();
    setJokes([]);
    setShowForm(true);
    setJokeForm(false);
    setError('');
  }

  const handleAddJoke = (ev) => {
    ev.preventDefault();
    setId(0);
    setJokeForm(true);
    setShowForm(true);
    setError('');
  }

  const handleAddSubmit = async (ev) => {
    ev.preventDefault();
    setError('');
    if (!setAnswer || !setQuestion) return;
    try {
      const data = await addJoke({
      "question": question,
      "answer": answer
      });
      setJokes([data]);
      setAnswer('');
      setQuestion('');
      setJokeForm(false);
      setShowForm(false);
    } catch (error) {
      setError(error.message);
    };  
  }

  return (
    <div>
      <h1>Découverte des blagues carambar</h1>
        <main>
        <div className='actions'>
          <h2>Choisissez une action</h2>
          <ul className='actions_list'>
            <li><button onClick={handleJokes}>afficher tout</button></li>
            <li><button onClick={handleChooseForm}>choisir une blague</button></li>
            <li><button onClick={handleRandomJoke}>blague aléatoire</button></li>
            <li><button onClick={handleAddJoke}>ajouter une blague</button></li>
          </ul>
        </div>
        <div className='responses'>
          <h2>Résultats</h2>
          <div className="res">
            {error && <p className="error">{error ? error : '\u00A0'}</p>}
            {showForm ? (
              jokeForm ? (
                <form className='addJoke' onSubmit={handleAddSubmit}>
                  <label htmlFor="jokeQuestion">Question:</label>
                  <input 
                    type="text"
                    name='jokeQuestion'
                    onChange={(e) => setQuestion(e.target.value)}
                    value={question}
                  />
                  <label htmlFor="jokeAnswer">Réponse:</label>
                  <input 
                    type="text"
                    name="jokeAnswer"
                    value={answer}
                    onChange={(e) => setAnswer(e.target.value)}
                  />
                  <button type='submit'>Ajouter</button>
                </form>
              ): (
                <form className="jokeform" onSubmit={handleIdSubmit}>
                  <label htmlFor="jokeId">Entrer un numéro de blague:</label>
                  <input 
                    type="number"
                    name="jokeId"
                    value={id}
                    onChange={(e) => setId(Number(e.target.value))}
                  />
                  <button type='submit'>Chercher la blague</button>:
                </form>
              )   
            ):(<ul className={`jokes_list ${jokes.length === 1 ? "single": ""}`}>
                {jokes && jokes.map(joke => {
                  return (
                    <li key={joke.id}>
                      <article>
                        <JokeCard joke={joke}/>
                      </article>
                    </li>
                  );
                })}
                {jokes.length === 1 && jokeForm ?
                  <button onClick={handleChooseForm}>Choisir une autre blague</button>:
                  <button onClick={handleAddJoke}>Ajouter une autre blague</button>
                }
                </ul>
              )}
          </div>
        </div>
      </main>
    </div>
    
  )
  
}

export default App
