import React from 'react';

export default function AnimeTabs(props) {
  const isActive = (option) => {
    return props.actualTab === option ? 'is-active' : '';
  }
  return (
    <div className="tabs is-centered">
      <ul>
        {
          props.tabOptions.map((tab, i) => (
            <li key={tab.value + i} className={isActive(tab.value)}>
              <a onClick={() => props.handleTab(tab.value)}>
                {tab.icon && <span className="icon is-small"><ion-icon name={tab.icon}></ion-icon></span>}
                <span>{tab.name}</span>
              </a>
            </li>
          ))
        }
      </ul>
    </div>
  );
}