import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchTodos } from "./actions/todoActions";
import { toggleSort } from "./actions/filterActions";
import TodoForm from "./components/TodoForm";
import TodoList from "./components/TodoList";
import SearchBar from "./components/SearchBar";
import LoadingSpinner from "./components/LoadingSpinner";
import ErrorMessage from "./components/ErrorMessage";
import styles from "./App.module.css";

function App() {
    const dispatch = useDispatch();
    const { loading, error } = useSelector((state) => state.todos);
    const sortAlphabetically = useSelector(
        (state) => state.filters.sortAlphabetically,
    );

    useEffect(() => {
        dispatch(fetchTodos());
    }, [dispatch]);

    return (
        <div className={styles.App}>
            <div className={styles.container}>
                <header className={styles.header}>
                    <h1>📝 Список дел</h1>
                    <p className={styles.subtitle}>
                        Redux + Thunk + JSON Server
                    </p>
                </header>

                <div className={styles.controls}>
                    <SearchBar />
                    <button
                        className={`${styles.sortButton} ${sortAlphabetically ? styles.active : ""}`}
                        onClick={() => dispatch(toggleSort())}
                    >
                        {sortAlphabetically
                            ? "📖 Отменить сортировку"
                            : "🔤 Сортировать по алфавиту"}
                    </button>
                </div>

                <TodoForm />

                {loading && <LoadingSpinner />}
                {error && (
                    <ErrorMessage
                        message={error}
                        onRetry={() => dispatch(fetchTodos())}
                    />
                )}

                {!loading && !error && <TodoList />}

                <footer className={styles.footer}>
                    <p>JSON Server на порту 3001</p>
                </footer>
            </div>
        </div>
    );
}

export default App;
