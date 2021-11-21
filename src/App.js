import { useState} from 'react';
import { v4 as uuidv4 } from 'uuid';
import './App.css';
import ContactList from './components/ContactList/ContactList';
import initialContacts from './components/ContactList/contacts.json';
import FormEditor from 'components/Form/FormEditor';
import Filter from 'components/Filter/Filter';
import { useLocalStorage } from 'hooks/useLocalStorage';
export default function App() {
  const [contacts, setContacts] = useLocalStorage('contacts', initialContacts);
  const [filter, setFilter] = useState('');

  const addContact = ({ name, number }) => {
    const contact = {
      id: uuidv4(),
      name,
      number,
    };
    if (verifyNewContact(name)) {
      setContacts(prevState => [contact, ...prevState]);
    }
  };
  const verifyNewContact = newName => {
    let verify = true;
    contacts.forEach(({ name }) => {
      if (name.toLowerCase() === newName.toLowerCase()) {
        alert(`${name} is already in contacts`);
        verify = false;
      }
    });
    return verify;
  };
  const deleteContact = contactId => {
    setContacts(contacts =>
      contacts.filter(contact => contact.id !== contactId),
    );
  };
  const changeFilter = e => {
    setFilter(e.currentTarget.value);
  };

  const getVisibleContact = () => {
    const nomalizedFilter = filter.toLowerCase().trim();
    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(nomalizedFilter),
    );
  };
  return (
    <div className="wrapper">
      <h2 className="title">Phonebook</h2>
      <FormEditor onSubmit={addContact} />
      <h2 className="title">Contacts</h2>
      <Filter onChange={changeFilter} value={filter} />
      <ContactList
        contacts={getVisibleContact()}
        onDeleteContacts={deleteContact}
      />
    </div>
  );
}
