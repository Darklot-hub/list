import styles from './ErrorMessage.module.css';

const ErrorMessage = ({ message, onRetry }) => {
  return (
    <div className={styles.errorContainer}>
      <div className={styles.errorIcon}>⚠️</div>
      <h3>Ошибка загрузки</h3>
      <p>{message}</p>
      <button onClick={onRetry} className={styles.retryButton}>
        Попробовать снова
      </button>
    </div>
  );
};

export default ErrorMessage;