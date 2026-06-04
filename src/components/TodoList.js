import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateTodo, deleteTodo } from "../actions/todoActions";
import styles from "./TodoList.module.css";

const TodoList = () => {
    const dispatch = useDispatch();
    const todos = useSelector((state) => {
        let result = [...state.todos.items];
        const { searchQuery, sortAlphabetically } = state.filters;
        if (searchQuery.trim()) {
            result = result.filter((todo) =>
                todo.title.toLowerCase().includes(searchQuery.toLowerCase()),
            );
        }
        if (sortAlphabetically) {
            result.sort((a, b) => a.title.localeCompare(b.title));
        }
        return result;
    });

    const handleToggle = (id, completed) => {
        dispatch(updateTodo(id, { completed: !completed }));
    };

    const handleDelete = (id) => {
        if (window.confirm("Удалить задачу?")) dispatch(deleteTodo(id));
    };

    if (todos.length === 0) {
        return (
            <div className={styles.empty}>✨ Нет задач. Добавьте первую!</div>
        );
    }

    return (
        <div className={styles.todoListWrapper}>
            <div className={styles.list}>
                {todos.map((todo) => (
                    <div
                        key={todo.id}
                        className={`${styles.card} ${todo.completed ? styles.completed : ""}`}
                    >
                        <div className={styles.content}>
                            <input
                                type="checkbox"
                                checked={todo.completed}
                                onChange={() =>
                                    handleToggle(todo.id, todo.completed)
                                }
                                className={styles.checkbox}
                            />
                            <span className={styles.title}>{todo.title}</span>
                        </div>
                        <button
                            onClick={() => handleDelete(todo.id)}
                            className={styles.deleteBtn}
                        >
                            🗑️
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default TodoList;
