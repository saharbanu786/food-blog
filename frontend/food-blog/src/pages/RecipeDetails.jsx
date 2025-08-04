import React from 'react'
import profileImg from '../assets/profile.png'
import { useLoaderData } from 'react-router-dom'
import { BsStopwatchFill } from "react-icons/bs"

export default function RecipeDetails() {
    const recipe = useLoaderData()
    console.log(recipe)

    return (
        <>
            <div className='outer-container'>
                <div className='profile'>
                    <img src={profileImg} width="50px" height="50px" alt="Profile" />
                    <h5>{recipe.user?.email}</h5>
                </div>
                <h3 className='title'>{recipe.title}</h3>
                <img src={`http://localhost:5000/images/${recipe.coverImage}`} width="220px" height="200px" alt="Recipe Cover" />
                             {/* Time Display */}
                <div className="time-info" style={{ display: 'flex', alignItems: 'center', gap: '5px', marginTop: '10px' }}>
                    <BsStopwatchFill />
                    <span>{recipe.time}</span>
                </div>
                <div className='recipe-details'>
                    <div className='ingredients'>
                        <h4>Ingredients</h4>
                        <ul>{recipe.ingredients.map((item, index) => (<li key={index}>{item}</li>))}</ul>
                    </div>
                    <div className='instructions'>
                        <h4>Instructions</h4>
                        <span>{recipe.instructions}</span>
                    </div>
                </div>
            </div>
        </>
    )
}
