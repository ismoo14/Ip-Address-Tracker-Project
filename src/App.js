import React, {useState, useEffect } from "react";
import MapComponent from "./components/Ip";
import './components/main.css'
import arrow from "./components/img/icon-arrow.svg"

function App() {
      const [ipAddress, setIpAddress] = useState('');
      const [locationData, setlocationData] = useState(null);
      const [isLoading, setIsLoading] = useState(false);
      const [error, setError] = useState(null);
  
        const apiKey = 'at_OC64oe6vuDOxpdd8Qj9rAxODjfQPY';

  const fetchIpData = async (ip = '') => {
    setIsLoading(true);
    setError(null);
    try {
      const url = `https://geo.ipify.org/api/v1?apiKey=${apiKey}&ipAddress=${ip}`;
      const response = await fetch(url);
      const data = await response.json();

      if (!response.ok) {
        const errorMessage = data.messages || 'Invalid IP address or domain provided.';
        throw new Error(errorMessage);
      }

      setlocationData(data);
    } catch (err) {
      setError(err.message);
      setlocationData(null);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchIpData();
  }, []);

  const handleFormSubmit = (e) => {
    e.preventDefault();
    fetchIpData(ipAddress);
  };


  return(
    <div className="App">
        <section className="ip-details">
          <div className="container">
            <header className="header">
              <h1 className="title">
              IP Address Tracker
            </h1>
        <div className="input-part">
          <form onSubmit={handleFormSubmit}>
          <input className="the-input"
            type="text"
            value={ipAddress}
            onChange={(e) => setIpAddress(e.target.value)}
            placeholder="Search for any IP address"
          />
          <button type="submit" className="btn-sub">
          <img src= {arrow} />
          </button>
        </form>
        </div>
            </header>
      
      {isLoading && <p className = "loa">Loading...</p>}
      {error && <p className="failed">{error}</p>}
      {error && <p  className="erorr">
                Error: {error}
                </p>}

      {locationData && (
        <div className="cont">
          <div className = 'detail-box'>
            <h4>IP ADDRESS</h4>
            <h1>{locationData.ip}</h1>
          </div>

          <div className = "detail-box">
                <h4>DOMAIN NAME</h4>
                <h1>{locationData.as.domain}</h1>
          </div>

          <div className="loca detail-box">
            <h4>LOCATION</h4>
            <h1>{`${locationData.location.city}, ${locationData.location.country}`}</h1>
          </div>

          <div className="time detail-box">
            <h4>Timezone</h4>
            <h1>{`UTC ${locationData.location.timezone}`}</h1>
          </div>

          <div className="ic detail-box">
            <h4 className="is">ISP</h4>
            <h1>{locationData.isp}</h1>
          </div>
        </div>
      )}
          </div>
        </section>

      {locationData && locationData.location && (
        <div className="map-container">
          <MapComponent 
            lat={locationData.location.lat} 
            lng={locationData.location.lng} 
          />
        </div>
      )}
    </div>
  );
}

export default App;
