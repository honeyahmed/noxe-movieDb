import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useParams} from 'react-router-dom';
import question from '../qm.png'
import Particles from "react-tsparticles";

export default function Details() {
  
   let params=useParams();
   const [tvShows, setTv] = useState([]);
   async function getTvData(){
    let {data} = await axios.get('https://api.themoviedb.org/3/tv/'+params.id+'?api_key=3de1f5a9debca05320c40942880b966c&language=en-US');
    setTv(data)  ;
    console.log(data);
  }
useEffect(() => {
  getTvData() ;
  return () => {
    setTv({}); 
  };
}, []);
  return (
    <>
    <Particles
      options={{
       
          "background": {
            "color": {
              "value": "none"
            },
            "image": "none",
            "position": "50% 50%",
            "repeat": "no-repeat",
            "size": "20%"
          },
          "fullScreen": {
            "zIndex": 1
          },
          "interactivity": {
            "events": {
              "onClick": {
                "enable": true,
                "mode": "repulse"
              },
              "onHover": {
                "enable": true,
                "mode": "bubble"
              }
            },
            "modes": {
              "bubble": {
                "distance": 250,
                "duration": 2,
                "opacity": 0,
                "size": 0
              },
              "grab": {
                "distance": 400
              },
              "repulse": {
                "distance": 400
              }
            }
          },
          "particles": {
            "color": {
              "value": "#ffffff"
            },
            "links": {
              "color": {
                "value": "#ffffff"
              },
              "distance": 150,
              "opacity": 0.4
            },
            "move": {
              "attract": {
                "rotate": {
                  "x": 600,
                  "y": 600
                }
              },
              "enable": true,
              "path": {},
              "outModes": {
                "bottom": "out",
                "left": "out",
                "right": "out",
                "top": "out"
              },
              "random": true,
              "speed": 1,
              "spin": {}
            },
            "number": {
              "density": {
                "enable": true
              },
              "value": 160
            },
            "opacity": {
              "random": {
                "enable": true
              },
              "value": {
                "min": 0,
                "max": 1
              },
              "animation": {
                "enable": true,
                "speed": 1,
                "minimumValue": 0
              }
            },
            "size": {
              "random": {
                "enable": true
              },
              "value": {
                "min": 1,
                "max": 3
              },
              "animation": {
                "speed": 4,
                "minimumValue": 0.3
              }
            }
        }
      }}
    />
    <div className='container text-center m-0 p-0 py-5'>
   
          <div className=" d-flex justify-content-center">
      
            {
            tvShows.poster_path?  <>
            <div className='circle '>
            <img src={'https://image.tmdb.org/t/p/w500'+ tvShows.poster_path} alt=""  className='w-100' />
            </div>
              
              </>:
              <>
              <img src={question} alt="" className='w-50' />

                
              </>

            }
            </div>
            <h2 className='text-center fw-bold mt-5 '>{tvShows.title}</h2>
            <center>  <p className='text-muted w-75 mt-3'>{tvShows.overview}</p></center>
            <h4 className='fw-bold'>Rating : <span>{tvShows.vote_average}</span></h4>
            <p className='text-muted'>Release Date : <span>{tvShows.first_air_date}</span></p>

      </div>
      </>
  )
}
