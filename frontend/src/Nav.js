import React, { useState, useRef } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import Home from './Home';
import Recipe from './Recipe';
import IndividualRecipe from './IndiviualRecipe.js'
import './media/css/Nav.css';
import Homelogo from './media/images/Home.png';
import Recipebooklogo from './media/images/Recipebook.png';
import Websitelogo from './media/images/websitelogo.png';
import Searchlogo from './media/images/search.svg'

const Main = () => {
    const [isNavExpanded, setIsNavExpanded] = useState('close');
    // const [login_display, setlogin] = useState('')
    // const [logout_display, setlogout] = useState('None')
    const [isExpanded, setIsExpanded] = useState(true); // State to control expansion
    const [searchform, setsearch] = useState('None')
    const inputRef = useRef(null); // Reference to the input field


    // useEffect(()=>{
    //     axios.get('http://localhost:8000/Account/LoginStatus/')
    //     .then(response => {
    //         console.log(response.data);
            
    //         if(response.data === true){
    //             setlogin('None')
    //             setlogout('')
    //         }
    //         else{
    //             setlogin('')
    //             setlogout('None')
    //         }
    //     })
    // })


    // Search Form
    const expandForm = () => {
        if (!isExpanded) {
            setsearch('block')
            setIsExpanded(true)
            setTimeout(() => inputRef.current.focus(), 300); // Delay to match animation
        }
        else {
            setIsExpanded(false)
            setsearch('None')
        }
    };
    const toggleNav = () => {
        if (isNavExpanded === 'close') {
            setIsNavExpanded('navbaropen');
        }
        else {
            setIsNavExpanded('close');
        }
    };

    return (
        <>
            <div className="container-fluid">
                <Router>
                    <div className="logo">
                        <Link to="/"><img src={Websitelogo} id='logo' alt="Website Logo" /></Link>
                        <button onClick={toggleNav}>
                            <span className='bar'></span>
                            <span className='bar'></span>
                            <span className='bar'></span>
                        </button>
                        <form action='/recipe/' id='searchform' style={{ display: searchform }}>
                            <input
                                ref={inputRef}
                                type="text"
                                name="Search"
                                className="search"
                                placeholder='Search Recipe'
                            />
                        </form>
                        <nav className={isNavExpanded} onClick={toggleNav}>
                            <div className="nav-links" >
                                <Link><img src={Searchlogo} id='searchlogo' onClick={expandForm} alt="Search" /></Link>
                                <Link to="/"><img src={Homelogo} alt="Home" />Home</Link>
                                <Link to="/recipe"><img src={Recipebooklogo} alt="Recipes" />Recipes</Link>
                                {/* <Link style={{ display: login_display }} to="/login"><img src={Loginlogo} alt="Login" />Login</Link>
                                <Link style={{ display: logout_display }} to="/logout"><img src={Loginlogo} alt="Login" />Logout</Link> */}
                            </div>
                        </nav>
                    </div>
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/recipe" element={<Recipe />} />
                        <Route path="/recipe/:Course" element={<Recipe />} />
                        <Route path="/recipes/:id" element={<IndividualRecipe />} />
                        {/* <Route path="/login" element={<Login />} /> */}
                        {/* <Route path="/signup" element={<SignUp />} /> */}
                        {/* <Route path="/logout" /> */}
                    </Routes>
                </Router >
            </div>
        </>
    );
};

export default Main;
