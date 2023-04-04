import React, { useState, useEffect } from 'react';

const CategorySelect = ({checked, handleChange}) => {
    const categories = ['title', 'description', 'content']
    return (
        <div className="category-search">
            <select id="categories" value={checked} onChange={handleChange}>
                {categories.map((choice) => (<option id={choice} value={choice}>{choice}</option>))}
            </select>
        </div>
    )
}

export default CategorySelect;
