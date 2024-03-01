import React, { useEffect, useState } from 'react';
import axios from 'axios';

function AllUser() {
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:3001/protected', {
          headers: { Authorization: localStorage.getItem('token') },
        });
        setData(response.data);
      } catch (error) {
        console.error('Error fetching protected data:', error.message);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <h2>Protected Route</h2>
      {data && (
        <div>
          <p>{data.message}</p>
          <p>User: {data.user.email}</p>
        </div>
      )}
    </div>
  );
}

export default AllUser;
