import React from 'react';
import PropTypes from 'prop-types';
import s from './Filter.module.css';
const Filter = ({ value, onChange }) => (
  <label className={s.label}>
    Фильтр по имени
    <input type="text" value={value} onChange={onChange} className={s.input} />
  </label>
);
Filter.propTypes = {
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};
export default Filter;
