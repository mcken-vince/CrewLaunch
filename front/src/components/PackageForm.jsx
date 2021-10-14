import '../styles/PackageForm.scss';
import { useState } from 'react';

const PackageForm = (props) => {
  const { onSubmit } = props;

  return (
  <div className="package-form-container">
    <h1 className="package-form-title">Package Form</h1>
    <form className="package-form">
      <label for="title">Title:</label>
      <input type="text" id="title" name="title"/><br/><br/>
      <button type="submit" onClick={onSubmit}>Submit</button>
    </form>
  </div>
  );
};

export default PackageForm;