import React, { useState } from 'react';
import Button from './components/Button';
import Statistics from './components/Statistics';

const App = () => {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  const all = good + neutral + bad;
  const average = good - bad;
  const positive = (good / all) * 100;

  const handleGood = () => setGood(good + 1);
  const handleNeutral = () => setNeutral(neutral + 1);
  const handleBad = () => setBad(bad + 1);

  return (
    <>
      <h1>Give Feedback</h1>
      <br />
      <div>
        <Button text='Good' handleClick={handleGood} />
        <Button text='Neutral' handleClick={handleNeutral} />
        <Button text='Bad' handleClick={handleBad} />
      </div>
      <br />
      <Statistics
        good={good}
        neutral={neutral}
        bad={bad}
        all={all}
        average={average}
        positive={positive}
      />
    </>
  );
};

export default App;
