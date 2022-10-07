import React from 'react'

export default function Pagination(props) {
  return (
    <nav className="pagination is-centered is-rounded py-3 px-4" role="navigation" aria-label="pagination">
      <a className="pagination-previous"
        onClick={props.toPrevPage}
        disabled={!props.prevButton}
      >Previous</a>
      <a className="pagination-next"
        onClick={props.toNextPage}
        disabled={!props.nextButton}
      >Next page</a>
    </nav>
  );
}