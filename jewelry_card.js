import React from 'react';
import './jewelry_card.css';

const JewelryCard = ({ image, title, description, price }) => {
    return (
        <div className="jewelry-card">
            <div className="jewelry-card-content">
                <img className="jewelry-image" src={image} alt={title} />
                <h2>{title}</h2>
                <p>{description}</p>
                <p className="jewelry-price">Price: ${price}</p>
            </div>
        </div>
    );
};

export default JewelryCard;
