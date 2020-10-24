import React from 'react';
import propTypes from 'prop-types';

export default function Button({onClickHandler, loading, text}) {
  return (
    loading ? (
        <button className="btn btn-primary" type="button" disabled>
          <span className="spinner-grow spinner-grow-sm" role="status" aria-hidden="true"></span>
          Loading...
        </button>)
      : (
        <button onClick={onClickHandler} className="btn btn-primary px-4" type="button">{text}</button>)
  );
}

Button.propTypes = {
  onClickHandler: propTypes.func.isRequired,
  loading: propTypes.bool.isRequired,
  text: propTypes.string.isRequired,
}
