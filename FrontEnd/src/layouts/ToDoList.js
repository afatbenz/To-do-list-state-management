import React,{useState,useEffect} from 'react'
import axios from 'axios'
import ReactPaginate from 'react-paginate'
import '../assets/css/style.css'
import NavBar from "../components/Navbars/navbar"

const Award = ()=>{
    const [award, setAward ] = useState([])
    const [pageNumber, setPageNumber] = useState(0)

    useEffect(()=>{
        getAwards()
    }, [])

    const getAwards = async ()=>{
        const response = await axios.get('http://localhost:3100/api/awards')
        setAward(response.data.data)
    }

    const awardPerPage = 5
    const pageVisited  = pageNumber * awardPerPage

    const displayAward = award
                        .slice(pageVisited, pageVisited + awardPerPage)
                        .map((item)=>{
                            return (
                                <div key={item.id} className="card award-card">
                                    <div className="container label-card-award">
                                        <div className='category-label-card'>
                                            <p className={item.title}>{item.title}</p>
                                        </div>
                                    </div>
                                    <p className='title-awards-card'>{item.name}</p>
                                </div>
                            )
                        })
    const pageCount  = Math.ceil(award.length / awardPerPage)
    const changePage = ({selected})=>{
        setPageNumber(selected)
    }
    return(
        <div className="wrapper d-flex align-items-stretch">
            <NavBar />
            <div id="content" className="p-4 p-md-5 pt-5 award-list">
                <h4>AWARDS</h4>
                <div className='section-award-list'>
                {displayAward}
                <ReactPaginate 
                    previousLabel={'Back'}
                    nextLabel={'Next'}
                    pageCount={pageCount}
                    onPageChange={changePage}
                    containerClassName={'PaginationBtts'}
                    previousLinkClassName={'PreviousBttn'}
                    nextLinkClassName={'NextBttn'}
                    disabledClassName={'paginationDisable'}
                    activeClassName={'paginationActive'}
                />
                </div>
			</div>
        </div>       
    )
}

export default Award;