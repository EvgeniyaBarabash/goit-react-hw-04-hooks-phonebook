import { Component } from 'react';
import { v4 as uuidv4 } from 'uuid';
import './App.css';
import ContactList from './components/ContactList/ContactList';
import initialContacts from './components/ContactList/contacts.json';
import FormEditor from 'components/Form/FormEditor';
import Filter from 'components/Filter/Filter';
class App extends Component {
  state = {
    contacts: initialContacts,
    filter: '',
  };
  addContact = (name, number) => {
    const contact = {
      id: uuidv4(),
      name,
      number,
    };
    if (this.verifyNewContact(name, number)) {
      this.setState(prevState => ({
        contacts: [contact, ...prevState.contacts],
      }));
    }
  };
  verifyNewContact = newName => {
    let verify = true;

    this.state.contacts.forEach(({ name }) => {
      if (name.toLowerCase() === newName.toLowerCase()) {
        alert(`${name} is already in contacts`);
        verify = false;
      }
    });
    return verify;
  };
  deleteContact = contactId => {
    this.setState(prevState => ({
      contacts: prevState.contacts.filter(contact => contact.id !== contactId),
    }));
  };
  changeFilter = e => {
    this.setState({ filter: e.currentTarget.value });
  };
  getVisibleContact = () => {
    const { contacts, filter } = this.state;
    const nomalizedFilter = filter.toLowerCase();
    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(nomalizedFilter),
    );
  };
  render() {
    const { filter } = this.state;
    const visibleContact = this.getVisibleContact();
    return (
      <div className="wrapper">
        <h2 className="title">Phonebook</h2>
        <FormEditor onSubmit={this.addContact} />
        <h2 className="title">Contacts</h2>
        <Filter onChange={this.changeFilter} value={filter} />
        <ContactList
          contacts={visibleContact}
          onDeleteContacts={this.deleteContact}
        />
      </div>
    );
  }
}
export default App;
