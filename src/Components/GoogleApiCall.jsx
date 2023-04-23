import React, { useState, useEffect } from 'react';

const API_URL = 'https://newsapi.org/v2/top-headlines?country=us&pageSize=6&apiKey=f99ae8fde0d443df898e2883ab7cf3dc';

const GoogleApiCall = () => {
  const [news, setNews] = useState([]);
  const [error, setError] = useState(false);

  useEffect(() => {
    const intervalId = setInterval(() => {
      fetchApiData();
    }, 60000);
    fetchApiData();
    return () => clearInterval(intervalId);
  }, []);

  const fetchApiData = async () => {
    try {
      const response = await fetch(API_URL);
      if (!response.ok) throw new Error('API response not ok');
      const data = await response.json();
      setNews(data.articles.slice(2));
      setError(false);
    } catch (error) {
      console.error(error);
      setNews([]);
      setError(true);
    }
  };

  return (
    <div className="newsapi">
      {error ? (
        <div>API request failed. Please try again later.</div>
      ) : news.length ? (
        news.map((news) => (
          <div className="APIcontent" key={news.url} style={{ marginLeft: '10px' }}>
            <h3>{news.title}</h3>
            <img
              src={news.urlToImage}
              alt={news.title}
              style={{ height: '33vh', width: '32vw' }}
            />
            <p className="source_des">
              <strong>{news.description}</strong>
            </p>
            <p className="source_name">{news.source.name}</p>
            <p>{new Date(news.publishedAt).toLocaleDateString()}</p>
            <p className="source_content">{news.content}</p>
            <p className="source_url">
              <a href={news.url} target="_blank" rel="noopener noreferrer">
                {news.url}
              </a>
            </p>
          </div>
        ))
      ) : (
        <div className='loader'>
          <span class="loader__element"></span>
          <span class="loader__element"></span>
          <span class="loader__element"></span>
        </div>
      )}
    </div>
  );
};

export default GoogleApiCall;
