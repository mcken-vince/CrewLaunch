import '../styles/ContractForm.scss';
import { useState } from 'react';

const ContractForm = (props) => {
  const { onSubmit } = props;

  return (
  <div className="contract-form-container">
    <h1 className="contract-form-title">Contract Form</h1>
    <form className="contract-form">
      <label for="title">Title:</label>
      <input type="text" id="title" name="title"/><br/><br/>
      <button type="submit" onClick={onSubmit}>Submit</button>
    </form>
  </div>
  );
};

export default ContractForm;