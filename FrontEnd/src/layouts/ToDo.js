import React,{useEffect, useState} from 'react'
// import {Input} from 'reactstrap'
import { useNavigate } from 'react-router';
import axios from 'axios'
import swal from 'sweetalert';
import TodosList from '../components/todoList'
import '../assets/css/style.css'

const Home = ()=>{
    const ref = React.useRef();
    const navigate = useNavigate([])

    const [title, setTitle] = useState()
    const [description, setDescription] = useState()
    const [todos, setTodos] = useState([])

    useEffect(()=>{
        getToDoList()
        if(!localStorage.getItem('user-info')){
            navigate("/")
        }
    },[navigate])

    const getToDoList = async ()=>{
        const authToken = localStorage.getItem('user-info');
        const response = await axios.get('http://localhost:3100/api/item/list', {
                    headers: {
                      'Authorization': authToken
                    }
                })
        setTodos(response.data.data)
    }

    const addToDo = async () => {
        const authToken = localStorage.getItem('user-info');
        const headers = {
            'Authorization': authToken
        }

        const response = await axios.post('http://localhost:3100/api/item/submit', {headers:headers, title,description} )

        if(response.status === 200){
            const newID = todos.length > 0 ? todos[todos.length - 1].id + 1 : 1
            setTodos([...todos, {id:newID, title, description, status:1}])
            swal("Saved successfully!",response.data.message, "success");
            ref.current.reset();
        }else if(response.status === 401){
            localStorage.setItem("user-info", '')
            navigate("/")
        }else{
            swal("Failed to save!",response, "error");
        }
    }
    
    return(
        <div className="wrapper d-flex align-items-stretch">
            <div id="content" className="p-4 p-md-5 pt-5 fullwidth">
                <div className='titleSection'>
				    <h1 className="title">TO-DO LIST</h1>
                </div>
                
                <form className='form-inline' ref={ref}>
                    <div className="form-group">
                      <input type='text' placeholder='Enter your activity...' id='title' className='form-control w-75' onChange={(e)=>setTitle(e.target.value)} />
                      <input type='text' placeholder='Description...' id='description' className='form-control w-75' onChange={(e)=>setDescription(e.target.value)} />
                      <button onClick={addToDo} type="button" className="btn btn-success w-20 ml-2">+ Add ToDo</button>
                    </div>
                </form>

                <div className='sectionToDos'>
                    <TodosList todos={todos} setTodos={setTodos} />
                </div>
			</div>
        </div>       
    )
}

export default Home;