import { useState, useEffect } from 'react';
import styles from './App.module.css';
import TodoList from './components/TodoList';
import TodoForm from './components/TodoForm';
import SearchBar from './components/SearchBar';
import LoadingSpinner from './components/LoadingSpinner';
import ErrorMessage from './components/ErrorMessage';

const API_URL = 'http://localhost:3001/todos';

function App() {
  const [todos, setTodos] = useState([]);
  const [filteredTodos, setFilteredTodos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortAlphabetically, setSortAlphabetically] = useState(false);

  // Загрузка задач
  useEffect(() => {
    fetchTodos();
  }, []);

  // Применение фильтрации и сортировки
  useEffect(() => {
    let result = [...todos];
    
    // Фильтрация по поиску
    if (searchQuery.trim()) {
      result = result.filter(todo => 
        todo.title.toLowerCase().includes(searchQuery.toLowerCase())
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
      const response = await fetch(API_URL);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      setTodos(data);
      setError(null);
    } catch (err) {
      setError('Не удалось загрузить задачи');
      console.error('Error fetching todos:', err);
    } finally {
      setLoading(false);
    }
  };

  const addTodo = async (title) => {
    try {
      const newTodo = {
        title: title,
        completed: false,
        userId: 1
      };
      
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newTodo)
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      setTodos([...todos, data]);
      return true;
    } catch (err) {
      setError('Не удалось добавить задачу');
      console.error('Error adding todo:', err);
      return false;
    }
  };

  const updateTodo = async (id, updatedData) => {
    try {
      const response = await fetch(`${API_URL}/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedData)
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      setTodos(todos.map(todo => todo.id === id ? data : todo));
      return true;
    } catch (err) {
      setError('Не удалось обновить задачу');
      console.error('Error updating todo:', err);
      return false;
    }
  };

  const deleteTodo = async (id) => {
    try {
      const response = await fetch(`${API_URL}/${id}`, {
        method: 'DELETE'
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      setTodos(todos.filter(todo => todo.id !== id));
      return true;
    } catch (err) {
      setError('Не удалось удалить задачу');
      console.error('Error deleting todo:', err);
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
          <h1>📝 Мои задачи</h1>
          <p className={styles.subtitle}>Управление списком дел</p>
        </header>

        <div className={styles.controls}>
          <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
          <button 
            className={`${styles.sortButton} ${sortAlphabetically ? styles.active : ''}`}
            onClick={() => setSortAlphabetically(!sortAlphabetically)}
          >
            {sortAlphabetically ? '📖 Отменить сортировку' : '🔤 Сортировать по алфавиту'}
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
          <p>JSON Server API | Всего задач: {todos.length}</p>
        </footer>
      </div>
    </div>
  );
}

export default App;
