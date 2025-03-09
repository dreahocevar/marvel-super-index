import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import md5 from "js-md5";
import "./SearchBar.css";

const PUBLIC_KEY = "e35ce5a0795ac8a733b72e9dd845113a";
const PRIVATE_KEY = "d5705973f67e084c2e9f754b7906bf3c865d73dd";

const generateHash = (ts) => md5(ts + PRIVATE_KEY + PUBLIC_KEY).toString();

const SearchBar = ({ onSubmit }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [error, setError] = useState("");
  const [suggestionFixed, setSuggestionFixed] = useState(false);

  const handleChange = useCallback((e) => {
    setSearchQuery(e.target.value);
    setSuggestionFixed(false);
  }, []);

  useEffect(() => {
    const fetchSuggestions = async () => {
      if (!searchQuery || searchQuery.length < 3 || suggestionFixed) {
        setSuggestions([]);
        return;
      }
      try {
        const ts = new Date().getTime().toString();
        const hash = generateHash(ts);
        const response = await axios.get(
          "https://gateway.marvel.com/v1/public/characters",
          {
            params: {
              ts,
              apikey: PUBLIC_KEY,
              hash,
              limit: 8,
              nameStartsWith: searchQuery,
            },
          }
        );
        setSuggestions(response.data.data.results);
      } catch (error) {
        console.error("Error fetching suggestions:", error);
        setError("Failed to fetch suggestions. Please try again.");
      }
    };

    const debounceTimeout = setTimeout(fetchSuggestions, 300);
    return () => clearTimeout(debounceTimeout);
  }, [searchQuery, suggestionFixed]);

  const handleSuggestionClick = useCallback(
    (suggestion) => {
      setSearchQuery(suggestion.name);
      setSuggestions([]);
      setError("");
      setSuggestionFixed(true);
      onSubmit({ searchQuery: suggestion.name });
    },
    [onSubmit]
  );


  const handleSubmit = useCallback(
    (e) => {
      e.preventDefault();
      if (searchQuery.trim() === "") {
        setError("Write something first!!");
        return;
      }
      setError("");
      setSuggestions([]);
      setSuggestionFixed(true);
      onSubmit({ searchQuery });
    },
    [searchQuery, onSubmit]
  );

  const handleShowAll = useCallback(() => {
    setSearchQuery("");
    setSuggestions([]);
    setError("");
    setSuggestionFixed(true);
    onSubmit({ searchQuery: "", orderBy: "name" });
  }, [onSubmit]);

  return (
    <div className="search-bar">
      <form className="search-form" onSubmit={handleSubmit}>
        <div className="search-row">
          <button
            type="button"
            className="show-all-button"
            onClick={handleShowAll}
          >
            Show all
          </button>
          <input
            type="text"
            name="searchQuery"
            placeholder="Find your heroes"
            value={searchQuery}
            onChange={handleChange}
            className="search-input"
          />
          <button type="submit" className="search-button">
            Search
          </button>
        </div>
      </form>
      {error && <p className="error-message">{error}</p>}
      {suggestions.length > 0 && (
        <div className="suggestions-container">
          {suggestions.map((suggestion) => (
            <div
              key={suggestion.id}
              onClick={() => handleSuggestionClick(suggestion)}
              className="suggestion-item"
            >
              {suggestion.name}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchBar;
