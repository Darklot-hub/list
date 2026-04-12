import styles from './TodoList.module.css';

const TodoList = ({ todos }) => {
  const completedCount = todos.filter(todo => todo.completed).length;
  const totalCount = todos.length;

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
                readOnly
                className={styles.todoCheckboxInput}
              />
            </div>
            <div className={styles.todoContent}>
              <p className={styles.todoText}>{todo.title}</p>
              <span className={styles.todoId}>ID: {todo.id}</span>
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