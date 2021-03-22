import React from 'react';

export default function Display({ expression, partialResult, error }) {

  const fontSize = expression.toString().length > 12 ? '1.8em' : '2.5em';
  return (
    <div className={`display ${error ? 'error-display' : ''}`}>
      <div className="expression" style={{ fontSize: fontSize }}>{expression}</div><br />
      <div className="partial-result">{partialResult}</div>
    </div >
  );
};
