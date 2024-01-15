import { BrowserRouter } from 'react-router-dom';
import { Router } from './Router';
import React from 'react';


export default function App() {
  return (
    <BrowserRouter>
      <Router />
    </BrowserRouter>
  );
}
