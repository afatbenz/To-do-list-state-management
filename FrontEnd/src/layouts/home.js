import React,{useState,useEffect} from 'react'
import {Input} from 'reactstrap'
import { useNavigate } from 'react-router';
import axios from 'axios'
import swal from 'sweetalert';
import '../assets/css/style.css'

const Home = ()=>{
    const navigate = useNavigate([])
    const [email, setEmail] = useState()
    const [password, setPassword] = useState()

    useEffect(()=>{
        if(localStorage.getItem('user-info')){
            navigate("/")
        }
    },[navigate])
    const SignIn = async ()=>{
        const response = await axios.post('http://localhost:3100/api/auth/login', {email, password})
        if(response.status === 200){
            console.log(response.data.data.token)
            localStorage.setItem("user-info", response.data.data.token)
            navigate("/toDoList")
        }else{
            swal("Login Error",response.data.message, "error");
        }
    }
    return(
        <div className="wrapper d-flex align-items-stretch">
            <div id="loginForm" className="p-4 p-md-5 pt-5 fullwidth">
                <div className='titleSection'>
				    <h1 className="title">LOGIN FORM</h1>
                </div>
                <p>Enter your email and password <br/>To Continue</p>
                <form>
                    <div className='form-outline mb-4'>
                            <Input type="text" className="form-control" placeholder="Your email here ..." id="username" onChange={(e)=>setEmail(e.target.value)} autoFocus required />
                    </div>
                    <div className='form-outline mb-4'>
                            <Input type="password" className="form-control" placeholder="Your password here ..." id="password" onChange={(e)=>setPassword(e.target.value)} required />
                    </div>
                    <div className='form-outline mb-4'>
                        <button onClick={SignIn} type="Button" className="btn btn-success btn-full">Sign In</button>
                    </div>
                </form>
			</div>
        </div>       
    )
}

export default Home;