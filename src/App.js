import React from "react";
import TodoList from "./components/TodoList";
import TodoForm from "./components/TodoForm";
import SearchBar from "./components/SearchBar";
import LoadingSpinner from "./components/LoadingSpinner";
import ErrorMessage from "./components/ErrorMessage";
import { useTodos } from "./context/TodoContext";
import styles from "./App.module.css";

function App() {
    const {
        loading,
        error,
        refetch,
        sortAlphabetically,
        setSortAlphabetically,
    } = useTodos();

    return (
        <div className={styles.App}>
            <div className={styles.container}>
                <header className={styles.header}>
                    <h1>📝 Список дел</h1>
                    <p className={styles.subtitle}>
                        React Context + JSON Server
                    </p>
                </header>

                <div className={styles.controls}>
                    <SearchBar />
                    <button
                        className={`${styles.sortButton} ${sortAlphabetically ? styles.active : ""}`}
                        onClick={() => setSortAlphabetically((prev) => !prev)}
                    >
                        {sortAlphabetically
                            ? "📖 Отменить сортировку"
                            : "🔤 Сортировать по алфавиту"}
                    </button>
                </div>

                <TodoForm />

                {loading && <LoadingSpinner />}
                {error && <ErrorMessage message={error} onRetry={refetch} />}

                {!loading && !error && <TodoList />}

                <footer className={styles.footer}>
                    <p>JSON Server на порту 3001</p>
                </footer>
            </div>
        </div>
    );
}

export default App;
