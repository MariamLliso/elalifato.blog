import { useEffect, useRef, useState, useCallback, useContext } from 'react';
import Link from 'next/link';

import useSite from 'hooks/use-site';
import useSearch, { SEARCH_STATE_LOADED } from 'hooks/use-search';
import { postPathBySlug } from 'lib/posts';

import Section from 'components/Section';

import styles from './Nav.module.scss';
import Logo from 'components/Logo/Logo';
import Button from 'components/Button/Button';
import Icon from 'components/Icon/Icon';
import DeviceContext from 'context/DeviceContext';

const SEARCH_VISIBLE = 'visible';
const SEARCH_HIDDEN = 'hidden';

const MENU_VISIBLE = 'visible';
const MENU_HIDDEN = 'hidden';

const Nav = () => {
  const isFeatureSearchEnable = process.env.NEXT_PUBLIC_FEATURE_FLAG_SEARCH === 'enable';

  const formRef = useRef();
  const menuRef = useRef();
  const menuButtonRef = useRef();
  const { isMobile } = useContext(DeviceContext);

  const [searchVisibility, setSearchVisibility] = useState(SEARCH_HIDDEN);
  const [menuVisibility, setMenuVisibility] = useState('');

  const { metadata = {} } = useSite();
  const { title } = metadata;

  const { query, results, search, clearSearch, state } = useSearch({
    maxResults: 5,
  });

  const searchIsLoaded = state === SEARCH_STATE_LOADED;

  useEffect(() => {
    if (isMobile) return setMenuVisibility(MENU_HIDDEN);
    return setMenuVisibility(MENU_VISIBLE);
  }, [isMobile]);

  useEffect(() => {
    if (searchVisibility === SEARCH_HIDDEN) {
      removeDocumentOnClick();
      return;
    }

    addDocumentOnClick();
    addResultsRoving();

    const searchInput = Array.from(formRef.current.elements).find((input) => input.type === 'search');

    searchInput.focus();

    return () => {
      removeResultsRoving();
      removeDocumentOnClick();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchVisibility]);

  useEffect(() => {
    if (menuVisibility === MENU_HIDDEN) {
      removeDocumentOnClick();
      return;
    }

    addDocumentOnClick();
    addResultsRoving();

    return () => {
      removeResultsRoving();
      removeDocumentOnClick();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [menuVisibility]);

  function addDocumentOnClick() {
    document.body.addEventListener('click', handleOnDocumentClick, true);
  }

  function removeDocumentOnClick() {
    document.body.removeEventListener('click', handleOnDocumentClick, true);
  }

  function handleOnDocumentClick(e) {
    if (!isMobile) return;
    if (
      !e.composedPath().includes(formRef.current) &&
      !e.composedPath().includes(menuRef.current) &&
      !e.composedPath().includes(menuButtonRef.current)
    ) {
      setSearchVisibility(SEARCH_HIDDEN);
      setMenuVisibility(MENU_HIDDEN);
      clearSearch();
    }
  }

  function handleOnSearch({ currentTarget }) {
    search({
      query: currentTarget.value,
    });
  }

  function handleOnToggleSearch() {
    setSearchVisibility(SEARCH_VISIBLE);
  }

  function handleOnToggleMenu() {
    setMenuVisibility(menuVisibility === MENU_VISIBLE ? MENU_HIDDEN : MENU_VISIBLE);
  }

  function addResultsRoving() {
    document.body.addEventListener('keydown', handleResultsRoving);
  }

  function removeResultsRoving() {
    document.body.removeEventListener('keydown', handleResultsRoving);
  }

  function handleResultsRoving(e) {
    const focusElement = document.activeElement;

    if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (focusElement.nodeName === 'INPUT' && focusElement.nextSibling.children[0].nodeName !== 'P') {
        focusElement.nextSibling.children[0].firstChild.firstChild.focus();
      } else if (focusElement.parentElement.nextSibling) {
        focusElement.parentElement.nextSibling.firstChild.focus();
      } else {
        focusElement.parentElement.parentElement.firstChild.firstChild.focus();
      }
    }

    if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (focusElement.nodeName === 'A' && focusElement.parentElement.previousSibling) {
        focusElement.parentElement.previousSibling.firstChild.focus();
      } else {
        focusElement.parentElement.parentElement.lastChild.firstChild.focus();
      }
    }
  }

  const escFunction = useCallback((event) => {
    if (event.keyCode === 27) {
      clearSearch();
      setSearchVisibility(SEARCH_HIDDEN);
      setMenuVisibility(MENU_HIDDEN);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    document.addEventListener('keydown', escFunction, false);

    return () => {
      document.removeEventListener('keydown', escFunction, false);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  console.log(menuVisibility);

  return (
    <nav className={styles.nav}>
      <Section className={styles.nav__section}>
        <div
          className={`${styles.nav__logo} ${
            isMobile && menuVisibility == MENU_VISIBLE ? styles.nav__logo_marginBottom : ''
          }`}
        >
          <Link href="/">
            <Logo title={title} />
          </Link>
          {isMobile && (
            <Button ref={menuButtonRef} iconLeftName={'menu'} iconSize={'large'} onClick={handleOnToggleMenu} />
          )}
        </div>
        {menuVisibility === MENU_VISIBLE && (
          <div ref={menuRef} className={styles.nav__menu}>
            <ul className={styles.nav__menuLinks}>
              <li>
                <Button href="/">Inicio</Button>
              </li>
              <li>
                <Button href="/posts/">Blog</Button>
              </li>
              <li>
                <Button>Sobre mi</Button>
              </li>
            </ul>
          </div>
        )}
        {isFeatureSearchEnable && (
          <div className={styles.navSearch}>
            {searchVisibility === SEARCH_HIDDEN && (
              <Button onClick={handleOnToggleSearch} disabled={!searchIsLoaded}>
                <span className="sr-only">Toggle Search</span>
                <Icon name="search" />
              </Button>
            )}
            {searchVisibility === SEARCH_VISIBLE && (
              <form ref={formRef} action="/search" data-search-is-active={!!query}>
                <input
                  type="search"
                  name="q"
                  value={query || ''}
                  onChange={handleOnSearch}
                  autoComplete="off"
                  placeholder="Search..."
                  required
                />
                <div className={styles.navSearchResults}>
                  {results.length > 0 && (
                    <ul>
                      {results.map(({ slug, title }, index) => {
                        return (
                          <li key={slug}>
                            <Link tabIndex={index} href={postPathBySlug(slug)}>
                              {title}
                            </Link>
                          </li>
                        );
                      })}
                    </ul>
                  )}
                  {results.length === 0 && (
                    <p>
                      Sorry, not finding anything for <strong>{query}</strong>
                    </p>
                  )}
                </div>
              </form>
            )}
          </div>
        )}
      </Section>
    </nav>
  );
};

export default Nav;
