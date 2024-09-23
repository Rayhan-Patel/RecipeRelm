import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import './media/css/IndividualRecipe.css'

function IndividualRecipe() {
    const [load, setload] = useState(false)
    const [recipe, setrecipe] = useState(null)
    const { id } = useParams('id');

    // Fetch the data from the backend and set the data
    useEffect(() => {
        axios.get(`http://localhost:8000/recipes/${id}/`)
            .then((response) => {
                setrecipe(response.data.recipe[0])
                console.log(response.data.Suggestion);
                
                setload(true);
            })
            .catch(error => {
                console.log(error);
            })
    }, [id])

    return (
        <div className="recipe-container">
            {load ? <div className="recipe-content row">
                <img className='recipe-image col-lg-4' src={recipe['Image_url']} alt={recipe['Name']} />
                <div className="recipe-info col-lg-6">
                    <h2>{recipe['Name']}</h2>
                    <hr />
                    <p><strong>Description</strong>:{recipe['Description']}</p>
                </div>
                <div className='recipe row'>
                    <hr />
                    <div className='col-6'>
                        <h2>Preparations </h2>
                        <h4><strong>Preparation Time :</strong> {recipe['Prep_time']} mins</h4>
                        <ol>
                            {recipe['Ingredients_quantity'].split(' ,').map((i) => {
                                return <li>{i}</li>
                            })
                            }
                        </ol>
                    </div>
                    <div className='col-6'>
                        <h2>Required Items</h2>
                        <ol>
                            {recipe['Ingredients_name'].split(',').map((i) => {
                                return <li>{i}</li>
                            })
                            }
                        </ol>
                    </div>
                    <hr />
                    <div className='Instruction col-12'>
                        <h2>Instructions</h2>
                        <h4><strong>Cooking Time :</strong> {recipe['Cook_time']}mins</h4>
                        <ol>
                            {recipe['Instructions'].split('. ').map((i) => {
                                return <li>{i}</li>
                            })
                            }
                        </ol>
                        <hr />
                    </div>
                </div>
            </div> : 'Loading'}
        </div>
    );
};

export default IndividualRecipe;
