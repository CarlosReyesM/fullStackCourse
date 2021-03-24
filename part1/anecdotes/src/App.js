import React, { useState } from 'react';

const App = ({ anecdotes }) => {
  const points = Array.apply(null, new Array(anecdotes.length)).map(
    Number.prototype.valueOf,
    0,
  );
  const [selected, setSelected] = useState(0);
  const [votes, setVotes] = useState(points);
  const [mostVoted, setMostVoted] = useState();

  const handleClick = () => {
    const randomAnecdote = Math.floor(Math.random() * 6);
    setSelected(randomAnecdote);
  };

  const handleVote = () => {
    const newVotes = [...votes];
    newVotes[selected] = votes[selected] + 1;
    setVotes(newVotes);
    const maxVale = newVotes.indexOf(Math.max(...newVotes));
    setMostVoted(maxVale);
  };

  return (
    <div>
      <h1>Anecdote of the day</h1>
      <p>{anecdotes[selected]}</p>
      <p>Has {votes[selected]} votes</p>
      <br /> <button onClick={handleVote}>Vote</button>
      <button onClick={handleClick}>Next Anecdote</button>
      <br />
      {mostVoted >= 0 && (
        <div>
          <h2>Anecdote with more votes</h2>
          <p>{anecdotes[mostVoted]}</p>
          <p>Has {votes[mostVoted]} Votes</p>
        </div>
      )}
    </div>
  );
};

export default App;
