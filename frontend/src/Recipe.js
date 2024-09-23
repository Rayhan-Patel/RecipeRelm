import React, { useState, useEffect } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import { Link } from 'react-router-dom'
import './media/css/RecipeDetail.css'
import axios from 'axios';

const RecipeList = () => {
    const [recipes, setRecipes] = useState([]);
    const [cuisine, setcuisine] = useState(null)
    const [diet, setdiet] = useState(null)
    const [totalPages, setTotalPages] = useState(1);
    const [currentPage, setCurrentPage] = useState(1);
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search)
    const search = queryParams.get('Search')
    const { Course } = useParams();
    const [filters, setFilters] = useState({
        cuisine: '',
        diet: '',
        course: '',
        Prep_time: null,
        Cook_time: null,
    });



    useEffect(() => {
        const fetchCourse = async () => {
            try {
                const response = await axios.get('http://localhost:8000/recipe/' + Course + '/');
                setRecipes(response.data['recipes']);
                setTotalPages(response.data['total_pages']);
                setcuisine(response.data['cuisine']);
                setdiet(response.data['diet']);
            } catch (error) {
                console.error('Error fetching recipes:', error);
            }
        };

        const fetchRecipes = async () => {
            try {
                const response = await axios.get('http://localhost:8000/recipe/', {
                    params: { page: currentPage, search: search }
                });
                setRecipes(response.data['recipes']);
                setTotalPages(response.data['total_pages']);
                setcuisine(response.data['cuisine']);
                setdiet(response.data['diet']);
            } catch (error) {
                console.error('Error fetching recipes:', error);
            }
        };
        if (Course) {
            fetchCourse();
        }
        else {
            fetchRecipes();
        }

    }, [currentPage, Course, search]);

    const handleSubmit = (e) => {
        e.preventDefault();

        axios.get('http://localhost:8000/filter/', { params: filters })
            .then(response => {
                setRecipes(response.data['recipes']);
                setTotalPages(response.data['total_pages']);
            })
            .catch(error => {
                console.error('Error sending filter data:', error);
            });
    };

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    const pageRange = 5;
    const pages = [];

    // Determine the start and end of the range
    let startPage = Math.max(currentPage - pageRange, 1);
    let endPage = Math.min(currentPage + pageRange, totalPages);

    // Adjust startPage if there are not enough pages before the current page
    if (endPage - startPage < pageRange * 2) {
        startPage = Math.max(endPage - pageRange * 2, 1);
    }

    // Always include the first page and last page in the range
    if (startPage > 1) {
        pages.push(1);
        if (startPage > 2) {
            pages.push('...');
        }
    }

    for (let page = startPage; page <= endPage; page++) {
        pages.push(page);
    }

    if (endPage < totalPages) {
        if (endPage < totalPages - 1) pages.push('...');
        pages.push(totalPages);
    }

    return (
        <div id='main'>
            <h1>Explore 5K+ Recipes</h1>
            <form className="filter-form mb-2" onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="cuisine">Cuisine:</label>
                    <select
                        id="cuisine"
                        value={filters.cuisine}
                        onChange={(e) => setFilters({ ...filters, cuisine: e.target.value })}
                    >
                        <option value="">All Cuisines</option>
                        {cuisine ? cuisine.map((c) => {
                            return (

                                <option value={c.Cuisine}>{c.Cuisine}</option>
                            )
                        }) : ''
                        }
                    </select>
                </div>

                <div className="form-group">
                    <label htmlFor="diet">Diet:</label>
                    <select
                        id="type"
                        value={filters.diet}
                        onChange={(e) => setFilters({ ...filters, diet: e.target.value })}
                    >
                        <option value="">All Diets</option>
                        {diet ? diet.map((d) => {
                            return (

                                <option value={d.Diet}>{d.Diet}</option>
                            )
                        }) : ''
                        }
                    </select>
                </div>

                <div className="form-group">
                    <label htmlFor="maxPrepTime">Max Prep Time (mins):</label>
                    <input
                        id="maxPrepTime"
                        type="number"
                        placeholder="Max Prep Time (mins)"
                        value={filters.maxPrepTime}
                        onChange={(e) => setFilters({ ...filters, Prep_time: e.target.value })}
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="maxCookTime">Max Cook Time (mins):</label>
                    <input
                        id="maxCookTime"
                        type="number"
                        placeholder="Max Cook Time (mins)"
                        value={filters.maxCookTime}
                        onChange={(e) => setFilters({ ...filters, Cook_time: e.target.value })}
                    />
                </div>

                <button type="submit" className="submit-button">Apply Filters</button>
            </form>
            <div id='inner-main'>
                <div className="recipe-detail">
                    {recipes.map(recipe => (
                        <Link to={`/recipes/${recipe['Recipe_id']}`} className='view-details'>
                            <div className="recipe-card">
                                <img src={recipe['Image_url']} alt={recipe['Name']} className="recipe-image" />
                                <div className="recipe-info">
                                    <div className='card-header'>
                                        <h2>{recipe['Name'].replace('Recipe', '')}</h2>
                                    </div>
                                    <div className='card-body'>
                                        <p className="recipe-description">{recipe['Description']}</p>
                                    </div>
                                    <p className='Time-Detail'>
                                        <strong>Prep Time:</strong> {recipe['Prep_time']} mins
                                        <strong>Cook Time:</strong>{recipe['Cook_time']} mins
                                        <strong>Cuisine:</strong>{recipe['Cuisine'].replace('Recipes', '')}
                                        <strong>Course:</strong>{recipe['Course']}
                                    </p>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>

            </div>
            <div className="pagination">
                {currentPage > 1 && (
                    <button onClick={() => handlePageChange(currentPage - 1)}>Previous</button>
                )}
                {pages.map((page, index) => (
                    page === '...' ? (
                        <span className="ellipsis">...</span>
                    ) : (
                        <button
                            key={page}
                            onClick={() => handlePageChange(page)}
                            className={currentPage === page ? 'active' : ''}
                        >
                            {page}
                        </button>
                    )
                ))}
                {currentPage < totalPages && (
                    <button onClick={() => handlePageChange(currentPage + 1)}>Next</button>
                )}
            </div>
        </div>
    );
};

export default RecipeList;
