import React, { useState, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import axios from 'axios';

const KudosByCategoryChart = () => {
  const [data, setData] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchKudosByCategory = async () => {
      try {
        const response = await axios.get('/api/kudos/kudos-by-category');
        console.log(response,'data')
        setData(response.data);
      } catch (err) {
        setError('Failed to load chart data.');
      }
    };

    fetchKudosByCategory();
  }, []);

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      {error && <p className="text-red-500">{error}</p>}
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="category" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="count" fill="#3B82F6" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default KudosByCategoryChart;
