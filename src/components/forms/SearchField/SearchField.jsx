import React from 'react';

export default function SearchField(props) {
  return (
    <div className="field has-addons">
      <div className="control">
        <input className="input is-rounded is-medium" type="text" placeholder="Find your anime"
          value={props.value}
          onChange={props.onChange}
        />
      </div>
      <div className="control">
        <button className="button is-info is-rounded is-medium" onClick={props.onClick}>
          <ion-icon name="search"></ion-icon>
        </button>
      </div>
    </div>
  );
}