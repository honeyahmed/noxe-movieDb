 import axios from 'axios';
import React from 'react';
 import { useState,useEffect } from "react";
 import { Link } from 'react-router-dom';
 
 const Home = () => {
   const [tredningMovies, settredningMovies] = useState([]);
   const [tredningTv, settredningTv] = useState([]);
   const [tredningPeople, settredningPeople] = useState([]);


  async function getTrending(mediaType,callback){
    let {data}= await axios.get('https://api.themoviedb.org/3/trending/'+mediaType+'/week?api_key=3de1f5a9debca05320c40942880b966c');
      callback(data.results.slice(0,10))
    }
    useEffect(() =>   {
      getTrending('movies',settredningMovies) ;
      getTrending('tv',settredningTv) ;
      getTrending('person',settredningPeople);
      return () => {
        settredningMovies([]); 
        settredningTv([]);
        settredningPeople([]);
      };
    }, []);
   return (
     <div className='py-4'>
  
     <div className="row pb-5 gy-4">
       <div className="col-md-4">
         <div className="brdr my-3 w-25"></div>
        <h2>Trending <br/> Movies <br/> To Watch Now</h2>
        <p className='text-muted'>Lorem ipsum dolor sit amet consectetur.</p>
        <div className="brdr my-3"></div>

       </div>
       {tredningMovies.map((movie,index)=> <div key={index} className='col-md-2'> 
        <div className="movie">
          <Link to={`/details/${movie.id}`}>
          <img src={'https://image.tmdb.org/t/p/w500'+ movie.poster_path} alt="" className='w-100' />
          <h3 className='h5 mt-2'>{movie.original_title?movie.original_title : movie.name}</h3>
          </Link>
     
        </div>
       </div>)}
     </div>

     <div className="row pb-5 gy-4">
    <div className="col-md-4 ">
      <div className="brdr my-3 w-25"></div>
     <h2>Trending <br/> TV Shows <br/> To Watch Now</h2>
     <p className='text-muted'>Lorem ipsum dolor sit amet consectetur.</p>
     <div className="brdr my-3"></div>

    </div>
    {tredningTv.map((tv,index)=> <div key={index} className='col-md-2'> 
     <div className="tv">
       <Link to={`/tvdetails/${tv.id}`}>
       <img src={'https://image.tmdb.org/t/p/w500'+ tv.poster_path} alt="" className='w-100' />
       <h3 className='h5 mt-2'>{tv.name}</h3>
       </Link>

     </div>
    </div>)}
  </div>
  <div className="row gy-4">
    <div className="col-md-4 ">
      <div className="brdr my-3 w-25"></div>
     <h2>Trending <br/> People <br/> To Know Now</h2>
     <p className='text-muted'>Lorem ipsum dolor sit amet consectetur.</p>
     <div className="brdr my-3"></div>

    </div>
    {tredningPeople.map((person,index)=> <div key={index} className='col-md-2'> 
     <div className="people">
      <Link to={`/persondetails/${person.id}`}>
      <img src={'https://image.tmdb.org/t/p/w500'+ person.profile_path} alt="" className='w-100' />
       <h3 className='h5 mt-2'>{person.name}</h3>
       </Link>
     </div>
    </div>)}
  </div>
  </div>
   );
 }
 
 export default Home;
 