import React from 'react';
import { Routes ,Route, Navigate, useNavigate } from 'react-router-dom';
import Navbar from './Component/Navbar/Navbar';
import Home from './Component/Home/Home';
import Movies from './Component/Movies/Movies';
import Tv from './Component/TV/Tv';
import Register from './Component/Register/Register';
import Login from './Component/Login/Login';
import Notfound from './Component/Notfound/Notfound';
import People from './Component/People/People'
import { useState } from 'react';
import jwtDecode from 'jwt-decode';
import { useEffect } from 'react';
import TvDetails from './Component/TvDetails/TvDetails'
import Details from './Component/MoviesDetails/Details';
import PersonDetails from './Component/PersonDetails/PersonDetails'
import Footer from './Component/Footer/Footer';



const App = () => {

    useEffect(() => {
        if(localStorage.getItem('userToken'))
        {
            getUserData();
        }
    }, [])
    
    let navigate=useNavigate();
    const [userData, setUserData] = useState(null);
    function getUserData(){
      let decoded=  jwtDecode(localStorage.getItem('userToken'));
      setUserData(decoded);
    }
    function logout(){
        localStorage.removeItem('userToken');
        setUserData(null);
        navigate('./login');
    }
    function ProtectedRoute({ children }){
        if(!localStorage.getItem('userToken')){
           return <Navigate to="/login" />;
        }
  
            return children;
        
    }
    return (
        <div>
            <Navbar  userData={userData} logout={logout}/>
            <div className="container">
            <Routes>
                <Route path='/' element={<Home/>}/>
                <Route path='home' element={<ProtectedRoute><Home/></ProtectedRoute>}/>
                <Route path='tv' element={<ProtectedRoute><Tv/></ProtectedRoute>}/>
                <Route path='movies' element={<ProtectedRoute><Movies/></ProtectedRoute>}/>
                <Route path='details' element={<ProtectedRoute><Details/></ProtectedRoute>}>
                    <Route path=':id' element={<Details/>}/>
                </Route>
                <Route path='tvdetails' element={<ProtectedRoute><TvDetails/></ProtectedRoute>}>
                    <Route path=':id' element={<TvDetails/>}/>
                </Route>
                <Route path='persondetails' element={<ProtectedRoute><PersonDetails/></ProtectedRoute>}>
                    <Route path=':id' element={<PersonDetails/>}/>
                </Route>
                <Route path='register' element={<Register/>}/>
                <Route path='login' element={<Login getUserData={getUserData}/> }/>
                <Route path='people' element={<ProtectedRoute><People/></ProtectedRoute>}/>
                <Route path='*' element={<Notfound/>}/>

                
            </Routes>
            </div>
            <Footer/>
            
        </div>
        
    );
}

export default App;
