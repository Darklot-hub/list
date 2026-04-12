import React, { useState } from 'react';
import styles from './TodoForm.module.css';

const TodoForm = ({ onAdd }) => {
  const [title, setTitle] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!title.trim()) {
      return;
    }
    
    setIsSubmitting(true);
    const success = await onAdd(title);
    setIsSubmitting(false);
    
    if (success) {
      setTitle('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className={styles.todoForm}>
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Введите новую задачу..."
        className={styles.input}
        disabled={isSubmitting}
      />
      <button 
        type="submit" 
        className={styles.addButton}
        disabled={isSubmitting || !title.trim()}
      >
        {isSubmitting ? 'Добавление...' : '+ Добавить'}
      </button>
    </form>
  );
};

export default TodoForm;