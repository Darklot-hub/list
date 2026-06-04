import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addTodo } from "../actions/todoActions";
import styles from "./TodoForm.module.css";

const TodoForm = () => {
    const [title, setTitle] = useState("");
    const [submitting, setSubmitting] = useState(false);
    const dispatch = useDispatch();

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!title.trim()) return;
        setSubmitting(true);
        await dispatch(addTodo(title));
        setSubmitting(false);
        setTitle("");
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
