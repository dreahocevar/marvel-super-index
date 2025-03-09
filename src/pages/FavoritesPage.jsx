import React from "react";
import { useAuth } from "../context/AuthContext";
import "./FavoritesPage.css";

const FavoritesPage = () => {
  const { user, login } = useAuth();

  const removeFavorite = (heroId) => {
    const updatedFavorites = user.favorites.filter((fav) => fav.id !== heroId);
    login({ ...user, favorites: updatedFavorites });
  };

  return (
    <div className="favorites-container">
      <h1 className="bangers-regular">My Favorites</h1>
      {user && user.favorites.length > 0 ? (
        <div className="favorites-grid">
          {user.favorites.map((hero) => (
            <div key={hero.id} className="favorite-card">
              <img
                src={`${hero.thumbnail.path}.${hero.thumbnail.extension}`}
                alt={hero.name}
              />
              <h2 className="bangers-regular">{hero.name}</h2>
              <button
                className="remove-button"
                onClick={() => removeFavorite(hero.id)}
              >
                Remove
              </button>
            </div>
          ))}
        </div>
      ) : (
        <p className="patrick-hand-regular">
          No favorites yet. Start adding some!
        </p>
      )}
    </div>
  );
};

export default FavoritesPage;
