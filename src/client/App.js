/* eslint-disable react/prefer-stateless-function */
import React, { useState, useEffect } from 'react';
import './App.css';
import { PropTypes } from 'prop-types';

function useServer(initialValue) {
  const [data, setData] = useState();
  const [error, setError] = useState();
  const [id, setId] = useState();

  function reload(value) {
    const newTimer = setTimeout(() => {
      fetch(`/api/vals/${value || 'XX'}`).then(async resp => {
        if (resp.ok) {
          setData(await resp.text());
          setError(null);
        } else {
          setData(null);
          setError(resp.statusText);
        }
      });
    }, 1000);

    return () => {
      clearTimeout(newTimer);
    };
  }

  useEffect(() => {
    return reload(id || initialValue);
  }, [id]);

  return { data, error, setId };
}

export default function App({ initialValue }) {
  const { data, error, setId } = useServer(initialValue);

  return (
    <span className="app-container">
      <div>
        <input
          onChange={ev => setId(ev.target.value)}
          placeholder="Load from server?"
        />
      </div>
      <h2>{error != null ? 'Error' : 'Contrivy'}</h2>
      <div>{error != null ? 'Error Occured' : data}</div>
    </span>
  );
}

App.propTypes = {
  initialValue: PropTypes.string.isRequired
};
