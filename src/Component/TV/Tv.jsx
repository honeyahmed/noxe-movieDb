
import React from 'react'
import { useState,useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

export default function People() {
  const [tredningTv, settredningTv] = useState([]);
 async function getTrending(mediaType,callback){
   let {data}= await axios.get('https://api.themoviedb.org/3/trending/'+mediaType+'/week?api_key=3de1f5a9debca05320c40942880b966c');
     callback(data.results)
   }
   useEffect(() =>   {
     getTrending('tv',settredningTv) ;
    
   },[]);


  return (
    <div className='py-4'>
    <div className="row pb-5 gy-4">
    <div className="col-md-4">
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
  </div>
  )}
