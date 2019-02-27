/* eslint-disable react/prefer-stateless-function */
import React from 'react';
import './App.css';
import PropTypes from 'prop-types';

export default class App extends React.Component {
  constructor() {
    super();
    this.state = {};
  }

  componentDidMount() {
    const { initialValue } = this.props;
    this.reload(initialValue);
  }

  componentDidUpdate(_prevProps, prevState) {
    const { id: oldId } = prevState;
    const { id } = this.state;
    if (oldId !== id) {
      this.reload(id);
    }
  }

  reload(value) {
    fetch(`/api/vals/${value || 'Nothing'}`).then(async data => {
      if (data.ok) {
        this.setState({
          data: await data.text(),
          error: null
        });
      } else {
        this.setState({ error: data.statusText, data: null });
      }
    });
  }

  render() {
    const { data, error } = this.state;
    return (
      <span className="app-container">
        <div>
          <input
            onChange={ev => this.setState({ id: ev.target.value })}
            placeholder="Load from server?"
          />
        </div>
        <h2>{error != null ? 'Error' : 'Contrivy'}</h2>
        <div>{error != null ? 'Error Occured' : data}</div>
      </span>
    );
  }
}

App.propTypes = {
  initialValue: PropTypes.string.isRequired
};
