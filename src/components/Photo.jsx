// src/components/Photo.jsx
const Photo = ({ webformatURL, tags }) => {
  const altText = tags || 'Photo'; // fallback if tags are missing
  return (
    <li>
      <img src={webformatURL} alt={altText} loading="lazy" />
    </li>
  );
};

export default Photo;