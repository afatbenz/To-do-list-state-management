import React from 'react'
import '../assets/css/style.css'
import starIcon from '../assets/img/starLogo.png'

const NotFound = ()=>{
    return(
        <div className="wrapper d-flex align-items-stretch">
            <div id="content" className="p-4 p-md-5 pt-5 fullwidth">
                <img src={starIcon} alt="Logo" />;
				<h1 className="title-404">404</h1>
                <h6 className="mb-10 title">Not Found</h6>

                <a href='/awards' >Back To Award Page</a>
			</div>
        </div>       
    )
}

export default NotFound;