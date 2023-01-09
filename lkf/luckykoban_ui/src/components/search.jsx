import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Cases() {
  const [loading, setLoading] = useState(false);
  const [posts, setPosts] = useState([]);
  const [searchTitle, setSearchTitle] = useState('');

  useEffect(() => {
    const loadPost = async () => {
      setLoading(true);
      const response = await axios.get(
        'https://jsonplaceholder.typicode.com/posts'
      );
      setPosts(response.data);
      setLoading(false);
    };

    loadPost();
  }, []);

  return (
    <div className='cases'>
      <h1 className='cases__title'>searchFilter</h1>
      {loading ? (
        <h4>loading...</h4>
      ) : (
        posts.map((item) => <h5 key={item.id}>{item.title}</h5>)
      )}
    </div>
  );
}

export { Cases };
