import React from 'react';
import styles from './SearchBar.module.css';

const SearchBar = ({ searchQuery, setSearchQuery }) => {
  return (
    <div className={styles.searchContainer}>
      <div className={styles.searchIcon}>🔍</div>
      <input
        type="text"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        placeholder="Поиск по задачам..."
        className={styles.searchInput}
      />
      {searchQuery && (
        <button 
          onClick={() => setSearchQuery('')}
          className={styles.clearButton}
        >
          ✕
        </button>
      )}
    </div>
  );
};

export default SearchBar;