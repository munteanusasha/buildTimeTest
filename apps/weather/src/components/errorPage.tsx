import { useRouteError, isRouteErrorResponse, Link } from 'react-router';

const ErrorPage = () => {
  const error = useRouteError();

  let message = 'An unexpected error occurred.';
  if (isRouteErrorResponse(error)) {
    message = error.data || error.statusText;
  } else if (error instanceof Error) {
    message = error.message;
  }

  return (
    <div style={{ padding: '1.5rem', border: '1px solid crimson', borderRadius: '8px', color: 'crimson' }}>
      <h3>Weather Lookup Failed</h3>
      <p>{message}</p>
      <Link to="/" style={{ color: '#0066cc' }}>← Back to Home</Link>
    </div>
  );
}
export default ErrorPage;