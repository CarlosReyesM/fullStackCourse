import React from 'react';
import FormInput from './FormInput';
import SubmitButton from './SubmitButton';

const Form = ({
  handleSubmit,
  handleNameChange,
  handleNumberChange,
  newName,
  newNumber,
}) => {
  return (
    <form onSubmit={handleSubmit}>
      <FormInput
        text='Name'
        type='text'
        handleChange={handleNameChange}
        value={newName}
      />
      <FormInput
        text='Number'
        type='text'
        handleChange={handleNumberChange}
        value={newNumber}
      />
      <SubmitButton text='Add Person' />
    </form>
  );
};

export default Form;
