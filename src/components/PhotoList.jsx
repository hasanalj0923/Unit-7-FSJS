import NotFound from './NotFound';
import Photo from './Photo';

const PhotoList = ({ term, data }) => {
  // Remove trailing 's' from term for singular display
  const displayTerm = term.endsWith('s') ? term.slice(0, -1) : term;

  return (
    <div className="photo-container">
      {data.length === 0 ? (
        <ul>
          <NotFound />
        </ul>
      ) : (
        <>
          <h2>{displayTerm} Gifs</h2>
          <ul>
            {data.map((photo) => (
              <Photo
                key={photo.id}
                webformatURL={photo.webformatURL}
                tags={photo.tags}
              />
            ))}
          </ul>
        </>
      )}
    </div>
  );
};

export default PhotoList;