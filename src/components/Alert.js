import React from 'react';

export default function Alert(props) {
  const alerts = props.message.map((message) =>
    <div key={message} style={{display: props.display}} className="alert alert-danger" role="alert">{message}</div>);
  return (alerts)
}
