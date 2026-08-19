import Button from '../common/Button'

const ErrorMessage = ({ message, onRetry }) => {
  return (
    <div className="error-message">
      <p className="error-text">{message}</p>
      {onRetry && (
        <Button variant="secondary" onClick={onRetry} size="sm">
          Retry
        </Button>
      )}
    </div>
  )
}

export default ErrorMessage
