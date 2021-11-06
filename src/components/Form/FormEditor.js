import { Component } from 'react';
import s from './FormEditor.module.css';
class FormEditor extends Component {
  state = {
    name: '',
    number: '',
  };
  handleChange = e => {
    this.setState({ [e.currentTarget.name]: e.currentTarget.value });
  };
  handleSubmit = e => {
    e.preventDefault();
    this.props.onSubmit(this.state.name, this.state.number);
    this.setState({ name: '', number: '' });
  };
  render() {
    return (
      <form onSubmit={this.handleSubmit} className={s.form}>
        <label className={s.title} htmlFor="user-name">
          Name
        </label>
        <input
          type="text"
          name="name"
          pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
          title="Имя может состоять только из букв, апострофа, тире и пробелов. Например Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan и т. п."
          required
          onChange={this.handleChange}
          value={this.state.name}
          id="user-name"
          className={s.input}
        />

        <label className={s.title} htmlFor="user-number">
          Number
        </label>
        <input
          type="tel"
          name="number"
          pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
          title="Номер телефона должен состоять цифр и может содержать пробелы, тире, круглые скобки и может начинаться с +"
          required
          onChange={this.handleChange}
          value={this.state.number}
          id="user-number"
          className={s.input}
        />

        <button type="submit" onClick={this.addContact} className={s.btn}>
          Add Contact
        </button>
      </form>
    );
  }
}
export default FormEditor;
