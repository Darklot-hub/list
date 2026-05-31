import React from "react";
import { useTodos } from "../context/TodoContext";
import styles from "./TodoList.module.css";

const TodoList = () => {
    const { todos, toggleComplete, deleteTodo } = useTodos();

    if (todos.length === 0) {
        return (
            <div className={styles.todoListWrapper}>
                <div className={styles.empty}>
                    ✨ Задач пока нет. Добавьте первую!
                </div>
            </div>
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
                        <div
                            style={{
                                display: "flex",
                                alignItems: "center",
                                flex: 1,
                            }}
                        >
                            <input
                                type="checkbox"
                                checked={todo.completed}
                                onChange={() =>
                                    toggleComplete(todo.id, todo.completed)
                                }
                                className={styles.checkbox}
                            />
                            <span className={styles.title}>{todo.title}</span>
                        </div>
                        <button
                            onClick={() => deleteTodo(todo.id)}
                            className={styles.deleteBtn}
                            aria-label="Удалить"
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
