import axios from 'axios';
import React ,{useState} from 'react'
import Joi from 'joi'
import { useNavigate } from 'react-router-dom';

export default function Register() {
  let navigate=useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [errorList, setErrorList] = useState([]);
  const [error, setError] = useState('');
  const [user, setUser] = useState({
    first_name:'',
    last_name:'',
    email:'',
    age:0,
    password:''
  }); 
  
  
  function getUser(e){
    let myUser={...user};
    myUser[e.target.name]=e.target.value;
    setUser(myUser);
  }
  async function submitRegister(e){
    setIsLoading(true);
    e.preventDefault();
    let valRes=validateRegisterForm(user);
    if(valRes.error){
      setIsLoading(false);
      setErrorList(valRes.error.details);

    }
    else{
    let {data}= await axios.post(`https://route-egypt-api.herokuapp.com/signup`,user);
    if(data.message==="success"){
      setIsLoading(false);
      navigate('/login')
    }
    else{
        setError(data.message);
        setIsLoading(false);
    }
    }
  }

    function validateRegisterForm(user){
      let schema=Joi.object({
        first_name:Joi.string().alphanum().min(3).max(10).required(),
        last_name:Joi.string().alphanum().min(3).max(10).required(),
        age:Joi.number().min(16).max(100).required(),
        email:Joi.string()
        .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }),
        password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')),
        });
      return schema.validate(user,{abortEarly:false})      
    }  

  
  return (
    <div className='py-4'>
      <h2 className='my-3 mb-5'>Register Now!!!</h2>
      {errorList.map((error , index)=>{
       if(index===4){
        return <div key={index} className='alert alert-danger'>Password Invalid</div>
       }
       else{
        return <div key={index} className='alert alert-danger'>{error.message}</div>
       }})}

      {error?<div className="alert alert-danger">{error}</div>:''}
      <form onSubmit={submitRegister}>
      <label htmlFor="first_name">First Name</label>
      <input onChange={getUser} type="text" className='form-control my-3' id='first_name' name='first_name'/>
      
      <label htmlFor="last_name">Last Name</label>
      <input onChange={getUser} type="text" className='form-control my-3' id='last_name' name='last_name'/>
       
      <label htmlFor="age">Age</label>
      <input onChange={getUser}  type="number" className='form-control my-3' id='age' name='age'/>

      <label htmlFor="email">Email</label>
      <input onChange={getUser}  type="email" className='form-control my-3' id='email' name='email'/>

      <label htmlFor="password">Password</label>
      <input onChange={getUser}  type="password" className='form-control my-3' id='password' name='password'/>

      <button  className='btn btn-outline-info mt-3'>

        {isLoading? <i className='fas fa-spinner fa-spin'></i>:'Register'}
      </button>
      </form>
    </div>
  )
}
