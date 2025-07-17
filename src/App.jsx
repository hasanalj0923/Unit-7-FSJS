import axios from 'axios';
import { useEffect, useState } from 'react';
import { Navigate, Route, Routes, useLocation } from 'react-router-dom';

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
      setPhotos([]); // Clear photos on error
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const currentSearchTerm = location.pathname.replace(/^\/(search\/)?/, '');
    if (searchTerm !== currentSearchTerm && location?.state?.key !== 'searchForm') {
      fetchData(currentSearchTerm);
    }
  }, [location]); // eslint-disable-line react-hooks/exhaustive-deps

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
        <Route
          path="/search/:term"
          element={loading ? <p>Loading...</p> : <PhotoList term={searchTerm} data={photos} />}
        />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </div>
  );
};

export default App;