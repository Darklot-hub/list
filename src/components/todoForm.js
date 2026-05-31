import React, { useState } from "react";
import { useTodos } from "../context/TodoContext";
import styles from "./TodoForm.module.css";

const TodoForm = () => {
    const [title, setTitle] = useState("");
    const [submitting, setSubmitting] = useState(false);
    const { addTodo } = useTodos();

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!title.trim()) return;
        setSubmitting(true);
        const success = await addTodo(title);
        setSubmitting(false);
        if (success) setTitle("");
    };

    return (
        <form onSubmit={handleSubmit} className={styles.form}>
            <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Купить молоко..."
                className={styles.input}
                disabled={submitting}
            />
            <button
                type="submit"
                className={styles.button}
                disabled={submitting || !title.trim()}
            >
                {submitting ? "Добавление..." : "+ Добавить"}
            </button>
        </form>
    );
};

export default TodoForm;
