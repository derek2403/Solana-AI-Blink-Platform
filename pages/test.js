import React, { useState } from 'react';

const SidebarLayout = ({ content: Content }) => {
  const [selectedComponent, setSelectedComponent] = useState(null);

  const menuItems = [
    { label: 'Home', component: <Home /> },
    { label: 'About', component: <About /> },
  ];

  return (
    <div style={{ display: 'flex', margin: 0, padding: 0, fontFamily: 'Arial, sans-serif' }}>
      <aside style={{ width: '250px', backgroundColor: '#4338ca', color: 'white', height: '100vh', padding: '20px', boxSizing: 'border-box' }}>
        <h2 style={{ marginTop: 0, marginBottom: '30px' }}>Portfolio</h2>
        <nav>
          <ul style={{ listStyleType: 'none', padding: 0 }}>
            {menuItems.map((item, index) => (
              <li key={index} style={{ marginBottom: '15px' }}>
                <button
                  onClick={() => setSelectedComponent(item.component)}
                  style={{ color: 'white', background: 'none', border: 'none', textDecoration: 'none', cursor: 'pointer' }}
                >
                  {item.label}
                </button>
              </li>
            ))}
          </ul>
        </nav>
        <div style={{ marginTop: '50px' }}>
          <h3 style={{ marginBottom: '10px' }}>Subscribe for newsletter</h3>
          <input type="email" placeholder="Enter Email Address" style={{ width: '100%', padding: '10px', boxSizing: 'border-box', marginBottom: '10px' }} />
          <button style={{ width: '100%', padding: '10px', backgroundColor: '#3730a3', color: 'white', border: 'none', cursor: 'pointer' }}>Subscribe</button>
        </div>
        <p style={{ position: 'absolute', bottom: '20px', fontSize: '12px' }}>Copyright ©2020 All rights reserved | This template is made with by Portfolio Agency</p>
      </aside>
      <main style={{ flexGrow: 1, padding: '20px', boxSizing: 'border-box' }}>
        <h1 style={{ color: '#333' }}>Sidebar #05</h1>
        {selectedComponent || (
          <p style={{ color: '#666', lineHeight: '1.6' }}>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
          </p>
        )}
      </main>
    </div>
  );
};

// Example content components
const Home = () => (
  <div>
    <h2>Home</h2>
    <p>Welcome to the Home page!</p>
  </div>
);

const About = () => (
  <div>
    <h2>About</h2>
    <p>This is the About page!</p>
  </div>
);

export default SidebarLayout;
