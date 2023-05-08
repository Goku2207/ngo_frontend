import React, { useContext, useState, useEffect } from "react";
import { BrowserRouter ,Routes ,Route, Navigate } from 'react-router-dom';
import './App.css';
import DonorDashboard from "./components/Donor/DonorDashboard/DonorDashboard";
import DonorForm from "./components/Donor/DonorForm/DonorForm";
import AgentForm from "./components/Agent/AgentForm/AgentForm";
import AgentDashboard from "./components/Agent/AgentDashboard/AgentDashboard";
import AdminDashboard from "./components/Admin/AdminDashboard/AdminDashboard";
import Home from "./components/Home/pages/Home";
import Services from "./components/Home/pages/Services";
import Products from "./components/Home/pages/Products";
import SignUp from "./components/Home/pages/SignUp";
import PickUpForm from "./components/Agent/AgentForm/PickUpForm";
import DeliveryForm from "./components/Agent/AgentForm/DeliveryForm";
import Register from "./components/Auth/Register";
import Login from "./components/Auth/Login";
import AuthContext from "./store/context/auth";
import Spinner from "./components/Utility/Spinner";
import axios from "./axios";

const App = (props) => {

    const {state} = useContext(AuthContext);

    return(
        <Routes>
          <Route path="/home" element={<Home/>} />
          <Route path="/services" element={<Services/>} />
          <Route path="/products" element={<Products/>} />
          <Route path="/sign-up" element={<SignUp/>} />
          <Route path="/register" element={<Register/>} />
          <Route path="/login" element={<Login/>} />
          <Route path="/donorDashboard" element={<DonorDashboard />} />
          <Route path="/donorForm" element={<DonorForm />} />
          <Route path="/agentForm" element={<AgentForm />} />
          <Route path="/agentDashboard" element={<AgentDashboard />} />
          <Route path="/adminDashboard" element={<AdminDashboard />} />
          <Route path="/pickUpForm" element={<PickUpForm />} />
          <Route path="/deliveryForm" element={<DeliveryForm />} />
          <Route path="/spinner" element={<Spinner/>} />
          <Route path="/" element={<Navigate replace to="/home" />} />
        </Routes>
    );
}

export default App;
