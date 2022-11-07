import React, {useState,useEffect} from 'react'
// import {Input} from 'reactstrap'
import axios from 'axios'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars, faTimes } from '@fortawesome/free-solid-svg-icons'
import '../../assets/css/style.css'

const NavBar = (proops)=>{
	const [menu, setMenu ] = useState([])

    useEffect(()=>{
        getMenu()
    }, [])

    const getMenu = async ()=>{
        const response = await axios.get('http://localhost:3100/api/ui-menu')
        setMenu(response.data.data)
    }

	const [switchToggle, setSwitchToggle] = useState(true)
	const ToggleSwitch = ()=>{
		switchToggle ? setSwitchToggle(false) : setSwitchToggle(true)
	}
    return(
		<div id='bgNavbar' className={switchToggle ? '' : 'active'}>
			<nav id="sidebar" className={switchToggle ? '' : 'active'}>
				<div className="custom-menu">
					<button type="button" onClick={ToggleSwitch} id="sidebarCollapse" className={switchToggle ? 'btn btn-primary' : 'btn btn-primary active'}>
						<FontAwesomeIcon icon={switchToggle ? faBars : faTimes} /><span className="sr-only">Toggle Menu</span>
					</button>
				</div>
				<div className="p-4 pt-5">
						<h1>AWARD</h1>
						<ul className="list-unstyled components mb-5">
							{menu.map((item, index) => (<li key={item.id}><a href={item.url}>{item.title}</a></li>))}
						</ul>

						<div className="footer">
							<p>M. N. Mafatichul Fuadi</p>
						</div>
					</div>
			</nav>
		</div>
    )
}

export default NavBar;