import React from 'react';

const FormInput = ({ text, type, handleChange, value }) => {
  return (
    <div>
      {text} <input type={type} onChange={handleChange} value={value} />
    </div>
  );
};

export default FormInput;
