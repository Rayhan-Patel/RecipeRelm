import React, { useState, useEffect } from 'react';
import './media/css/Home.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import veg from './media/images/veg.svg'
import nonveg from './media/images/nonveg.svg'
import dinner from './media/images/dinner.jpg'
import appitizer from './media/images/appitizer.jpg'
import breakfast from './media/images/breakfast.jpg'
import snack from './media/images/snack.jpg'

const Home = () => {
    const [random_recipes, setrecipes] = useState(null)
    const [load, setload] = useState(false)

    useEffect(() => {
        setTimeout(() => {
            axios.get('http://localhost:8000/')
                .then(response => {
                    setrecipes(response.data);
                    setload(true)
                })
                .catch(error => {
                    console.error('There was an error fetching the data!', error);
                });
        }, 2000);
    }, []);

    return (
        <div id="main">
            <h1 className="text-center">Welcome to My Recipe Book</h1>
            <p className="lead text-center">
                Discover new recipes, save your favorites, and share with friends!
            </p>

            <h2>Explore Categories</h2>
            <div className="categories-grid m-4 m-lg-5 mb-lg-3 ">
                <div className="category-card">
                    <a href='/recipe/Dinner'>
                        <img src={dinner} alt='Dinner' />
                        <h3>Dinner</h3>
                    </a>
                </div>
                <div className="category-card">
                    <a href='/recipe/Lunch'>
                        <img src={appitizer} alt='Lunch' />
                        <h3>Lunch</h3>
                    </a>
                </div>
                <div className="category-card">
                    <a href='/recipe/Breakfast'>
                        <img src={breakfast} alt='Breakfast' />
                        <h3>BreakFast</h3>
                    </a>
                </div>
                <div className="category-card">
                    <a href='/recipe/Snack'>
                        <img src={snack} alt='Snack' />
                        <h3>Snack</h3>
                    </a>
                </div>
            </div>

            <div className="row m-lg-5 mt-lg-3">
                <h2>Today's Top</h2>
                {load ? random_recipes['random_recipe'].map(recipe => (
                    <div className="col-lg-4">
                        <div className="card">
                            {recipe['diet'].includes('Non Veg') ? (
                                <img id='diet' src={nonveg} alt="Non-Vegetarian" />
                            ) : (
                                <img id='diet' src={veg} alt="Vegetarian" />
                            )}
                            <img src={recipe['image_url']} className="card-img-top" alt={recipe['name']} />
                            <h3 className="card-header card-title">
                                {recipe['name']}
                            </h3>
                            <div className="card-body">
                                <p className="card-text">
                                    <span>Description:</span>
                                    {recipe['description']
                                        .slice(0, 110) +
                                        (recipe['description'].split(' ').length > 20 ? '...' : '')}
                                </p>
                            </div>
                            <div className="card-grid card-footer">
                                <div className="card-grid-item">
                                    <span>Total Time:</span> {recipe['prep_time'] + recipe['cook_time']+' mins'} 
                                </div>
                                <div className="card-grid-item">
                                    <span>Cuisine:</span> {recipe['cuisine'].split(' Recipes')}
                                </div>
                            </div>
                            <a id='view_recipe' href={'/recipes/' + recipe['id']} className="btn btn-primary"> View Recipe</a>
                        </div>

                    </div>
                )) : <center>Loading</center>}
            </div>
            <footer id="footer">
                <p>&copy; 2024 Recipe Relm. All rights reserved.</p>
            </footer>
        </div>
    );
};

export default Home;
