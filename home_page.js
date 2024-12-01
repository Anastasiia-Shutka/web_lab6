import React from 'react';
import Header from './header';
import Navigation from './navigation';
import JewelryCard from './jewelry_card';
import StoreDescription from './store_description'; 
import './home_page.css';

const HomePage = () => {
  const jewelryItems = [
    { image: '/images/ring.png', title: 'Silver Ring', description: 'Elegant silver ring with diamonds', price: 530 },
    { image: '/images/necklace.png', title: 'Gold Necklace', description: 'Beautiful gold necklace', price: 210 },
    { image: '/images/pearl_bracelet.png', title: 'Pearl Bracelet', description: 'Classic pearl bracelet', price: 120 },
    { image: '/images/earrings.png', title: 'Aquamarine Earrings', description: 'Aquamarine gemstone earrings, perfect for any occasion', price: 420 },
    { image: '/images/sapphire_necklace.png', title: 'Sapphire Necklace', description: 'Elegant sapphire pendant on a delicate silver chain', price: 350 },
  ];

  return (
    <div className="home-page">
      <Header />
      <Navigation />
      <StoreDescription />
      <div className="jewelry-list">
        {jewelryItems.map((item, index) => (
          <JewelryCard
            key={index}
            image={item.image}
            title={item.title}
            description={item.description}
            price={item.price}
          />
        ))}
      </div>
      <button className="view-more-button">View More</button> 
    </div>
  );
};

export default HomePage;

