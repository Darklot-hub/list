import React, { useState, useEffect } from "react";
import {
    collection,
    getDocs,
    addDoc,
    updateDoc,
    deleteDoc,
    doc,
} from "firebase/firestore";
import { db } from "./firebase";
import styles from "./App.module.css";
import TodoList from "./components/TodoList";
import TodoForm from "./components/TodoForm";
import SearchBar from "./components/SearchBar";
import LoadingSpinner from "./components/LoadingSpinner";
import ErrorMessage from "./components/ErrorMessage";

function App() {
    const [todos, setTodos] = useState([]);
    const [filteredTodos, setFilteredTodos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [searchQuery, setSearchQuery] = useState("");
    const [sortAlphabetically, setSortAlphabetically] = useState(false);

    // Загрузка задач из Firebase
    useEffect(() => {
        fetchTodos();
    }, []);

    // Применение фильтрации и сортировки
    useEffect(() => {
        let result = [...todos];

        // Фильтрация по поиску
        if (searchQuery.trim()) {
            result = result.filter((todo) =>
                todo.title.toLowerCase().includes(searchQuery.toLowerCase()),
            );
        }

        // Сортировка по алфавиту
        if (sortAlphabetically) {
            result.sort((a, b) => a.title.localeCompare(b.title));
        }

        setFilteredTodos(result);
    }, [todos, searchQuery, sortAlphabetically]);

    const fetchTodos = async () => {
        try {
            setLoading(true);
            const querySnapshot = await getDocs(collection(db, "todos"));
            const todosData = [];
            querySnapshot.forEach((doc) => {
                todosData.push({
                    id: doc.id,
                    ...doc.data(),
                });
            });
            setTodos(todosData);
            setError(null);
        } catch (err) {
            setError("Не удалось загрузить задачи из Firebase");
            console.error("Error fetching todos:", err);
        } finally {
            setLoading(false);
        }
    };

    const addTodo = async (title) => {
        try {
            const newTodo = {
                title: title,
                completed: false,
                createdAt: new Date().toISOString(),
            };

            const docRef = await addDoc(collection(db, "todos"), newTodo);
            setTodos([...todos, { id: docRef.id, ...newTodo }]);
            return true;
        } catch (err) {
            setError("Не удалось добавить задачу в Firebase");
            console.error("Error adding todo:", err);
            return false;
        }
    };

    const updateTodo = async (id, updatedData) => {
        try {
            const todoRef = doc(db, "todos", id);
            await updateDoc(todoRef, updatedData);
            setTodos(
                todos.map((todo) =>
                    todo.id === id ? { ...todo, ...updatedData } : todo,
                ),
            );
            return true;
        } catch (err) {
            setError("Не удалось обновить задачу в Firebase");
            console.error("Error updating todo:", err);
            return false;
        }
    };

    const deleteTodo = async (id) => {
        try {
            const todoRef = doc(db, "todos", id);
            await deleteDoc(todoRef);
            setTodos(todos.filter((todo) => todo.id !== id));
            return true;
        } catch (err) {
            setError("Не удалось удалить задачу из Firebase");
            console.error("Error deleting todo:", err);
            return false;
        }
    };

    const toggleComplete = async (id, completed) => {
        await updateTodo(id, { completed: !completed });
    };

    const updateTodoTitle = async (id, newTitle) => {
        await updateTodo(id, { title: newTitle });
    };

    return (
        <div className={styles.App}>
            <div className={styles.container}>
                <header className={styles.appHeader}>
                    <h1>🔥 Мои задачи</h1>
                    <p className={styles.subtitle}>Firebase Firestore версия</p>
                </header>

                <div className={styles.controls}>
                    <SearchBar
                        searchQuery={searchQuery}
                        setSearchQuery={setSearchQuery}
                    />
                    <button
                        className={`${styles.sortButton} ${sortAlphabetically ? styles.active : ""}`}
                        onClick={() =>
                            setSortAlphabetically(!sortAlphabetically)
                        }
                    >
                        {sortAlphabetically
                            ? "📖 Отменить сортировку"
                            : "🔤 Сортировать по алфавиту"}
                    </button>
                </div>

                <TodoForm onAdd={addTodo} />

                {loading && <LoadingSpinner />}
                {error && <ErrorMessage message={error} onRetry={fetchTodos} />}
                {!loading && !error && (
                    <TodoList
                        todos={filteredTodos}
                        onToggle={toggleComplete}
                        onDelete={deleteTodo}
                        onEdit={updateTodoTitle}
                    />
                )}

                <footer className={styles.appFooter}>
                    <p>Firebase Firestore | Всего задач: {todos.length}</p>
                </footer>
            </div>
        </div>
    );
}

export default App;
