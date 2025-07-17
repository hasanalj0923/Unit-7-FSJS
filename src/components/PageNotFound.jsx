import { Link } from 'react-router-dom';

const PageNotFound = () => {
  return (
    <section role="alert" aria-live="assertive" style={{ padding: '1rem' }}>
      <h2>Page Not Found</h2>
      <p>The page does not exist or may have been moved.</p>
      <p>
        <Link to="/">Go back to Home</Link>
      </p>
    </section>
  );
};

export default PageNotFound;