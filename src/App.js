import React from 'react';
import AnimeList from './components/AnimeApp/AnimeList/AnimeList';

class App extends React.Component {
  render() {
    return (
      <>
        <section className="hero is-info">
          <div className="hero-body">
            <p className="title is-1">
              Anime Search App
            </p>
            <p className="subtitle">
              What's your next anime to watch?
            </p>
          </div>
        </section>
        <AnimeList />
      </>
    );
  }
}

export default App;