import { useState, useEffect } from 'react';
import styles from './App.module.css';
import TodoList from './components/TodoList';
import LoadingSpinner from './components/LoadingSpinner';
import ErrorMessage from './components/ErrorMessage';

function App() {
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = async () => {
    try {
      setLoading(true);
      const response = await fetch('https://jsonplaceholder.typicode.com/todos?_limit=10');
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      setTodos(data);
      setError(null);
    } catch (err) {
      setError(err.message);
      console.error('Error fetching todos:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.App}>
      <div className={styles.container}>
        <header className={styles.appHeader}>
          <h1>📝 Мои задачи</h1>
          <p className={styles.subtitle}>Список дел из JSON Placeholder</p>
        </header>
        
        {loading && <LoadingSpinner />}
        {error && <ErrorMessage message={error} onRetry={fetchTodos} />}
        {!loading && !error && <TodoList todos={todos} />}
        
        <footer className={styles.appFooter}>
          <p>Источник: JSON Placeholder API</p>
        </footer>
      </div>
    </div>
  );
}

export default App;
