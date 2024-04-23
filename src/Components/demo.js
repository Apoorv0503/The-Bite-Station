import React, { useState, useCallback } from 'react';

const Demo = () => {
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  });
  const [formErrors, setFormErrors] = useState({});

  // Define a validation function using useCallback
  const validateForm = useCallback(() => {
    // const validateForm = () => {
        console.log("validate-form triggered");
    let errors = {};
    if (formData.username.trim() === '') {
      errors.username = 'Username is required';
    }
    if (formData.password.trim() === '') {
      errors.password = 'Password is required';
    }
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  }
  , [formData]);

  const handleSubmit = (event) => {
    console.log("handleSubmit triggered");
    event.preventDefault();
    const isValid = validateForm();
    if (isValid) {
      // Submit the form
      console.log('Form submitted:', formData);
    } else {
      console.log('Form validation failed');
    }
  };

  const handleChange = (event) => {
    // console.log("handle change triggers");
    const { name, value } = event.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Username:</label>
          <input type="text" name="username" value={formData.username} onChange={handleChange} />
          {formErrors.username && <span style={{ color: 'red' }}>{formErrors.username}</span>}
        </div>
        <div>
          <label>Password:</label>
          <input type="password" name="password" value={formData.password} onChange={handleChange} />
          {formErrors.password && <span style={{ color: 'red' }}>{formErrors.password}</span>}
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default Demo;
