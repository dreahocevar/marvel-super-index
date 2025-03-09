import React, { useState, useEffect, useCallback, useMemo } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import md5 from "js-md5";
import SearchBar from "./SearchBar";
import { useAuth } from "../context/AuthContext";
import "./SuperheroesList.css";

const PUBLIC_KEY = "e35ce5a0795ac8a733b72e9dd845113a";
const PRIVATE_KEY = "d5705973f67e084c2e9f754b7906bf3c865d73dd";
const generateHash = (ts) => md5(ts + PRIVATE_KEY + PUBLIC_KEY).toString();

const SuperheroesList = () => {
  const [heroes, setHeroes] = useState([]);
  const [offset, setOffset] = useState(0);
  const [loading, setLoading] = useState(false);
  const [expandedHero, setExpandedHero] = useState(null);
  const [hasMore, setHasMore] = useState(true);
  const [searchFilters, setSearchFilters] = useState({});
  const { user, login } = useAuth();
  const limit = 20;

  const fetchHeroes = useCallback(
    async (reset = false, customFilters = null) => {
      if (loading) return;
      setLoading(true);
      const ts = new Date().getTime().toString();
      const hash = generateHash(ts);
      try {
        const currentOffset = reset ? 0 : offset;
        const params = {
          ts,
          apikey: PUBLIC_KEY,
          hash,
          limit,
          offset: currentOffset,
        };

        const activeFilters = customFilters || searchFilters;
        if (activeFilters.searchQuery) {
          params.nameStartsWith = activeFilters.searchQuery;
        }
        if (activeFilters.orderBy) {
          params.orderBy = activeFilters.orderBy;
        }

        const response = await axios.get(
          "https://gateway.marvel.com/v1/public/characters",
          { params }
        );
        const results = response.data.data.results;
        const newHeroes = reset ? results : [...heroes, ...results];
        if (activeFilters.orderBy === "name") {
          newHeroes.sort((a, b) => a.name.localeCompare(b.name));
        }
        setHeroes(newHeroes);
        setOffset(currentOffset + limit);
        setHasMore(response.data.data.count === limit);
      } catch (error) {
        console.error("Error fetching heroes:", error);
      } finally {
        setLoading(false);
      }
    },
    [loading, offset, searchFilters, heroes]
  );

  // infinite scroll instead of pages feels fancier
  useEffect(() => {
    const handleScroll = () => {
      if (
        heroes.length > 0 &&
        window.innerHeight + window.scrollY >=
          document.body.offsetHeight - 100 &&
        !loading &&
        hasMore
      ) {
        fetchHeroes();
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [heroes, loading, hasMore, fetchHeroes]);

  const handleSearchSubmit = useCallback(
    (filterData) => {
      setSearchFilters(filterData);
      setOffset(0);
      fetchHeroes(true, filterData);
    },
    [fetchHeroes]
  );
  const openModal = useCallback((heroId) => {
    setExpandedHero(heroId);
  }, []);

  const closeModal = useCallback(() => {
    setExpandedHero(null);
  }, []);

  const toggleFavorite = useCallback(
    (hero) => {
      if (!user) {
        alert("Please log in to add favorites."); // user needs to be logged in
        return;
      }
      const updatedFavorites = user.favorites.some((fav) => fav.id === hero.id)
        ? user.favorites.filter((fav) => fav.id !== hero.id)
        : [...user.favorites, hero];
      login({ ...user, favorites: updatedFavorites });
    },
    [user, login]
  );
  const selectedHero = useMemo(
    () =>
      expandedHero ? heroes.find((hero) => hero.id === expandedHero) : null,
    [expandedHero, heroes]
  );

  return (
    <div>
      <h1 className="bangers-regular">
        <Link to="/" style={{ textDecoration: "none", color: "inherit" }}>
          Super Index
        </Link>
      </h1>
      <SearchBar onSubmit={handleSearchSubmit} />
      <div className={`heroes-grid ${expandedHero ? "blurred" : ""}`}>
        {heroes.map((hero) => (
          <div
            key={hero.id}
            className="hero-card"
            onClick={() => openModal(hero.id)}
          >
            <img
              src={`${hero.thumbnail.path}.${hero.thumbnail.extension}`}
              alt={hero.name}
            />
            <h2 className="bangers-regular">{hero.name}</h2>
            <button
              className="favorite-button"
              onClick={(e) => {
                e.stopPropagation();
                toggleFavorite(hero);
              }}
            >
              {user?.favorites?.some((fav) => fav.id === hero.id)
                ? "❤️ Assemble"
                : "🖤 Assemble"}
            </button>
          </div>
        ))}
      </div>
      {loading && <p className="patrick-hand-regular">Loading...</p>}
      {expandedHero && selectedHero && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="expanded-layout">
              <div className="expanded-image">
                <img
                  src={`${selectedHero.thumbnail.path}.${selectedHero.thumbnail.extension}`}
                  alt={selectedHero.name}
                />
              </div>

              <div className="expanded-info">
                <h2 className="bangers-regular">{selectedHero.name}</h2>
                <p className="patrick-hand-regular">
                  {selectedHero.description ||
                    "This superhero has no description available."}
                </p>
              </div>
              <div className="expanded-comics">
                <h3 className="bangers-regular">Comics:</h3>
                <ul className="comics-list">
                  {selectedHero.comics.items.length > 0 ? (
                    selectedHero.comics.items
                      .slice(0, 10)
                      .map((comic, index) => (
                        <li key={index} className="bangers-regular">
                          {comic.name}
                        </li>
                      ))
                  ) : (
                    <li className="patrick-hand-regular">
                      No comics available.
                    </li>
                  )}
                </ul>
              </div>
            </div>

            <button
              className="favorite-button"
              onClick={(e) => {
                e.stopPropagation();
                toggleFavorite(selectedHero);
              }}
            >
              {user?.favorites?.some((fav) => fav.id === selectedHero.id)
                ? "❤️ Assemble"
                : "🖤 Assemble"}
            </button>
            <button className="close-modal" onClick={closeModal}>
              X
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default SuperheroesList;
