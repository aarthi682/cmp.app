import React from 'react';
import { Header } from './Header';
import { Footer } from './Footer';
import { Outlet } from 'react-router-dom';
import { CusterHeader } from './CusterHeader';

export const CustomerUserLayout = () => {
  return (
    <div className="d-flex flex-column min-vh-100">
      <CusterHeader/>
      <main className="flex-grow-1 ">
        <Outlet />  {/* Dynamically render nested route content */}
      </main>
      <Footer />
    </div>
  );
};