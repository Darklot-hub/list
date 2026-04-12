import { useState } from 'react';
import styles from './TodoList.module.css';

const TodoList = ({ todos, onToggle, onDelete, onEdit }) => {
  const [editingId, setEditingId] = useState(null);
  const [editText, setEditText] = useState('');

  const handleEdit = (id, currentTitle) => {
    setEditingId(id);
    setEditText(currentTitle);
  };

  const handleSaveEdit = async (id) => {
    if (editText.trim()) {
      await onEdit(id, editText);
      setEditingId(null);
      setEditText('');
    }
  };

  const handleKeyPress = (e, id) => {
    if (e.key === 'Enter') {
      handleSaveEdit(id);
    }
    if (e.key === 'Escape') {
      setEditingId(null);
      setEditText('');
    }
  };

  const completedCount = todos.filter(todo => todo.completed).length;
  const totalCount = todos.length;

  if (todos.length === 0) {
    return (
      <div className={styles.todoContainer}>
        <div className={styles.emptyState}>
          <div className={styles.emptyIcon}>📭</div>
          <p>Нет задач</p>
          <p className={styles.emptySubtext}>Добавьте свою первую задачу выше</p>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.todoContainer}>
      <div className={styles.stats}>
        <span className={styles.statItem}>📊 Всего: {totalCount}</span>
        <span className={styles.statItem}>✅ Выполнено: {completedCount}</span>
        <span className={styles.statItem}>⏳ Осталось: {totalCount - completedCount}</span>
      </div>
      
      <div className={styles.todoList}>
        {todos.map((todo) => (
          <div key={todo.id} className={`${styles.todoItem} ${todo.completed ? styles.completed : ''}`}>
            <div className={styles.todoCheckbox}>
              <input 
                type="checkbox" 
                checked={todo.completed}
                onChange={() => onToggle(todo.id, todo.completed)}
                className={styles.todoCheckboxInput}
              />
            </div>
            
            <div className={styles.todoContent}>
              {editingId === todo.id ? (
                <input
                  type="text"
                  value={editText}
                  onChange={(e) => setEditText(e.target.value)}
                  onBlur={() => handleSaveEdit(todo.id)}
                  onKeyDown={(e) => handleKeyPress(e, todo.id)}
                  className={styles.editInput}
                  autoFocus
                />
              ) : (
                <>
                  <p className={styles.todoText}>{todo.title}</p>
                  <span className={styles.todoId}>ID: {todo.id}</span>
                </>
              )}
            </div>
            
            <div className={styles.todoActions}>
              {editingId !== todo.id && (
                <button 
                  onClick={() => handleEdit(todo.id, todo.title)}
                  className={styles.editButton}
                  title="Редактировать"
                >
                  ✏️
                </button>
              )}
              <button 
                onClick={() => onDelete(todo.id)}
                className={styles.deleteButton}
                title="Удалить"
              >
                🗑️
              </button>
            </div>
            
            <div className={styles.todoStatus}>
              <span className={`${styles.statusBadge} ${todo.completed ? styles.statusDone : styles.statusPending}`}>
                {todo.completed ? '✓ Выполнено' : '○ В процессе'}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TodoList;
