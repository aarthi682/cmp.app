import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

export const Footer = () => {
  return (
    <footer
      className="mt-auto py-3 shadow-sm"
      style={{
        background: 'linear-gradient(to right, rgb(231, 219, 234))',
        fontFamily: 'Georgia, serif',
        fontVariant: 'small-caps',
        borderTop: '1px solid #ddd'
      }}
    >
      <div className="container text-center">
        <p className="mb-1" style={{ color: 'dark' }}>
          &copy; {new Date().getFullYear()} Content Management Project
        </p>
      </div>
    </footer>
  );
};
