import { useState } from 'react';
import './App.css';
import JokeCard from './components/jokeCard.jsx';

import { getAllJokes, getOneJoke, getRandomJoke, addJoke } from './services/api.js'

function App() {
  const [jokes, setJokes] = useState([]);
  const [id, setId] = useState(0);
  const [showForm, setShowForm] = useState(false);
  const [researchForm, setResearchForm] = useState(false);
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');

  const handleJokes = async (ev) => {
    ev.preventDefault();
    setId(false);
    setShowForm(false);
    setResearchForm(false);
    const data = await getAllJokes();
    setJokes(data);
  };

  const handleRandomJoke = async (ev) => {
    ev.preventDefault();
    setShowForm(false)
    setId(false);
    setResearchForm(false);
    const data = await getRandomJoke();
    setJokes([data]);
  };

  const handleIdSubmit = async (ev) => {
    ev.preventDefault();
    const data = await getOneJoke(id);
    setShowForm(false);
    setJokes([data]);
  }

  const handleForm = (ev) => {
    ev.preventDefault();
    setJokes([]);
    setShowForm(true);
  }

  const handleAddJoke = (ev) => {
    ev.preventDefault();
    setId(0);
    setResearchForm(true);
    setShowForm(true)
  }

  const handleAddSubmit = async (ev) => {
    ev.preventDefault();
    if (!setAnswer || !setQuestion) return;
    const data = await addJoke({
      "question": question,
      "answer": answer
    });
    setJokes([data]);
    setAnswer('');
    setQuestion('');
    setResearchForm(false);
    setShowForm(false);
  }

  return (
    <div>
      <h1>Découverte des blagues carambar</h1>
        <main>
        <div className='actions'>
          <h2>Choisissez une action</h2>
          <ul className='actions_list'>
            <li><button onClick={handleJokes}>afficher tout</button></li>
            <li><button onClick={handleForm}>choisir une blague</button></li>
            <li><button onClick={handleRandomJoke}>blague aléatoire</button></li>
            <li><button onClick={handleAddJoke}>ajouter une blague</button></li>
          </ul>
        </div>
        <div className='responses'>
          <h2>Résultats</h2>
          <div className="res">
            {showForm ? (
              researchForm ? (
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
                  <button type='submit'>Chercher la blague</button>
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
                </ul>
              )}
          </div>
        </div>
      </main>
    </div>
    
  )
  
}

export default App
