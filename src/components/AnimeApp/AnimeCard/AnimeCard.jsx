import React from 'react';
import './style.css';
import { LazyLoadImage } from "react-lazy-load-image-component";

export default function AnimeCard(props) {
  return (
    <div className="card anime-card">
      <div className="card-image">
        <figure className="image is-4by5">
          <LazyLoadImage src={props.image} alt={props.altText} threshold="200" />
        </figure>
      </div>
      <div className="card-content">
        <div className="media">
          <div className="media-content">
            <p className="title anime-title">{props.enTitle}</p>
            <p className="subtitle anime-subtitle">{props.jpTitle}</p>
          </div>
        </div>
        <div className="content is-flex is-align-items-end">
          <button className="button is-info is-outlined is-fullwidth is-small"
            onClick={props.action}>More info</button>
        </div>
      </div>
    </div>
  );
}