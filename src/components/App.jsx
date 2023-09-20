import React, { useState, useEffect, useMemo } from 'react';
import { ContactForm } from "./ContactForm/ContactForm";
import { ContactList } from "./ContactList/ContactList";
import { Filter } from "./Filter/Filter";
import { nanoid } from 'nanoid';
import { MainTitle } from "./ContactForm/ContactForm.styled";
import { Title } from "./ContactList/ContactList.styled";

export const App = () => {
  const [contacts, setContacts] = useState(() => {
    const savedContacts = localStorage.getItem('contacts');
    return savedContacts ? JSON.parse(savedContacts) : [
      { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
      { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
      { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
      { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
    ];
  });

  const [filter, setFilter] = useState('');

  useEffect(() => {
    localStorage.setItem('contacts', JSON.stringify(contacts));
  }, [contacts]);

  const addContact = newContact => {
    const oldContact = contacts.some(
      contact => contact.name.toLowerCase() === newContact.name.toLowerCase()
    );

    if (!oldContact) {
      setContacts(prevContacts => [
        ...prevContacts,
        { id: nanoid(), ...newContact },
      ]);
    } else {
      alert(`${newContact.name} is already in contacts.`);
    }
  };

  const deleteContact = contactId => {
    setContacts(prevContacts => prevContacts.filter(contact => contact.id !== contactId));
  };

  const onChangeFilter = newFilter => {
    setFilter(newFilter);
  };

  const searchContact = useMemo(() =>
    contacts.filter(cont =>
      cont.name.toLowerCase().includes(filter.toLowerCase())
    ), [contacts, filter]);

  return (
    <div>
      <MainTitle>Phonebook</MainTitle>
      <ContactForm onAdd={addContact} />

      <Title>Contacts</Title>
      <Filter filter={filter} onChangeFilter={onChangeFilter} />
      <ContactList items={searchContact} onDelete={deleteContact} />
    </div>
  );
};
