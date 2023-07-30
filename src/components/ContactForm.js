import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Form, Label, Input, Button } from './Phonebook styled';

const ContactForm = ({ onAddContact }) => {
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');
  const [isNameValid, setIsNameValid] = useState(true);
  const [isNumberValid, setIsNumberValid] = useState(true);

  const handleChange = (event) => {
    const { name, value } = event.target;
    if (name === 'name') {
      setName(value);
      setIsNameValid(true);
    } else if (name === 'number') {
      setNumber(value);
      setIsNumberValid(true);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const namePattern = /^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$/;
    const numberPattern = /^[0-9]{3}-[0-9]{2}-[0-9]{2}$/;

    if (!name || !namePattern.test(name)) {
      setIsNameValid(false);
      return;
    }

    if (!number || !numberPattern.test(number)) {
      setIsNumberValid(false);
      return;
    }

    onAddContact(name, number);
    setName('');
    setNumber('');
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Label>
        Name
        <Input
          type="text"
          name="name"
          value={name}
          onChange={handleChange}
          $isValid={isNameValid}
          required
        />
        {!isNameValid && <div style={{ color: 'red' }}>Please enter a valid name</div>}
      </Label>
      <Label>
        Number
        <Input
          type="tel"
          name="number"
          value={number}
          onChange={handleChange}
          $isValid={isNumberValid}
          required
        />
        {!isNumberValid && <div style={{ color: 'red' }}>Please enter a valid number XXX-XX-XX</div>}
      </Label>
      <Button type="submit">Add contact</Button>
    </Form>
  );
};

ContactForm.propTypes = {
  onAddContact: PropTypes.func.isRequired,
};

export default ContactForm;
