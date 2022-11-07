import React,{useState,useEffect} from 'react'
import {Input} from 'reactstrap'
import { useNavigate } from 'react-router';
import axios from 'axios'
import '../assets/css/style.css'

const Home = ()=>{
    const navigate = useNavigate([])
    const [email, setEmail, password, setPassword] = useState([])

    useEffect(()=>{
        if(localStorage.getItem('user-info')){
            navigate("/")
        }
    },[navigate])
    const SignIn = async ()=>{
        const response = await axios.post('http://localhost:3100/api/auth/login', {email, password})
        if(response.status === 200){
            localStorage.setItem("user-info", JSON.stringify(response.data))
            navigate("/toDoList")
        }
    }
    return(
        <div className="wrapper d-flex align-items-stretch">
            <div id="content" className="p-4 p-md-5 pt-5 fullwidth">
				<h1 className="mb-4 title">To Do List Login</h1>
                <p>Enter your email adress <br/>To Sign and Continue</p>
                <div className='input-group'>
                        <Input type="text" className="form-control" placeholder="Your email here ..." id="username" onChange={(e)=>setEmail(e.target.value)} autoFocus required />
                </div>
                <div className='input-group'>
                        <Input type="password" className="form-control" placeholder="Your password here ..." id="password" onChange={(e)=>setPassword(e.target.value)} autoFocus required />
                </div>
                <button onClick={SignIn} className="btn btn-dark btn-full">Sign In</button>
			</div>
        </div>       
    )
}

export default Home;