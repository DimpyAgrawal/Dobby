import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useLocation } from 'react-router-dom';

export default function Profile() {
  const location = useLocation();
  const [allPost, setAllPost] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  const fetchProfilePost = async (userId) => {
    try {
      const response = await axios.get(`http://localhost:8080/post/posts/${userId}`, {
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem('token')
        }
      });
      setAllPost(response.data);
    } catch (error) {
      console.log('Error fetching user posts:', error);
    }
  };

  useEffect(() => {
    const userId = location.state ? location.state.ID : localStorage.getItem('id');
    fetchProfilePost(userId);
  }, [location.state]);

  // Filter posts based on search query
  const filteredPosts = allPost.filter(post =>
    post.body.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className='w-full h-full'>
      <input
        type="search"
        name=""
        className='p-4 mt-2 ml-2 bg-gray-100 rounded-md border border-gray-300 focus:outline-none focus:ring focus:border-blue-500'
        placeholder='Search here ...'
        id=""
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />


      {filteredPosts.length > 0 && (
        <div className='flex flex-wrap w-[45%] p-4 m-auto mt-[2%] ml-[32%]'>
          {filteredPosts.map((post) => (
            <div key={post._id}>
              <img className='w-[15rem]  h-[15rem]  justify-around p-5' src={post.photo || "https://img.freepik.com/free-photo/handsome-bearded-guy-posing-against-white-wall_273609-20597.jpg?size=626&ext=jpg&ga=GA1.1.1826414947.1700438400&semt=sph"} alt='' />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
