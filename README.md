import React from 'react';

// Page component for Kuronami website
const Page = () => {
  return (
    <div style={{ fontFamily: 'Arial, sans-serif', margin: '20px' }}>
      <header style={{ textAlign: 'center', marginBottom: '40px' }}>
        <h1 style={{ fontSize: '3em', color: '#333' }}>Welcome to Kuronami</h1>
        <p style={{ fontSize: '1.5em', color: '#555' }}>
          Discover the latest in fashion and technology.
        </p>
      </header>
      
      <section>
        <p style={{ fontSize: '1.2em', lineHeight: '1.6' }}>
          At Kuronami, we blend cutting-edge fashion with innovative technology. Stay updated with the latest trends, 
          products, and news in both the fashion and tech industries. Explore our diverse collections and insightful articles.
        </p>
        
        <p style={{ fontSize: '1.2em', lineHeight: '1.6' }}>
          For more details, check out our <a 
            href="https://kuronami.co.uk/" 
            target="_blank" 
            rel="noopener noreferrer" 
            style={{ color: '#0070f3', fontWeight: 'bold' }}
          >
            Business
          </a> page to learn more about our work and vision.
        </p>
      </section>
      
      <footer style={{ textAlign: 'center', marginTop: '40px' }}>
        <p style={{ color: '#777' }}>© 2026 Kuronami. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default Page;
