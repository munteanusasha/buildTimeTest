// import React, { useState, useEffect } from 'react';

// function Location(
//   // lat, lon
//                   ) {
//   const [location, setLocation] = useState({ latitude: null, longitude: null });
//   const [error, setError] = useState(null);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     // Check if the browser supports the Geolocation API
//     if (!navigator.geolocation) {
//       setError('Geolocation is not supported by your browser.');
//       setLoading(false);
//       return;
//     }

//     const handleSuccess = (position) => {
//       setLocation({
//         latitude: position.coords.latitude,
//         longitude: position.coords.longitude,
//       });
//       setLoading(false);
//     };

//     const handleError = (err) => {
//       setError(err.message);
//       setLoading(false);
//     };

//     // Optional configuration settings
//     const options = {
//       enableHighAccuracy: true, // Uses GPS if available
//       timeout: 5000,            // Wait maximum of 5 seconds
//       maximumAge: 0             // Do not use a cached position
//     };

//     // Request the current position
//     navigator.geolocation.getCurrentPosition(handleSuccess, handleError, options);
//   }, []);

//   useEffect(() => {
//     console.log(location);
//   }, [location]);

//   return (

//     <div style={{ padding: '20px', fontFamily: 'sans-serif' }}>
//       <h2>Device Location Status</h2>
//       {loading && <p>Fetching your location...</p>}
//       {error && <p style={{ color: 'red' }}>Error: {error}</p>}
//       {!loading && !error && (
//         <div>
//           <p><strong>Latitude:</strong> {location.latitude}</p>
//           <p><strong>Longitude:</strong> {location.longitude}</p>
//         </div>
//       )}
//     </div>
//   );
// }

// export default Location;
