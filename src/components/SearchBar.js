import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setSearchQuery } from "../actions/filterActions";
import styles from "./SearchBar.module.css";

const SearchBar = () => {
    const dispatch = useDispatch();
    const searchQuery = useSelector((state) => state.filters.searchQuery);

    return (
        <div className={styles.search}>
            <input
                type="text"
                value={searchQuery}
                onChange={(e) => dispatch(setSearchQuery(e.target.value))}
                placeholder="Поиск по задачам..."
                className={styles.input}
            />
            {searchQuery && (
                <button
                    onClick={() => dispatch(setSearchQuery(""))}
                    className={styles.clear}
                >
                    ✕
                </button>
            )}
        </div>
    );
};

export default SearchBar;
