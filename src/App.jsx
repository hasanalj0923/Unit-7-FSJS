import axios from 'axios';
import { useEffect, useState } from 'react';
import { Navigate, Route, Routes, useParams, useLocation } from 'react-router-dom';

import './index.css';
import apiKey from './config';
import SearchForm from './components/SearchForm';
import Nav from './components/Nav';
import PhotoList from './components/PhotoList';
import PageNotFound from './components/PageNotFound';

const App = () => {
  const location = useLocation();
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const [photos, setPhotos] = useState([]);

  const fetchData = async (query) => {
    setLoading(true);
    try {
      const response = await axios.get(
        `https://pixabay.com/api/?key=${apiKey}&q=${encodeURIComponent(query)}&per_page=24`
      );
      setPhotos(response.data.hits);
      setSearchTerm(query);
    } catch (error) {
      console.error('Error fetching data:', error);
      setPhotos([]);
    } finally {
      setLoading(false);
    }
  };

  // Fetch data when location changes, based on the URL path
  useEffect(() => {
    // Extract the term from path: e.g. /cats, /dogs, /sunsets, /search/dogs
    let term = '';
    if (location.pathname.startsWith('/search/')) {
      term = location.pathname.replace('/search/', '');
    } else if (location.pathname === '/' || location.pathname === '') {
      term = 'cats'; // default fallback
    } else {
      // paths like /cats, /dogs, /sunsets
      term = location.pathname.replace('/', '');
    }

    if (term && term !== searchTerm) {
      fetchData(term);
    }
  }, [location]); // runs on location change

  // SearchRoute just displays the photos already fetched for /search/:term
  const SearchRoute = () => {
    const { term } = useParams();
    return loading ? <p>Loading...</p> : <PhotoList term={term} data={photos} />;
  };

  return (
    <div className="container">
      <SearchForm fetchData={fetchData} />
      <Nav />
      <Routes>
        <Route path="/" element={<Navigate replace to="/cats" />} />
        <Route
          path="/cats"
          element={loading ? <p>Loading...</p> : <PhotoList term="cats" data={photos} />}
        />
        <Route
          path="/dogs"
          element={loading ? <p>Loading...</p> : <PhotoList term="dogs" data={photos} />}
        />
        <Route
          path="/sunsets"
          element={loading ? <p>Loading...</p> : <PhotoList term="sunsets" data={photos} />}
        />
        <Route path="/search/:term" element={<SearchRoute />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </div>
  );
};

export default App;
