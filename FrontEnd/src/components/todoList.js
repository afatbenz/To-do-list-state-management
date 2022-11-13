import React, { useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheck, faTrash } from '@fortawesome/free-solid-svg-icons'
import axios from 'axios'
import swal from 'sweetalert';

const TodoList = ({todos, setTodos}) => {

    const [visible, setVisible] = useState(false)

    const actionDelete = async ({id}) => {
        const authToken = localStorage.getItem('user-info');
        const headers = {
            'Authorization': authToken
        } 
        swal({ title: "Delete this activity?", 
               text: "Activity will be removed from the to-do list",
               icon: "warning",
               buttons:true,
               dangerMode:true,
            })
            .then(async(willDelete) => {
                if (willDelete) {
                    const response = await axios.post('http://localhost:3100/api/item/delete', {headers:headers, itemID:id} )
                    if(response.status === 200){
                        swal("Your activity successfully deleted!", {icon: "success", });
                        setTodos(todos.filter((todo) => todo.id !== id))
                    }
            }else{
                swal("Activity deletion canceled!", {icon: "error", });
            }
        });
    };

    const actionComplete = async ({id}) => {
        const authToken = localStorage.getItem('user-info');
        const headers = {
            'Authorization': authToken
        } 
        swal({ title: "Complete this task?", 
               text: "Activity will be mark as completed from the to-do list",
               icon: "warning",
               buttons:true,
               dangerMode:true,
            })
            .then(async(willDelete) => {
                if (willDelete) {
                    const response = await axios.post('http://localhost:3100/api/item/completed', {headers:headers, itemID:id} )
                    if(response.status === 200){
                        swal("Your activity successfully complete!", {icon: "success", });
                        document.getElementById(`check-${id}`).remove()
                        document.getElementById(`trash-${id}`).remove()
                        document.getElementById(`todos-${id}`).classList.remove("active")
                        setVisible(true);
                    }
            }else{
                swal("Activity deletion canceled!", {icon: "error", });
            }
        });
    };

    let num = 1;
    return (
        <div>
            {todos.map((todo) => (
                <li className={todo.status === 1 ? 'row row-todos active' : 'row row-todos' } id={`todos-${todo.id}`} key={todo.id}>
                    <div className="column-todos column-left">
                        <p className='list' onChange={(event) => event.preventDefault()}>{num++}. {todo.title}</p>
                        <label>{todo.description}</label>
                    </div>
                    <div className="column-todos column-right align-right" id={`column-${todo.id}`}>
                        {todo.status === 1 ? <button onClick={() => actionComplete(todo)} className="btn btn-info" id={`check-${todo.id}`}><FontAwesomeIcon icon={faCheck} /></button> : '' }
                        {todo.status === 1 ? <button onClick={() => actionDelete(todo)} className="btn btn-danger" id={`trash-${todo.id}`}><FontAwesomeIcon icon={faTrash} /></button> : '' }
                        {todo.status === 2 || visible ? <button className="btn btn-completed" alt='Completed' ><FontAwesomeIcon icon={faCheck} /></button> : '' }
                    </div>
                </li>
                )
            )}
        </div>
    )
}

export default TodoList