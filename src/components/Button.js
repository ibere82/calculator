import React from 'react';

export default function Button({ buttonOptions, handleButton, cssClass, isAtBegin, isFull }) {
  const { id, label, code, display, handle, posRow, posCol, allowedAtBegin, allowedWhenFull } = buttonOptions;
  const disabled = (!allowedAtBegin && isAtBegin) || (isFull && !allowedWhenFull);

  return (
    <a
      id={id}
      className={`${cssClass} ${disabled ? 'disabled' : `${cssClass}-enabled`}`}
      style={{ gridColumn: posCol, gridRow: posRow }}
      onClick={!disabled ? () => handleButton(handle, code, display) : null}>
      {label}
    </a>
  );
};
