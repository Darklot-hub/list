import React, {
    createContext,
    useState,
    useEffect,
    useContext,
    useCallback,
} from "react";

const API_URL = "http://localhost:3001/todos";

const TodoContext = createContext();

export const useTodos = () => useContext(TodoContext);

export const TodoProvider = ({ children }) => {
    const [todos, setTodos] = useState([]);
    const [filteredTodos, setFilteredTodos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [searchQuery, setSearchQuery] = useState("");
    const [sortAlphabetically, setSortAlphabetically] = useState(false);

    // Загрузка задач
    const fetchTodos = useCallback(async () => {
        try {
            setLoading(true);
            const res = await fetch(API_URL);
            if (!res.ok) throw new Error("Ошибка загрузки");
            const data = await res.json();
            setTodos(data);
            setError(null);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    }, []);

    // Добавление
    const addTodo = async (title) => {
        try {
            const newTodo = { title, completed: false };
            const res = await fetch(API_URL, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(newTodo),
            });
            if (!res.ok) throw new Error("Не удалось добавить");
            const created = await res.json();
            setTodos((prev) => [...prev, created]);
            return true;
        } catch (err) {
            setError(err.message);
            return false;
        }
    };

    // Обновление (текст или статус)
    const updateTodo = async (id, updates) => {
        try {
            const res = await fetch(`${API_URL}/${id}`, {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(updates),
            });
            if (!res.ok) throw new Error("Не удалось обновить");
            const updated = await res.json();
            setTodos((prev) =>
                prev.map((todo) => (todo.id === id ? updated : todo)),
            );
            return true;
        } catch (err) {
            setError(err.message);
            return false;
        }
    };

    // Удаление
    const deleteTodo = async (id) => {
        try {
            const res = await fetch(`${API_URL}/${id}`, { method: "DELETE" });
            if (!res.ok) throw new Error("Не удалось удалить");
            setTodos((prev) => prev.filter((todo) => todo.id !== id));
            return true;
        } catch (err) {
            setError(err.message);
            return false;
        }
    };

    // Переключение статуса
    const toggleComplete = (id, completed) =>
        updateTodo(id, { completed: !completed });

    // Фильтрация и сортировка
    useEffect(() => {
        let result = [...todos];
        if (searchQuery.trim()) {
            result = result.filter((todo) =>
                todo.title.toLowerCase().includes(searchQuery.toLowerCase()),
            );
        }
        if (sortAlphabetically) {
            result.sort((a, b) => a.title.localeCompare(b.title));
        }
        setFilteredTodos(result);
    }, [todos, searchQuery, sortAlphabetically]);

    // Первоначальная загрузка
    useEffect(() => {
        fetchTodos();
    }, [fetchTodos]);

    const value = {
        todos: filteredTodos, // отфильтрованные + отсортированные
        allTodos: todos,
        loading,
        error,
        searchQuery,
        setSearchQuery,
        sortAlphabetically,
        setSortAlphabetically,
        addTodo,
        updateTodo,
        deleteTodo,
        toggleComplete,
        refetch: fetchTodos,
    };

    return (
        <TodoContext.Provider value={value}>{children}</TodoContext.Provider>
    );
};
