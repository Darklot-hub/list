import React from "react";
import { useTodos } from "../context/TodoContext";
import styles from "./SearchBar.module.css";

const SearchBar = () => {
    const { searchQuery, setSearchQuery } = useTodos();

    return (
        <div className={styles.search}>
            <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Поиск по названию..."
                className={styles.input}
            />
            {searchQuery && (
                <button
                    onClick={() => setSearchQuery("")}
                    className={styles.clear}
                >
                    ✕
                </button>
            )}
        </div>
    );
};

export default SearchBar;
