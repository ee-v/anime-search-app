import React from 'react';

export default function SelectInput(props) {
  return (
    <div className="control has-icons-left mr-3">
      <span className="select">
        <select onChange={props.onChange} value={props.value}>
          <option defaultValue={''} disabled value="">{props.title}</option>
          {
            props.options.map((option, i) => (
              <option key={option + i} value={option.value}>{option.name}</option>
            ))
          }
        </select>
      </span>
      <span className="icon is-left">
        <ion-icon name={props.nameIcon}></ion-icon>
      </span>
    </div>
  );
}