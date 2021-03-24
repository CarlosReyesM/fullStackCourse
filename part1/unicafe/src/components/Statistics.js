import React from 'react';
import Statistic from './Statistic';

const Statistics = (props) => {
  return (
    <>
    <h2>Statistics</h2>
      {props.all ? (
        <table>
          <tbody>
            <Statistic text='Good' value={props.good} />
            <Statistic text='Neutral' value={props.neutral} />
            <Statistic text='Bad' value={props.bad} />
            <Statistic text='All' value={props.all} />
            <Statistic text='Average' value={props.average} />
            <Statistic text='Positive' value={props.positive} percent />
          </tbody>
        </table>
      ) : (
        <h3>No Feedback given</h3>
      )}
    </>
  );
};

export default Statistics;
