import { useState } from 'react';
import { Link } from 'react-router-dom';

interface ProviderResult {
  number: string;
  basic: {
    first_name: string;
    last_name: string;
    credential?: string;
  };
  taxonomies: {
    desc: string;
    primary: boolean;
  }[];
}

interface ApiResponse {
  result_count: number;
  results: ProviderResult[];
  Errors?: { description: string }[];
}

function Search() {
  const [city, setCity] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [results, setResults] = useState<ProviderResult[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [hasSearched, setHasSearched] = useState(false);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setHasSearched(true);
    
    let url = 'https://npiregistry.cms.hhs.gov/api/?version=2.1&limit=50';
    if (city) url += `&city=${encodeURIComponent(city)}`;
    if (firstName) url += `&first_name=${encodeURIComponent(firstName)}`;
    if (lastName) url += `&last_name=${encodeURIComponent(lastName)}`;

    try {
      const response = await fetch(url);
      const data: ApiResponse = await response.json();
      
      if (data.Errors && data.Errors.length > 0) {
        setError(data.Errors[0].description);
        setResults([]);
      } else {
        setResults(data.results || []);
      }
    } catch (err) {
      setError('An error occurred while fetching data.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="search-page">
      <form className="search-form" onSubmit={handleSearch}>
        <div className="search-form__field">
          <label className="search-form__label" htmlFor="first_name">First Name</label>
          <input 
            id="first_name"
            className="search-form__input"
            type="text" 
            value={firstName} 
            onChange={(e) => setFirstName(e.target.value)} 
          />
        </div>
        <div className="search-form__field">
          <label className="search-form__label" htmlFor="last_name">Last Name</label>
          <input 
            id="last_name"
            className="search-form__input"
            type="text" 
            value={lastName} 
            onChange={(e) => setLastName(e.target.value)} 
          />
        </div>
        <div className="search-form__field">
          <label className="search-form__label" htmlFor="city">City</label>
          <input 
            id="city"
            className="search-form__input"
            type="text" 
            value={city} 
            onChange={(e) => setCity(e.target.value)} 
          />
        </div>
        <button className="search-form__button" type="submit" disabled={loading}>
          {loading ? 'Searching...' : 'Search'}
        </button>
      </form>

      {error && <div className="error-message" role="alert">{error}</div>}

      {!loading && hasSearched && results.length === 0 && !error && (
        <div className="empty-state">No providers found for the given criteria.</div>
      )}

      {results.length > 0 && (
        <ul className="provider-list">
          {results.map((provider) => {
            const primaryTaxonomy = provider.taxonomies.find((t) => t.primary);
            return (
              <li key={provider.number} className="provider-list__item">
                <h2 className="provider-list__name">
                  {provider.basic.first_name} {provider.basic.last_name} {provider.basic.credential && `, ${provider.basic.credential}`}
                </h2>
                {primaryTaxonomy && (
                  <div className="provider-list__taxonomy">{primaryTaxonomy.desc}</div>
                )}
                <Link className="provider-list__link" to={`/provider/${provider.number}`}>
                  View Details
                </Link>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}

export default Search;
