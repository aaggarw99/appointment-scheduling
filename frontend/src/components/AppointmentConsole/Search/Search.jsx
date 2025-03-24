import React, { useState } from 'react';
import { searchProviders, searchAssets } from '../../../services/api';
import './Search.css';

const Search = () => {
  const [searchType, setSearchType] = useState('providers');
  const [searchQuery, setSearchQuery] = useState('');
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [noResultsFound, setNoResultsFound] = useState(false);

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;

    setLoading(true);
    setError(null);

    try {
      const data = searchType === 'providers' 
        ? await searchProviders(searchQuery)
        : await searchAssets(searchQuery);
      setNoResultsFound(data.length === 0);
      setResults(data);
    } catch (err) {
      setError('Failed to fetch results. Please try again.');
      console.error('Search error:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleSelectSearchType = (type) => {
    setSearchType(type);
    setResults([]);
    setSearchQuery('');
    setError(null);
    setLoading(false);
  }

  return (
    <div className="search">
      <form onSubmit={handleSearch} className="search__form">
        <div className="search__type-selector">
          <button
            type="button"
            className={`type-button ${searchType === 'providers' ? 'active' : ''}`}
            onClick={() => handleSelectSearchType('providers')}
          >
            Providers
          </button>
          <button
            type="button"
            className={`type-button ${searchType === 'assets' ? 'active' : ''}`}
            onClick={() => handleSelectSearchType('assets')}
          >
            Assets
          </button>
        </div>

        <div className="search__input-group">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={`Search for ${searchType}...`}
            className="search__input"
          />
          <button 
            type="submit" 
            className="search__button"
            disabled={loading}
          >
            {loading ? 'Searching...' : 'Search'}
          </button>
        </div>
      </form>

      <div className="search__results">
        {error && (
          <div className="search__error">
            {error}
          </div>
        )}
        
        {noResultsFound && (
          <p className="search__no-results">
            No results found. Try searching for {searchType}.
          </p>
        )}

        {loading && (
          <div className="search__loading">
            Loading...
          </div>
        )}

        {!loading && results.length > 0 && (
          <div className="search__results-grid">
            {results.map((result) => (
              <div key={result.id} className="search__result-card">
                {searchType === 'providers' ? (
                  <>
                    <h3>{result.title} {result.user?.first_name} {result.user?.last_name}</h3>
                    <p>Specialization: {result.specialization}</p>
                    <p>Facility: {result.facility?.name}</p>
                  </>
                ) : (
                  <>
                    <h3>{result.name}</h3>
                    <p>Type: {result.asset_type}</p>
                    <p>Facility: {result.facility?.name}</p>
                  </>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Search; 