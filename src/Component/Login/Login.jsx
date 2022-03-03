import axios from 'axios';
import React ,{useState} from 'react'
import Joi from 'joi'
import { useNavigate } from 'react-router-dom';

export default function Login(props) {
  let navigate=useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [errorList, setErrorList] = useState([]);
  const [error, setError] = useState('');
  const [user, setUser] = useState({
    email:'',
    password:''
  }); 
  
  
  function getUser(e){
    let myUser={...user};
    myUser[e.target.name]=e.target.value;
    setUser(myUser);
  }
  async function submitLogin(e){
    setIsLoading(true);
    e.preventDefault();
    let valRes=validateLogin(user);
    if(valRes.error){
      setIsLoading(false);
      setErrorList(valRes.error.details);

    }
    else{
    let {data}= await axios.post(`https://route-egypt-api.herokuapp.com/signin`,user);
    if(data.message==="success"){
      localStorage.setItem('userToken',data.token);
      setIsLoading(false);
      props.getUserData();
      navigate('/home');
    }
    else{
        setError(data.message);
        setIsLoading(false);
    }
    }
  }

    function validateLogin(user){
      let schema=Joi.object({
        email:Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }),
        password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')),
      });
      return schema.validate(user,{abortEarly:false})      
    }  

  
  return (
    <div className='py-4'>
      <h2 className='my-3 mb-5'>Login Now!!!</h2>
      {errorList.map((error , index)=>{
       if(index===4){
        return <div key={index} className='alert alert-danger'>Password Invalid</div>
       }
       else{
        return <div key={index} className='alert alert-danger'>{error.message}</div>
       }})}

      {error?<div className="alert alert-danger">{error}</div>:''}
      <form onSubmit={submitLogin}>

      <label htmlFor="email">Email</label>
      <input onChange={getUser}  type="email" className='form-control my-3' id='email' name='email'/>

      <label htmlFor="password">Password</label>
      <input onChange={getUser}  type="password" className='form-control my-3' id='password' name='password'/>

      <button  className='btn btn-outline-info mt-3'>

        {isLoading? <i className='fas fa-spinner fa-spin'></i>:'Login'}
      </button>
      </form>
    </div>
  )
}