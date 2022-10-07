import React, { useEffect, useState } from 'react'
import AnimeCard from '../AnimeCard/AnimeCard';
import './style.css';

import JikanService from '@services/JikanAPI/JikanAPI.service.js';
import SearchField from '../../forms/SearchField/SearchField';
import SelectInput from '../../forms/SelectInput/SelectInput';
import Pagination from '../../navigation/Pagination/Pagination';
import Tab from '../../navigation/Tab/Tab';

export default function TopAnimeList() {
  const service = new JikanService();
  const orderOptions = [
    { name: 'Title', value: 'title' },
    { name: 'Type', value: 'type' },
  ]
  const sortOptions = [
    { name: 'Asc', value: 'asc' },
    { name: 'Desc', value: 'desc' },
  ];
  const typeOptions = [
    { name: 'TV', value: 'tv' },
    { name: 'Movie', value: 'movie' },
    { name: 'Ova', value: 'ova' },
    { name: 'Special', value: 'special' },
    { name: 'Ona', value: 'ona' },
    { name: 'Music', value: 'music' },
  ];

  const tabOptions = [
    { name: 'All', value: 'all' },
    { name: 'Airing', value: 'airing', icon: 'radio' },
    { name: 'Upcoming', value: 'upcoming', icon: 'rocket' }
  ];

  const [animeList, setAnimeList] = useState([]);
  const [searchBy, setSearchBy] = useState('');
  const [filterType, setFilterType] = useState('');
  const [orderBy, setOrderBy] = useState('');
  const [sortBy, setSortBy] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [actualTab, setActualTab] = useState('all');

  const [actualPage, setActualPage] = useState(1);
  const [lastPage, setLastPage] = useState(0);
  const [prevButton, setPrevButton] = useState(false);
  const [nextButton, setNextButton] = useState(false);

  const handleInput = (event, setter) => {
    let value = event.target.value;
    setter(value);
  };

  const handleTab = (tab) => {
    setActualTab(tab);
  }

  const reset = () => {
    setSearchBy('');
    setSortBy('');
    setFilterType('');
    setOrderBy('');
    setActualPage(1);
    setLastPage(0);
    setPrevButton(false);
    setNextButton(false);
    setIsSearching(false);
  };

  const search = () => {
    service.getAnime({ type: filterType, order_by: orderBy, sort: sortBy, q: searchBy, status: actualTab, page: actualPage })
      .then((data) => {
        let paginationInfo = data.pagination;
        setActualPage(paginationInfo.current_page);
        setLastPage(paginationInfo.last_visible_page);
        setAnimeList(data.data);
      });
  };

  const toPrevPage = () => {
    if (actualPage === 1) return;
    setActualPage(actualPage - 1);
    window.scrollTo(0, 0);
  }
  const toNextPage = () => {
    if (actualPage === lastPage) return;
    setActualPage(actualPage + 1);
    window.scrollTo(0, 0);
  }

  useEffect(() => {
    service.getAnime()
      .then((data) => {
        let paginationInfo = data.pagination;
        setActualPage(paginationInfo.current_page);
        setLastPage(paginationInfo.last_visible_page);
        setAnimeList(data.data);
      });
  }, []);

  useEffect(() => {
    if (actualPage === 1) setPrevButton(false); else setPrevButton(true);
    if (actualPage === lastPage) setNextButton(false); else setNextButton(true);
  }, [actualPage]);

  useEffect(() => {
    search();
  }, [filterType, orderBy, sortBy, actualTab, actualPage]);

  useEffect(() => {
    if (searchBy === '' && filterType === '' && orderBy === '' && sortBy === '') return;
    setIsSearching(true);
  }, [searchBy, filterType, orderBy, sortBy]);

  return (
    <div className="columns">
      <div className="column is-one-third side-column-parent">
        <div className='has-background-info-light is-flex is-flex-direction-column px-5 py-6 side-column'>
          <div className="sticky">
            <div className='py-6'>
              <SearchField
                value={searchBy}
                onChange={(e) => handleInput(e, setSearchBy)}
                onClick={search}
              />
            </div>
            <div className="is-flex is-justify-content-center is-align-items-center mb-3">
              <SelectInput title='type'
                nameIcon="videocam"
                options={typeOptions}
                value={filterType}
                onChange={(e) => handleInput(e, setFilterType)}
              />
              <SelectInput title='oder by'
                nameIcon="funnel"
                options={orderOptions}
                value={orderBy}
                onChange={(e) => handleInput(e, setOrderBy)}
              />
              {isSearching && <button className="delete" onClick={reset}></button>}
            </div>
            <div className="is-flex is-justify-content-center">
              <SelectInput title='sort'
                nameIcon="swap-vertical"
                options={sortOptions}
                value={sortBy}
                onChange={(e) => handleInput(e, setSortBy)}
              />
            </div>
          </div>
        </div>
      </div>
      <div className="column pt-5">
        <Tab actualTab={actualTab} tabOptions={tabOptions} handleTab={handleTab} />
        <div className='columns is-multiline is-mobile is-justify-content-center gap'>
          {
            animeList.map(anime => (
              <AnimeCard
                key={anime.mal_id}
                enTitle={anime.title}
                jpTitle={anime.title_japanese}
                image={anime.images.jpg.image_url}
                altText={anime.title}
              />
            ))
          }
        </div>
        <Pagination
          prevButton={prevButton}
          nextButton={nextButton}
          toPrevPage={toPrevPage}
          toNextPage={toNextPage}
        />
      </div>
    </div>
  );
}