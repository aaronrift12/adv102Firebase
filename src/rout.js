
import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';

import Signup from './signup';
import Login from './login';
import Homepage from './homepage';
import Exercise from './exercise';
import ListPage from './list';
import CalculatorPage from './bmi';


const Rout = () => {
  const [cart, setCart] = useState([]); // State to store selected exercises

  return (
    <>
      <Routes>

        <Route path="/" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/homepage" element={<Homepage />} />
        <Route path="/bmi" element={<CalculatorPage />} />
        <Route path="/exercise" element={<Exercise setCart={setCart} />} />
        <Route path="/list" element={<ListPage cart={cart} setCart={setCart} />} /> {setCart}
      </Routes>
    </>
  );
}

export default Rout;