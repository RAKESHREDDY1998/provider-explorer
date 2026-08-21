import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';

interface ProviderAddress {
  address_1: string;
  address_2?: string;
  city: string;
  state: string;
  postal_code: string;
  telephone_number: string;
  address_purpose: string;
}

interface ProviderDetailData {
  number: string;
  basic: {
    first_name: string;
    last_name: string;
    credential?: string;
    enumeration_date: string;
    status: string;
  };
  taxonomies: {
    desc: string;
    primary: boolean;
    state: string;
    license: string;
  }[];
  addresses: ProviderAddress[];
}

function Provider() {
  const { id } = useParams<{ id: string }>();
  const [provider, setProvider] = useState<ProviderDetailData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProvider = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch(`https://npiregistry.cms.hhs.gov/api/?version=2.1&number=${id}`);
        const data = await response.json();
        
        if (data.Errors && data.Errors.length > 0) {
          setError(data.Errors[0].description);
        } else if (data.results && data.results.length > 0) {
          setProvider(data.results[0]);
        } else {
          setError('Provider not found.');
        }
      } catch (err) {
        setError('An error occurred while fetching data.');
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchProvider();
    }
  }, [id]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error || !provider) {
    return (
      <div className="error-message" role="alert">
        {error || 'Unknown error'}
        <br />
        <Link to="/search">Back to Search</Link>
      </div>
    );
  }

  const primaryTaxonomy = provider.taxonomies.find(t => t.primary);
  const locationAddress = provider.addresses.find(a => a.address_purpose === 'LOCATION');

  return (
    <div className="provider-detail">
      <Link to="/search" style={{ display: 'inline-block', marginBottom: '16px' }}>&larr; Back to Search</Link>
      
      <div className="provider-detail__header">
        <h1 className="provider-detail__name">
          {provider.basic.first_name} {provider.basic.last_name} {provider.basic.credential && `, ${provider.basic.credential}`}
        </h1>
        <div className="provider-detail__npi">NPI: {provider.number}</div>
        <div className="provider-detail__status">Status: {provider.basic.status === 'A' ? 'Active' : 'Inactive'}</div>
      </div>

      {primaryTaxonomy && (
        <div className="provider-detail__section">
          <h2 className="provider-detail__section-title">Primary Taxonomy</h2>
          <p>{primaryTaxonomy.desc}</p>
          <p>License: {primaryTaxonomy.license} ({primaryTaxonomy.state})</p>
        </div>
      )}

      {locationAddress && (
        <div className="provider-detail__section">
          <h2 className="provider-detail__section-title">Practice Location</h2>
          <address>
            {locationAddress.address_1}<br />
            {locationAddress.address_2 && <>{locationAddress.address_2}<br /></>}
            {locationAddress.city}, {locationAddress.state} {locationAddress.postal_code}<br />
            Phone: {locationAddress.telephone_number}
          </address>
        </div>
      )}
    </div>
  );
}

export default Provider;
