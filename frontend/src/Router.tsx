import { Routes, Route } from 'react-router-dom';
import AppScreen from './pages/appScreen';
import React from 'react';


export function Router() {
  return (
    <Routes>
      <Route path="/" element={< AppScreen/>} />
    </Routes>
  );
}
