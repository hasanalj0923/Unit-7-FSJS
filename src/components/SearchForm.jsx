import { useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const SearchForm = ({ fetchData }) => {
  const navigate = useNavigate();
  const inputRef = useRef();

  // Clear the navigate state only once when component mounts
  useEffect(() => {
    window.history.replaceState({}, "");
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    let currInputVal = inputRef.current.value.trim();

    if (!currInputVal) return; // avoid empty searches

    // Navigate and pass state to prevent refetch in useEffect
    navigate(`/search/${currInputVal}`, { state: { key: "searchForm" } });

    // Fetch the data for this search term
    fetchData(currInputVal);

    // Reset the form input
    e.currentTarget.reset();
  };

  return (
    <form className="search-form" onSubmit={handleSubmit} role="search" aria-label="Search photos">
      <input
        type="search"
        name="search"
        placeholder="Search"
        ref={inputRef}
        required
        aria-label="Search input"
      />
      <button type="submit" className="search-button" aria-label="Submit search">
        <svg
          fill="#fff"
          height="24"
          viewBox="0 0 23 23"
          width="24"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
          focusable="false"
        >
          <path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z" />
          <path d="M0 0h24v24H0z" fill="none" />
        </svg>
      </button>
    </form>
  );
};

export default SearchForm;
